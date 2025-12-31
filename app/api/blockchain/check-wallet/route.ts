import { NextRequest, NextResponse } from 'next/server'
import { checkWalletRisk, isValidAddress, NetworkKey } from '@/app/lib/blockchain'

export async function POST(request: NextRequest) {
  try {
    const { address, network = 'ethereum' } = await request.json()

    if (!address) {
      return NextResponse.json(
        { success: false, error: 'Wallet address is required' },
        { status: 400 }
      )
    }

    // Validate address format
    if (!isValidAddress(address)) {
      return NextResponse.json({
        success: true,
        result: {
          address,
          isValid: false,
          riskLevel: 'DANGEROUS',
          riskScore: 100,
          flags: ['Invalid wallet address format - not a valid Ethereum address'],
          details: {}
        }
      })
    }

    // Check wallet risk
    const result = await checkWalletRisk(address, network as NetworkKey)

    return NextResponse.json({
      success: true,
      result
    })

  } catch (error) {
    console.error('Wallet check error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to check wallet' },
      { status: 500 }
    )
  }
}
