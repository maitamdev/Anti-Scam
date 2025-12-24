'use client'

import { useState } from 'react'
import { Check, ArrowLeft } from 'lucide-react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    tier: 'FREE',
    price: 0,
    currency: 'VND',
    interval: 'miễn phí',
    description: 'Dùng thử miễn phí',
    features: [
      '10 scans/ngày',
      'URL scanning cơ bản',
      '3 image scans/ngày',
      'Báo cáo cơ bản',
      'Community support',
      'Lưu 10 lần quét gần nhất',
    ],
    cta: 'Bắt đầu miễn phí',
    popular: false,
  },
  {
    name: 'Pro',
    tier: 'PRO',
    price: 99000,
    priceUSD: 4.99,
    currency: 'VND',
    interval: 'tháng',
    description: 'Cho cá nhân & freelancer',
    features: [
      '100 scans/ngày',
      'Unlimited URL scanning',
      '30 image scans/ngày',
      'Advanced AI analysis',
      'Lịch sử không giới hạn + tìm kiếm',
      'Xuất báo cáo PDF',
      'Share link kết quả',
      'Watchlist: theo dõi domains',
      'Priority support',
      'Browser extension',
      'Email alerts',
    ],
    cta: 'Nâng cấp Pro',
    popular: true,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID,
  },
  {
    name: 'Business',
    tier: 'BUSINESS',
    price: 499000,
    priceUSD: 19.99,
    currency: 'VND',
    interval: 'tháng',
    description: 'Cho doanh nghiệp & tổ chức',
    features: [
      '1000 scans/ngày',
      'Unlimited image scans',
      'Bulk scanning (CSV)',
      'API access (50K calls/tháng)',
      'Webhooks',
      'Tùy chỉnh báo cáo (logo, branding)',
      'Training campaigns',
      'Custom quiz cho nhân viên',
      'Team collaboration (5 users)',
      'White-label reports',
      'Lịch sử 1 năm',
      '24/7 support',
      'Dashboard analytics',
    ],
    cta: 'Nâng cấp Business',
    popular: false,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_BUSINESS_PRICE_ID,
  },
  {
    name: 'Enterprise',
    tier: 'ENTERPRISE',
    price: null,
    currency: '',
    interval: 'liên hệ',
    description: 'Giải pháp tùy chỉnh',
    features: [
      'Unlimited mọi thứ',
      'Dedicated API',
      'Custom integration',
      'On-premise deployment',
      'SLA 99.9%',
      'Dedicated account manager',
      'Custom AI training',
      'Priority features',
      'White-label platform',
      'Advanced analytics',
      'Custom contracts',
    ],
    cta: 'Liên hệ sales',
    popular: false,
  },
]

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const router = useRouter()

  const handleSelectPlan = async (plan: typeof plans[0]) => {
    if (plan.tier === 'FREE') {
      router.push('/auth/signin')
      return
    }

    if (plan.tier === 'ENTERPRISE') {
      window.location.href = 'mailto:sales@antiscam.vn?subject=Enterprise Plan Inquiry'
      return
    }

    setIsLoading(plan.tier)

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: plan.stripePriceId,
          tier: plan.tier,
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL')
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại trang chủ</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Chọn gói phù hợp với bạn
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Bảo vệ bản thân và tổ chức khỏi lừa đảo trực tuyến
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden ${
                plan.popular ? 'ring-2 ring-blue-500 relative' : ''
              }`}
            >
              {plan.popular && (
                <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                  Phổ biến nhất
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {plan.description}
                </p>

                <div className="mb-6">
                  {plan.price !== null ? (
                    <>
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {plan.price === 0 ? '₫0' : `₫${plan.price.toLocaleString()}`}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        /{plan.interval}
                      </span>
                      {plan.priceUSD && (
                        <p className="text-sm text-gray-500 mt-1">
                          (~${plan.priceUSD} USD)
                        </p>
                      )}
                    </>
                  ) : (
                    <span className="text-4xl font-bold text-gray-900 dark:text-white">
                      Custom
                    </span>
                  )}
                </div>

                <button
                  onClick={() => handleSelectPlan(plan)}
                  disabled={isLoading === plan.tier}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-blue-500 hover:bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isLoading === plan.tier ? 'Đang xử lý...' : plan.cta}
                </button>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Câu hỏi thường gặp
          </h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Tôi có thể hủy bất cứ lúc nào không?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Có, bạn có thể hủy gói trả phí bất cứ lúc nào từ Dashboard. 
                Bạn vẫn có thể sử dụng đến hết chu kỳ thanh toán hiện tại.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Có hỗ trợ thanh toán qua VNPay/MoMo không?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Hiện tại chúng tôi chấp nhận thẻ quốc tế qua Stripe. 
                Sẽ sớm hỗ trợ VNPay và MoMo trong tương lai.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Dữ liệu của tôi có được bảo mật không?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Tất cả dữ liệu được mã hóa và lưu trữ an toàn. 
                Xem thêm tại <a href="/privacy" className="text-blue-600 hover:underline">Chính sách bảo mật</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
