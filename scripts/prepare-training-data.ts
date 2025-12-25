/**
 * Prepare Training Data for AI Model
 * Extract scan history from database for model training
 */

import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

interface TrainingExample {
  url: string
  domain: string
  title: string
  description: string
  label: 'SAFE' | 'CAUTION' | 'DANGEROUS'
  score: number
  reasons: string[]
  category: string
}

async function collectData() {
  console.log('📊 Thu thập dữ liệu training từ database...')

  // Get scan history with valid results
  const scans = await prisma.scanHistory.findMany({
    where: {
      label: { in: ['SAFE', 'CAUTION', 'DANGEROUS'] },
      score: { gte: 0 },
    },
    select: {
      url: true,
      domain: true,
      score: true,
      label: true,
      reasons: true,
      aiConfidence: true,
      heuristicScore: true,
      aiScore: true,
    },
    take: 10000,
  })

  console.log(`✅ Tìm thấy ${scans.length} mẫu dữ liệu`)

  const trainingData: TrainingExample[] = scans.map((scan) => ({
    url: scan.url,
    domain: scan.domain,
    title: '', // Extract from reasons if available
    description: scan.reasons.join(' | '),
    label: scan.label as 'SAFE' | 'CAUTION' | 'DANGEROUS',
    score: scan.score!,
    reasons: scan.reasons || [],
    category: 'unknown',
  }))

  // Split by label
  const safe = trainingData.filter((d) => d.label === 'SAFE')
  const caution = trainingData.filter((d) => d.label === 'CAUTION')
  const dangerous = trainingData.filter((d) => d.label === 'DANGEROUS')

  console.log(`\n📈 Phân bố dữ liệu:`)
  console.log(`  - SAFE: ${safe.length}`)
  console.log(`  - CAUTION: ${caution.length}`)
  console.log(`  - DANGEROUS: ${dangerous.length}`)

  // Save to JSON
  const outputDir = path.join(process.cwd(), 'training-data')
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  fs.writeFileSync(
    path.join(outputDir, 'all-data.json'),
    JSON.stringify(trainingData, null, 2)
  )

  fs.writeFileSync(
    path.join(outputDir, 'safe.json'),
    JSON.stringify(safe, null, 2)
  )

  fs.writeFileSync(
    path.join(outputDir, 'caution.json'),
    JSON.stringify(caution, null, 2)
  )

  fs.writeFileSync(
    path.join(outputDir, 'dangerous.json'),
    JSON.stringify(dangerous, null, 2)
  )

  console.log(`\n💾 Đã lưu dữ liệu vào: ${outputDir}`)

  // Generate CSV for easy analysis
  const csv = [
    'url,domain,label,score,category,title',
    ...trainingData.map((d) =>
      [
        `"${d.url}"`,
        `"${d.domain}"`,
        d.label,
        d.score,
        d.category,
        `"${d.title.replace(/"/g, '""')}"`,
      ].join(',')
    ),
  ].join('\n')

  fs.writeFileSync(path.join(outputDir, 'training-data.csv'), csv)
  console.log(`📊 Đã tạo file CSV: training-data.csv`)

  return trainingData
}

async function analyzePatterns(data: TrainingExample[]) {
  console.log('\n🔍 Phân tích patterns...')

  const dangerousDomains = data
    .filter((d) => d.label === 'DANGEROUS')
    .map((d) => d.domain)

  const commonPatterns = {
    gambling: dangerousDomains.filter((d) => /bet|casino|game|win|luck|vn88|sv88/i.test(d)).length,
    phishing: dangerousDomains.filter((d) => /vietcomb|vcb|bidv|acb|techcom|momo|zalo/i.test(d)).length,
    suspicious: dangerousDomains.filter((d) => /\.tk|\.ml|\.ga|\.cf|\.xyz|\.top/i.test(d)).length,
  }

  console.log('\n⚠️ Patterns nguy hiểm:')
  console.log(`  - Cờ bạc: ${commonPatterns.gambling}`)
  console.log(`  - Phishing: ${commonPatterns.phishing}`)
  console.log(`  - TLD đáng ngờ: ${commonPatterns.suspicious}`)
}

async function main() {
  try {
    const data = await collectData()
    await analyzePatterns(data)
    
    console.log('\n✅ Hoàn thành! Sử dụng dữ liệu để:')
    console.log('  1. Fine-tune model với HuggingFace')
    console.log('  2. Train custom classifier')
    console.log('  3. Improve heuristic rules')
  } catch (error) {
    console.error('❌ Lỗi:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
