/**
 * Seed training data với các mẫu điển hình
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const trainingExamples = [
  // SAFE - Legitimate websites
  {
    url: 'https://google.com',
    domain: 'google.com',
    score: 0,
    label: 'SAFE',
    reasons: ['Domain tin cậy', 'SSL hợp lệ', 'Thương hiệu uy tín'],
    aiConfidence: 0.99,
    heuristicScore: 0,
    aiScore: 0,
  },
  {
    url: 'https://facebook.com',
    domain: 'facebook.com',
    score: 0,
    label: 'SAFE',
    reasons: ['Mạng xã hội chính thống', 'SSL hợp lệ'],
    aiConfidence: 0.98,
    heuristicScore: 0,
    aiScore: 0,
  },
  {
    url: 'https://shopee.vn',
    domain: 'shopee.vn',
    score: 0,
    label: 'SAFE',
    reasons: ['E-commerce uy tín', 'Domain .vn hợp pháp', 'SSL hợp lệ'],
    aiConfidence: 0.97,
    heuristicScore: 0,
    aiScore: 0,
  },
  {
    url: 'https://vietcombank.com.vn',
    domain: 'vietcombank.com.vn',
    score: 0,
    label: 'SAFE',
    reasons: ['Ngân hàng chính thống', 'Domain .com.vn hợp pháp', 'SSL cao cấp'],
    aiConfidence: 0.99,
    heuristicScore: 0,
    aiScore: 0,
  },

  // DANGEROUS - Gambling
  {
    url: 'https://bet882547.com',
    domain: 'bet882547.com',
    score: 93,
    label: 'DANGEROUS',
    reasons: ['Website cờ bạc', 'Pattern casino', 'Hoạt động bất hợp pháp'],
    aiConfidence: 0.95,
    heuristicScore: 75,
    aiScore: 90,
  },
  {
    url: 'https://sv88.com',
    domain: 'sv88.com',
    score: 95,
    label: 'DANGEROUS',
    reasons: ['Website cá cược', 'Cờ bạc trực tuyến', 'Vi phạm pháp luật'],
    aiConfidence: 0.96,
    heuristicScore: 80,
    aiScore: 95,
  },
  {
    url: 'https://fun88.vn',
    domain: 'fun88.vn',
    score: 92,
    label: 'DANGEROUS',
    reasons: ['Casino trực tuyến', 'Cờ bạc', 'Bất hợp pháp tại VN'],
    aiConfidence: 0.94,
    heuristicScore: 75,
    aiScore: 90,
  },

  // DANGEROUS - Phishing
  {
    url: 'https://vietcombannk.com',
    domain: 'vietcombannk.com',
    score: 98,
    label: 'DANGEROUS',
    reasons: ['Giả mạo Vietcombank', 'Phishing ngân hàng', 'Domain lừa đảo'],
    aiConfidence: 0.99,
    heuristicScore: 90,
    aiScore: 98,
  },
  {
    url: 'https://bidv-bank.tk',
    domain: 'bidv-bank.tk',
    score: 97,
    label: 'DANGEROUS',
    reasons: ['Giả mạo BIDV', 'TLD .tk đáng ngờ', 'Phishing'],
    aiConfidence: 0.98,
    heuristicScore: 85,
    aiScore: 95,
  },

  // CAUTION - Suspicious
  {
    url: 'https://phim-hay.xyz',
    domain: 'phim-hay.xyz',
    score: 55,
    label: 'CAUTION',
    reasons: ['Website phim lậu', 'TLD .xyz đáng ngờ', 'Vi phạm bản quyền'],
    aiConfidence: 0.85,
    heuristicScore: 45,
    aiScore: 60,
  },
  {
    url: 'https://download-free.cf',
    domain: 'download-free.cf',
    score: 68,
    label: 'CAUTION',
    reasons: ['TLD .cf miễn phí', 'Download không rõ nguồn', 'Nguy cơ malware'],
    aiConfidence: 0.82,
    heuristicScore: 55,
    aiScore: 70,
  },
  {
    url: 'https://bit.ly/free-iphone',
    domain: 'bit.ly',
    score: 51,
    label: 'CAUTION',
    reasons: ['Link rút gọn', 'Không xác định được đích đến', 'Tiềm ẩn rủi ro'],
    aiConfidence: 0.80,
    heuristicScore: 40,
    aiScore: 60,
  },
]

async function main() {
  console.log('🌱 Seeding training data...')

  for (const example of trainingExamples) {
    await prisma.scanHistory.create({
      data: example,
    })
    console.log(`  ✓ ${example.domain} (${example.label})`)
  }

  console.log(`\n✅ Đã seed ${trainingExamples.length} mẫu dữ liệu`)

  // Show statistics
  const stats = await prisma.scanHistory.groupBy({
    by: ['label'],
    _count: true,
  })

  console.log('\n📊 Thống kê:')
  stats.forEach((s) => {
    console.log(`  ${s.label}: ${s._count} mẫu`)
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
