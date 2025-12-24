/**
 * Stripe Checkout API
 * Creates checkout session for subscription
 */

import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/lib/auth'
import { createCheckoutSession } from '@/app/lib/stripe'
import { z } from 'zod'

const checkoutSchema = z.object({
  priceId: z.string(),
  tier: z.enum(['PRO', 'BUSINESS']),
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { priceId, tier } = checkoutSchema.parse(body)

    const checkoutSession = await createCheckoutSession({
      userId: session.user.id,
      email: session.user.email,
      priceId,
      tier,
    })

    return NextResponse.json({ url: checkoutSession.url })

  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}
