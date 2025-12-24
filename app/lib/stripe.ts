/**
 * Stripe Configuration & Helper Functions
 */

import Stripe from 'stripe'

// Allow build to succeed without Stripe key (will be set in production env)
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder_for_build'

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
})

export const STRIPE_PLANS = {
  PRO: {
    name: 'Pro',
    price: 4.99,
    currency: 'usd',
    interval: 'month' as const,
    features: [
      '100 scans/ngày',
      'Unlimited URL scanning',
      '30 image scans/ngày',
      'Advanced AI analysis',
      'Scan history (30 days)',
      'Priority support',
      'Export reports (PDF/CSV)',
      'Email alerts',
      'Browser extension',
    ]
  },
  BUSINESS: {
    name: 'Business',
    price: 19.99,
    currency: 'usd',
    interval: 'month' as const,
    features: [
      '1000 scans/ngày',
      'Unlimited image scans',
      'Bulk scanning (upload CSV)',
      'API access (50K calls/month)',
      'Webhooks',
      'Custom reports',
      'Team collaboration (5 users)',
      'Scan history (1 year)',
      '24/7 support',
      'White-label reports',
    ]
  },
}

export async function createCheckoutSession({
  userId,
  email,
  priceId,
  tier,
}: {
  userId: string
  email: string
  priceId: string
  tier: string
}) {
  const session = await stripe.checkout.sessions.create({
    customer_email: email,
    client_reference_id: userId,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
    metadata: {
      userId,
      tier,
    },
  })

  return session
}

export async function createCustomerPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
  })

  return session
}
