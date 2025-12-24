import { Shield, Lock, Database, Eye, Trash2, FileText } from 'lucide-react'
import Link from 'next/link'

export default function TransparencyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Shield size={64} className="mx-auto text-blue-600 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Tính minh bạch & Bảo mật dữ liệu
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Chúng tôi cam kết bảo vệ quyền riêng tư và an toàn dữ liệu của bạn
          </p>
        </div>

        {/* What We Collect */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Database className="text-blue-600" />
            Dữ liệu chúng tôi thu thập
          </h2>
          
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold mb-2">1. Dữ liệu tài khoản</h3>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>Email (bắt buộc để đăng nhập)</li>
                <li>Tên (tùy chọn)</li>
                <li>Mật khẩu (được mã hóa với bcrypt)</li>
                <li>Avatar (nếu dùng Google OAuth)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Dữ liệu sử dụng</h3>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>URL bạn quét (lưu trong lịch sử nếu đăng nhập)</li>
                <li>Kết quả phân tích</li>
                <li>Địa chỉ IP (để chống spam)</li>
                <li>User agent (để analytics)</li>
                <li>Thời gian truy cập</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Dữ liệu thanh toán</h3>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>Thông tin thanh toán được xử lý bởi Stripe (không lưu trên server)</li>
                <li>Lịch sử hóa đơn</li>
                <li>Trạng thái subscription</li>
              </ul>
            </div>
          </div>
        </section>

        {/* How We Use Data */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Eye className="text-green-600" />
            Mục đích sử dụng dữ liệu
          </h2>
          
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p><strong>Cung cấp dịch vụ:</strong> Phân tích URL, lưu lịch sử, gửi cảnh báo</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p><strong>Cải thiện AI:</strong> Huấn luyện model từ dữ liệu cộng đồng (ẩn danh hóa)</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p><strong>Bảo mật:</strong> Phát hiện spam, ngăn chặn lạm dụng hệ thống</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p><strong>Analytics:</strong> Thống kê sử dụng, cải thiện trải nghiệm</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <p><strong>Hỗ trợ khách hàng:</strong> Giải quyết vấn đề, trả lời câu hỏi</p>
            </div>
          </div>
        </section>

        {/* Data Storage */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <Lock className="text-purple-600" />
            Lưu trữ & Bảo mật
          </h2>
          
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold mb-2">Thời gian lưu trữ</h3>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li><strong>Gói Free:</strong> 10-20 lần quét gần nhất</li>
                <li><strong>Gói Pro:</strong> Lịch sử 30 ngày</li>
                <li><strong>Gói Business:</strong> Lịch sử 1 năm</li>
                <li><strong>Gói Enterprise:</strong> Tùy chỉnh theo hợp đồng</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Biện pháp bảo mật</h3>
              <ul className="list-disc list-inside pl-4 space-y-1">
                <li>Mã hóa dữ liệu khi truyền tải (HTTPS/TLS)</li>
                <li>Mã hóa mật khẩu với bcrypt (cost factor 12)</li>
                <li>Database hosted trên Supabase (SOC 2 Type II certified)</li>
                <li>Backup hàng ngày</li>
                <li>Rate limiting để chống DDoS</li>
                <li>2FA cho tài khoản Enterprise</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Chia sẻ dữ liệu</h3>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-4">
                <p className="font-semibold text-green-800 dark:text-green-200">
                  ✅ Chúng tôi KHÔNG BÁN dữ liệu của bạn cho bên thứ ba
                </p>
                <p className="mt-2 text-sm">
                  Dữ liệu chỉ chia sẻ với:
                </p>
                <ul className="list-disc list-inside text-sm mt-1">
                  <li>Stripe (xử lý thanh toán)</li>
                  <li>Google (nếu bạn dùng Google OAuth)</li>
                  <li>Cơ quan pháp luật (nếu có yêu cầu hợp pháp)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Your Rights */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
            <FileText className="text-orange-600" />
            Quyền của bạn
          </h2>
          
          <div className="space-y-3 text-gray-700 dark:text-gray-300">
            <div>
              <h3 className="font-semibold">🔍 Quyền truy cập</h3>
              <p className="text-sm pl-6">Xem tất cả dữ liệu cá nhân trong Dashboard</p>
            </div>
            <div>
              <h3 className="font-semibold">✏️ Quyền chỉnh sửa</h3>
              <p className="text-sm pl-6">Cập nhật thông tin tài khoản bất cứ lúc nào</p>
            </div>
            <div>
              <h3 className="font-semibold">🗑️ Quyền xóa</h3>
              <p className="text-sm pl-6">Xóa tài khoản và toàn bộ dữ liệu trong Settings</p>
            </div>
            <div>
              <h3 className="font-semibold">📦 Quyền di chuyển</h3>
              <p className="text-sm pl-6">Xuất dữ liệu dạng CSV/JSON</p>
            </div>
            <div>
              <h3 className="font-semibold">🚫 Quyền từ chối</h3>
              <p className="text-sm pl-6">Từ chối email marketing (analytics vẫn hoạt động)</p>
            </div>
          </div>
        </section>

        {/* Delete Data */}
        <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-3 text-red-600">
            <Trash2 />
            Xóa dữ liệu
          </h2>
          
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>Bạn có thể xóa dữ liệu theo cách sau:</p>
            
            <div>
              <h3 className="font-semibold">Xóa lịch sử quét</h3>
              <p className="text-sm mb-2">Vào Dashboard → Lịch sử → Click nút Trash trên từng item</p>
            </div>

            <div>
              <h3 className="font-semibold">Xóa tài khoản</h3>
              <p className="text-sm mb-2">
                Vào <Link href="/dashboard/settings" className="text-blue-600 hover:underline">Settings</Link> → Danger Zone → Delete Account
              </p>
              <p className="text-sm text-orange-600">
                ⚠️ Hành động này không thể hoàn tác. Tất cả dữ liệu sẽ bị xóa vĩnh viễn sau 30 ngày.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Vẫn còn thắc mắc?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Liên hệ với chúng tôi về vấn đề bảo mật và quyền riêng tư
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:privacy@antiscam.vn"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Email: privacy@antiscam.vn
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold"
            >
              Form liên hệ
            </Link>
          </div>
        </section>

        {/* Last Updated */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Cập nhật lần cuối: 24 tháng 12, 2025
        </p>
      </div>
    </div>
  )
}
