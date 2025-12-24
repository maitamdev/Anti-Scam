/**
 * Stripe Webhooks Handler
 * Handles subscription events from Stripe
 */

import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { stripe } from '@/app/lib/stripe'
import prisma from '@/app/lib/db'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ''

export async function POST(req: NextRequest) {
  // Runtime check for Stripe configuration
  if (!process.env.STRIPE_SECRET_KEY || !webhookSecret) {
    return NextResponse.json(
      { error: 'Stripe not configured' },
      { status: 500 }
    )
  }

  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutCompleted(session)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionDeleted(subscription)
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaymentSucceeded(invoice)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        await handleInvoicePaymentFailed(invoice)
        break
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const userId = session.client_reference_id || session.metadata?.userId
  if (!userId) return

  const subscription = await stripe.subscriptions.retrieve(
    session.subscription as string
  )

  const tier = session.metadata?.tier as 'PRO' | 'BUSINESS'

  // Access subscription fields properly
  const sub = subscription as any
  const subscriptionData = {
    id: sub.id,
    status: sub.status.toUpperCase() as any,
    priceId: sub.items.data[0].price.id,
    currentPeriodEnd: sub.current_period_end,
    currentPeriodStart: sub.current_period_start,
    customer: sub.customer as string,
  }

  // Update or create subscription
  await prisma.subscription.upsert({
    where: { userId },
    create: {
      userId,
      tier,
      status: subscriptionData.status,
      stripeSubscriptionId: subscriptionData.id,
      stripePriceId: subscriptionData.priceId,
      stripeCurrentPeriodEnd: new Date(subscriptionData.currentPeriodEnd * 1000),
      currentPeriodStart: new Date(subscriptionData.currentPeriodStart * 1000),
      currentPeriodEnd: new Date(subscriptionData.currentPeriodEnd * 1000),
    },
    update: {
      tier,
      status: subscriptionData.status,
      stripeSubscriptionId: subscriptionData.id,
      stripePriceId: subscriptionData.priceId,
      stripeCurrentPeriodEnd: new Date(subscriptionData.currentPeriodEnd * 1000),
      currentPeriodStart: new Date(subscriptionData.currentPeriodStart * 1000),
      currentPeriodEnd: new Date(subscriptionData.currentPeriodEnd * 1000),
    },
  })

  // Update user tier
  await prisma.user.update({
    where: { id: userId },
    data: {
      tier,
      stripeCustomerId: subscriptionData.customer,
    },
  })

  // Create payment record
  await prisma.payment.create({
    data: {
      userId,
      amount: (session.amount_total || 0) / 100,
      currency: session.currency || 'usd',
      status: 'SUCCEEDED',
      method: 'stripe',
      stripePaymentId: session.payment_intent as string,
    },
  })
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const sub = subscription as any
  const userId = sub.metadata?.userId
  if (!userId) {
    // Find user by customer ID
    const user = await prisma.user.findUnique({
      where: { stripeCustomerId: sub.customer as string }
    })
    if (!user) return
  }

  await prisma.subscription.update({
    where: { stripeSubscriptionId: sub.id },
    data: {
      status: sub.status.toUpperCase() as any,
      currentPeriodEnd: new Date(sub.current_period_end * 1000),
      stripeCurrentPeriodEnd: new Date(sub.current_period_end * 1000),
      cancelAtPeriodEnd: sub.cancel_at_period_end,
      canceledAt: sub.canceled_at ? new Date(sub.canceled_at * 1000) : null,
    },
  })
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  await prisma.subscription.update({
    where: { stripeSubscriptionId: subscription.id },
    data: {
      status: 'CANCELED',
      canceledAt: new Date(),
    },
  })

  // Downgrade user to FREE tier
  const sub = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: subscription.id }
  })

  if (sub) {
    await prisma.user.update({
      where: { id: sub.userId },
      data: { tier: 'FREE' },
    })
  }
}

async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const inv = invoice as any
  const subscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: inv.subscription as string }
  })

  if (!subscription) return

  await prisma.payment.create({
    data: {
      userId: subscription.userId,
      amount: inv.amount_paid / 100,
      currency: inv.currency,
      status: 'SUCCEEDED',
      method: 'stripe',
      stripePaymentId: inv.payment_intent as string,
      invoiceUrl: inv.hosted_invoice_url,
      receiptUrl: inv.invoice_pdf,
    },
  })
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const inv = invoice as any
  const subscription = await prisma.subscription.findUnique({
    where: { stripeSubscriptionId: inv.subscription as string }
  })

  if (!subscription) return

  await prisma.subscription.update({
    where: { id: subscription.id },
    data: { status: 'PAST_DUE' },
  })

  await prisma.payment.create({
    data: {
      userId: subscription.userId,
      amount: inv.amount_due / 100,
      currency: inv.currency,
      status: 'FAILED',
      method: 'stripe',
      stripePaymentId: inv.payment_intent as string,
    },
  })
}
