// Blockchain Integration for ANTI-SCAM
// Using ethers.js for Ethereum/BSC/Polygon compatibility

import { ethers } from 'ethers'

// Supported networks
export const NETWORKS = {
  ethereum: {
    chainId: 1,
    name: 'Ethereum Mainnet',
    rpcUrl: 'https://eth-mainnet.g.alchemy.com/v2/demo',
    explorer: 'https://etherscan.io',
    symbol: 'ETH'
  },
  bsc: {
    chainId: 56,
    name: 'BNB Smart Chain',
    rpcUrl: 'https://bsc-dataseed.binance.org',
    explorer: 'https://bscscan.com',
    symbol: 'BNB'
  },
  polygon: {
    chainId: 137,
    name: 'Polygon',
    rpcUrl: 'https://polygon-rpc.com',
    explorer: 'https://polygonscan.com',
    symbol: 'MATIC'
  },
  sepolia: {
    chainId: 11155111,
    name: 'Sepolia Testnet',
    rpcUrl: 'https://rpc.sepolia.org',
    explorer: 'https://sepolia.etherscan.io',
    symbol: 'ETH'
  }
}

export type NetworkKey = keyof typeof NETWORKS

// Known scam wallet addresses (sample data)
const KNOWN_SCAM_WALLETS: Record<string, { reportCount: number; totalLoss: string; category: string; firstReported: string }> = {
  '0x0000000000000000000000000000000000000001': {
    reportCount: 150,
    totalLoss: '2.5M USD',
    category: 'Rug Pull',
    firstReported: '2023-01-15'
  },
  '0x742d35cc6634c0532925a3b844bc9e7595f5b0e1': {
    reportCount: 89,
    totalLoss: '500K USD', 
    category: 'Phishing',
    firstReported: '2023-06-20'
  }
}

// Check if wallet address is valid
export function isValidAddress(address: string): boolean {
  try {
    return ethers.isAddress(address)
  } catch {
    return false
  }
}

// Get wallet balance
export async function getWalletBalance(address: string, network: NetworkKey = 'ethereum'): Promise<string> {
  try {
    const provider = new ethers.JsonRpcProvider(NETWORKS[network].rpcUrl)
    const balance = await provider.getBalance(address)
    return ethers.formatEther(balance)
  } catch (error) {
    console.error('Error getting balance:', error)
    return '0'
  }
}

// Get transaction count (nonce)
export async function getTransactionCount(address: string, network: NetworkKey = 'ethereum'): Promise<number> {
  try {
    const provider = new ethers.JsonRpcProvider(NETWORKS[network].rpcUrl)
    return await provider.getTransactionCount(address)
  } catch (error) {
    console.error('Error getting tx count:', error)
    return 0
  }
}

// Check wallet risk score
export interface WalletRiskResult {
  address: string
  isValid: boolean
  riskLevel: 'SAFE' | 'LOW' | 'MEDIUM' | 'HIGH' | 'DANGEROUS'
  riskScore: number // 0-100
  flags: string[]
  details: {
    balance?: string
    txCount?: number
    isContract?: boolean
    age?: string
    reportCount?: number
    totalLoss?: string
    category?: string
  }
}

export async function checkWalletRisk(address: string, network: NetworkKey = 'ethereum'): Promise<WalletRiskResult> {
  // Validate address
  if (!isValidAddress(address)) {
    return {
      address,
      isValid: false,
      riskLevel: 'DANGEROUS',
      riskScore: 100,
      flags: ['Invalid wallet address format'],
      details: {}
    }
  }

  const normalizedAddress = address.toLowerCase()
  const flags: string[] = []
  let riskScore = 0

  try {
    const provider = new ethers.JsonRpcProvider(NETWORKS[network].rpcUrl)
    
    // Get basic info
    const [balance, txCount, code] = await Promise.all([
      provider.getBalance(address),
      provider.getTransactionCount(address),
      provider.getCode(address)
    ])

    const balanceEth = parseFloat(ethers.formatEther(balance))
    const isContract = code !== '0x'

    // Check known scam database
    const knownScam = KNOWN_SCAM_WALLETS[normalizedAddress]
    if (knownScam) {
      riskScore += 80
      flags.push(`Known scam wallet: ${knownScam.category}`)
      flags.push(`${knownScam.reportCount} reports, ${knownScam.totalLoss} lost`)
    }

    // Risk factors
    if (txCount === 0 && balanceEth === 0) {
      riskScore += 10
      flags.push('New/empty wallet - no transaction history')
    }

    if (txCount > 0 && txCount < 5 && balanceEth > 10) {
      riskScore += 20
      flags.push('Low activity but high balance - suspicious pattern')
    }

    if (isContract) {
      riskScore += 5
      flags.push('This is a smart contract address')
    }

    // Determine risk level
    let riskLevel: WalletRiskResult['riskLevel'] = 'SAFE'
    if (riskScore >= 80) riskLevel = 'DANGEROUS'
    else if (riskScore >= 60) riskLevel = 'HIGH'
    else if (riskScore >= 40) riskLevel = 'MEDIUM'
    else if (riskScore >= 20) riskLevel = 'LOW'

    if (flags.length === 0) {
      flags.push('No suspicious activity detected')
    }

    return {
      address,
      isValid: true,
      riskLevel,
      riskScore: Math.min(riskScore, 100),
      flags,
      details: {
        balance: balanceEth.toFixed(4) + ' ' + NETWORKS[network].symbol,
        txCount,
        isContract,
        reportCount: knownScam?.reportCount,
        totalLoss: knownScam?.totalLoss,
        category: knownScam?.category
      }
    }
  } catch (error) {
    console.error('Error checking wallet:', error)
    return {
      address,
      isValid: true,
      riskLevel: 'MEDIUM',
      riskScore: 50,
      flags: ['Unable to fetch complete data - check manually'],
      details: {}
    }
  }
}

// Generate hash for report verification
export function generateReportHash(reportData: {
  url?: string
  walletAddress?: string
  description: string
  reporterEmail?: string
  timestamp: number
}): string {
  const dataString = JSON.stringify(reportData)
  return ethers.keccak256(ethers.toUtf8Bytes(dataString))
}

// Verify report hash
export function verifyReportHash(reportData: object, expectedHash: string): boolean {
  const dataString = JSON.stringify(reportData)
  const computedHash = ethers.keccak256(ethers.toUtf8Bytes(dataString))
  return computedHash === expectedHash
}

// Format address for display
export function formatAddress(address: string, chars: number = 6): string {
  if (!address) return ''
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

// Get explorer URL
export function getExplorerUrl(address: string, network: NetworkKey = 'ethereum', type: 'address' | 'tx' = 'address'): string {
  return `${NETWORKS[network].explorer}/${type}/${address}`
}
