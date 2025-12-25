/**
 * Import phishing/scam URLs from public feeds
 * Sources: PhishTank, OpenPhish, URLhaus
 */

import { PrismaClient } from '@prisma/client'
import * as https from 'https'

const prisma = new PrismaClient()

// Fetch data from URL
function fetchData(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => resolve(data))
      res.on('error', reject)
    })
  })
}

async function importOpenPhish() {
  console.log('📥 Importing from OpenPhish...')
  
  try {
    const data = await fetchData('https://openphish.com/feed.txt')
    const urls = data.split('\n').filter((u) => u.trim().length > 0)
    
    console.log(`  Found ${urls.length} phishing URLs`)
    
    let imported = 0
    for (const url of urls.slice(0, 100)) { // Limit 100 để test
      try {
        const domain = new URL(url).hostname
        
        // Check if exists
        const exists = await prisma.blocklist.findUnique({
          where: { domain },
        })
        
        if (!exists) {
          await prisma.blocklist.create({
            data: {
              domain,
              reason: 'Phishing website detected by OpenPhish',
              severity: 'CRITICAL',
              source: 'openphish',
              metadata: { url },
            },
          })
          imported++
        }
      } catch (e) {
        // Skip invalid URLs
      }
    }
    
    console.log(`  ✅ Imported ${imported} new domains`)
  } catch (error) {
    console.error('  ❌ Error:', error)
  }
}

async function importURLhaus() {
  console.log('📥 Importing from URLhaus...')
  
  try {
    const data = await fetchData('https://urlhaus-api.abuse.ch/v1/urls/recent/')
    const json = JSON.parse(data)
    
    if (json.query_status === 'ok') {
      const urls = json.urls.slice(0, 100) // Limit 100
      console.log(`  Found ${urls.length} malicious URLs`)
      
      let imported = 0
      for (const item of urls) {
        try {
          const domain = new URL(item.url).hostname
          
          const exists = await prisma.blocklist.findUnique({
            where: { domain },
          })
          
          if (!exists) {
            await prisma.blocklist.create({
              data: {
                domain,
                reason: `Malware: ${item.threat || 'Unknown'}`,
                severity: 'CRITICAL',
                source: 'urlhaus',
                metadata: {
                  url: item.url,
                  threat: item.threat,
                  tags: item.tags,
                },
              },
            })
            imported++
          }
        } catch (e) {
          // Skip
        }
      }
      
      console.log(`  ✅ Imported ${imported} new domains`)
    }
  } catch (error) {
    console.error('  ❌ Error:', error)
  }
}

async function importVietnameseScams() {
  console.log('📥 Adding Vietnamese scam patterns...')
  
  const vnScams = [
    // Gambling sites
    { domain: 'vn88.com', type: 'Casino', severity: 'CRITICAL' },
    { domain: 'w88.com', type: 'Casino', severity: 'CRITICAL' },
    { domain: 'fb88.com', type: 'Casino', severity: 'CRITICAL' },
    { domain: '188bet.com', type: 'Casino', severity: 'CRITICAL' },
    { domain: 'fun88.vn', type: 'Casino', severity: 'CRITICAL' },
    
    // Fake banks
    { domain: 'vietcombannk.com', type: 'Phishing Bank', severity: 'CRITICAL' },
    { domain: 'vcbank.net', type: 'Phishing Bank', severity: 'CRITICAL' },
    { domain: 'bidvbank.tk', type: 'Phishing Bank', severity: 'CRITICAL' },
    { domain: 'techcombannk.vn', type: 'Phishing Bank', severity: 'CRITICAL' },
    
    // Fake e-wallet
    { domain: 'momo-vn.tk', type: 'Phishing Wallet', severity: 'CRITICAL' },
    { domain: 'zalopay-vn.ml', type: 'Phishing Wallet', severity: 'CRITICAL' },
    
    // Investment scams
    { domain: 'dautu-forex.xyz', type: 'Investment Scam', severity: 'HIGH' },
    { domain: 'kiemtien-online.tk', type: 'Investment Scam', severity: 'HIGH' },
  ]
  
  let imported = 0
  for (const scam of vnScams) {
    try {
      const exists = await prisma.blocklist.findUnique({
        where: { domain: scam.domain },
      })
      
      if (!exists) {
        await prisma.blocklist.create({
          data: {
            domain: scam.domain,
            reason: `Vietnamese ${scam.type}`,
            severity: scam.severity,
            source: 'manual',
            metadata: { category: scam.type, country: 'VN' },
          },
        })
        imported++
      }
    } catch (e) {
      console.error(`  Error with ${scam.domain}:`, e)
    }
  }
  
  console.log(`  ✅ Imported ${imported} Vietnamese scam domains`)
}

async function updateTrainingData() {
  console.log('\n📊 Updating training data from blocklist...')
  
  const dangerous = await prisma.blocklist.findMany({
    take: 500,
  })
  
  let created = 0
  for (const item of dangerous) {
    const exists = await prisma.scanHistory.findFirst({
      where: { domain: item.domain },
    })
    
    if (!exists) {
      await prisma.scanHistory.create({
        data: {
          url: `https://${item.domain}`,
          domain: item.domain,
          score: 95,
          label: 'DANGEROUS',
          reasons: [item.reason, `Source: ${item.source}`, `Severity: ${item.severity}`],
          aiConfidence: 0.95,
          heuristicScore: 90,
          aiScore: 95,
        },
      })
      created++
    }
  }
  
  console.log(`  ✅ Created ${created} training samples`)
}

async function main() {
  console.log('🚀 Starting data import...\n')
  
  await importVietnameseScams()
  await importOpenPhish()
  await importURLhaus()
  await updateTrainingData()
  
  // Statistics
  const blocklistCount = await prisma.blocklist.count()
  const trainingCount = await prisma.scanHistory.count()
  
  console.log('\n📈 Final statistics:')
  console.log(`  Blocklist: ${blocklistCount} domains`)
  console.log(`  Training data: ${trainingCount} samples`)
  
  console.log('\n✅ Import completed!')
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error('❌ Fatal error:', e)
    prisma.$disconnect()
    process.exit(1)
  })
