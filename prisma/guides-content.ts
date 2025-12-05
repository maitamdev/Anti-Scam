export const guidesContent = [
  {
    title: '5 bước tạo mật khẩu không thể bẻ khóa',
    slug: '5-buoc-tao-mat-khau-manh',
    description: 'Hướng dẫn chi tiết cách tạo và quản lý mật khẩu mạnh để bảo vệ tài khoản của bạn khỏi hacker.',
    level: 'basic',
    categorySlug: 'mat-khau',
    content: `
<h2>Tại sao mật khẩu mạnh lại quan trọng?</h2>
<p>Mật khẩu là lớp bảo vệ đầu tiên và quan trọng nhất cho tài khoản trực tuyến của bạn. Theo thống kê từ Verizon Data Breach Report 2023, hơn 80% các vụ xâm nhập dữ liệu liên quan đến mật khẩu yếu hoặc bị đánh cắp. Một mật khẩu yếu như "123456" hoặc "password" có thể bị bẻ khóa trong chưa đầy 1 giây bằng các công cụ tự động.</p>
<p>Hacker sử dụng nhiều phương pháp để bẻ khóa mật khẩu: tấn công từ điển (dictionary attack), tấn công brute force, và credential stuffing (sử dụng mật khẩu bị lộ từ các vụ rò rỉ dữ liệu). Việc có một mật khẩu mạnh và duy nhất cho mỗi tài khoản là cách hiệu quả nhất để bảo vệ bạn.</p>

<h2>5 bước tạo mật khẩu không thể bẻ khóa</h2>
<ol>
<li><strong>Độ dài tối thiểu 12-16 ký tự:</strong> Mỗi ký tự thêm vào làm tăng độ khó bẻ khóa theo cấp số nhân. Mật khẩu 8 ký tự có thể bị bẻ trong vài giờ, nhưng 16 ký tự cần hàng triệu năm.</li>
<li><strong>Kết hợp đa dạng ký tự:</strong> Sử dụng chữ hoa (A-Z), chữ thường (a-z), số (0-9) và ký tự đặc biệt (!@#$%^&*). Ví dụ: "Tr0ng_M@t_Kh@u_2024!" thay vì "trongmatkhau2024".</li>
<li><strong>Tránh thông tin cá nhân:</strong> Không dùng tên, ngày sinh, số điện thoại, tên thú cưng, hoặc bất kỳ thông tin nào có thể tìm thấy trên mạng xã hội của bạn.</li>
<li><strong>Sử dụng cụm từ (passphrase):</strong> Thay vì một từ, hãy dùng một câu dễ nhớ và biến đổi. Ví dụ: "Tôi thích uống cà phê mỗi sáng" → "T0i_Th1ch#CaPhe@MoiSang!"</li>
<li><strong>Mỗi tài khoản một mật khẩu riêng:</strong> Nếu một tài khoản bị hack, các tài khoản khác vẫn an toàn. Đây là nguyên tắc vàng trong bảo mật.</li>
</ol>

<h2>Sử dụng trình quản lý mật khẩu</h2>
<p>Với hàng chục tài khoản online, việc nhớ mật khẩu riêng cho từng tài khoản là bất khả thi. Đây là lúc trình quản lý mật khẩu (Password Manager) phát huy tác dụng:</p>
<ul>
<li><strong>Bitwarden (Miễn phí):</strong> Mã nguồn mở, bảo mật cao, đồng bộ đa thiết bị. Phù hợp cho người dùng cá nhân.</li>
<li><strong>1Password (Trả phí):</strong> Giao diện đẹp, tính năng chia sẻ gia đình, tích hợp tốt với trình duyệt.</li>
<li><strong>LastPass (Freemium):</strong> Phổ biến, dễ sử dụng, có bản miễn phí với tính năng cơ bản.</li>
<li><strong>KeePass (Miễn phí):</strong> Lưu trữ offline, không cần đăng ký tài khoản, phù hợp người cần bảo mật cao.</li>
</ul>
<p>Bạn chỉ cần nhớ một Master Password duy nhất để truy cập tất cả mật khẩu khác. Hãy đảm bảo Master Password cực kỳ mạnh và bật xác thực 2 yếu tố (2FA) cho trình quản lý mật khẩu.</p>

<h2>Kiểm tra mật khẩu đã bị lộ chưa</h2>
<p>Truy cập haveibeenpwned.com để kiểm tra xem email hoặc mật khẩu của bạn có trong các vụ rò rỉ dữ liệu không. Nếu có, hãy đổi mật khẩu ngay lập tức cho tất cả tài khoản sử dụng mật khẩu đó.</p>

<h2>Mẹo nhớ mật khẩu mạnh</h2>
<ul>
<li><strong>Phương pháp câu chuyện:</strong> Tạo một câu chuyện ngắn và lấy chữ cái đầu. "Con mèo đen của tôi tên là Miu, sinh năm 2020" → "CmDcTtlM,sn2020!"</li>
<li><strong>Phương pháp thay thế:</strong> Thay chữ bằng số/ký tự tương tự. a→@, e→3, i→1, o→0, s→$</li>
<li><strong>Phương pháp bàn phím:</strong> Tạo pattern trên bàn phím nhưng thêm biến thể. Ví dụ: "qwerty" → "Qw3rTy!@#"</li>
</ul>
`
  },
  {
    title: 'Hướng dẫn nhận biết email lừa đảo (Phishing)',
    slug: 'nhan-biet-email-lua-dao',
    description: 'Các dấu hiệu cảnh báo chi tiết để phát hiện và tránh các cuộc tấn công lừa đảo qua email.',
    level: 'basic',
    categorySlug: 'lua-dao',
    content: `
<h2>Email lừa đảo (Phishing) là gì?</h2>
<p>Phishing là hình thức tấn công mạng phổ biến nhất, chiếm hơn 90% các cuộc tấn công theo báo cáo của APWG. Kẻ lừa đảo gửi email giả mạo từ các tổ chức uy tín (ngân hàng, công ty công nghệ, cơ quan nhà nước) để đánh cắp thông tin đăng nhập, số thẻ tín dụng, hoặc cài đặt phần mềm độc hại.</p>
<p>Tại Việt Nam, các chiến dịch phishing thường giả mạo Vietcombank, Techcombank, BIDV, Shopee, Lazada, và các cơ quan thuế, công an. Thiệt hại từ phishing tại Việt Nam ước tính hàng nghìn tỷ đồng mỗi năm.</p>

<h2>10 dấu hiệu nhận biết email phishing</h2>
<ol>
<li><strong>Địa chỉ email gửi đáng ngờ:</strong> Kiểm tra kỹ domain. Ví dụ: support@vietcombank-secure.com (giả) vs support@vietcombank.com.vn (thật). Chú ý các ký tự thay thế như "rn" thay "m", "0" thay "o".</li>
<li><strong>Lời chào chung chung:</strong> "Kính gửi Quý khách hàng" thay vì tên cụ thể của bạn. Ngân hàng thật luôn biết tên bạn.</li>
<li><strong>Tạo cảm giác khẩn cấp:</strong> "Tài khoản sẽ bị khóa trong 24h", "Hành động ngay để tránh mất tiền". Đây là chiến thuật tâm lý để bạn không kịp suy nghĩ.</li>
<li><strong>Link đáng ngờ:</strong> Hover chuột (không click) để xem URL thật. Link giả thường có domain lạ hoặc subdomain dài.</li>
<li><strong>Lỗi chính tả và ngữ pháp:</strong> Email chính thức từ tổ chức lớn hiếm khi có lỗi. Nhiều email phishing được dịch tự động nên có lỗi ngữ pháp.</li>
<li><strong>Yêu cầu thông tin nhạy cảm:</strong> Ngân hàng KHÔNG BAO GIỜ yêu cầu mật khẩu, OTP, số CVV qua email.</li>
<li><strong>File đính kèm đáng ngờ:</strong> Đặc biệt các file .exe, .zip, .js, hoặc file Office yêu cầu bật macro.</li>
<li><strong>Thiết kế email kém chất lượng:</strong> Logo mờ, màu sắc không đúng brand, layout lộn xộn.</li>
<li><strong>Không có thông tin liên hệ:</strong> Email thật luôn có footer với địa chỉ, hotline, và link chính sách.</li>
<li><strong>Quá tốt để là thật:</strong> "Bạn trúng thưởng 100 triệu", "Nhận iPhone miễn phí" - nếu bạn không tham gia gì thì không thể trúng.</li>
</ol>

<h2>Cách xử lý khi nhận email đáng ngờ</h2>
<ul>
<li><strong>KHÔNG click bất kỳ link nào</strong> trong email</li>
<li><strong>KHÔNG tải file đính kèm</strong></li>
<li><strong>KHÔNG trả lời email</strong> hoặc cung cấp thông tin</li>
<li><strong>Truy cập trực tiếp website chính thức</strong> bằng cách gõ địa chỉ vào trình duyệt</li>
<li><strong>Gọi hotline chính thức</strong> của tổ chức để xác nhận</li>
<li><strong>Báo cáo email</strong> là spam/phishing trong email client</li>
<li><strong>Chuyển tiếp email</strong> cho bộ phận IT nếu là email công ty</li>
</ul>

<h2>Ví dụ email phishing thực tế tại Việt Nam</h2>
<p><strong>Giả mạo Vietcombank:</strong> "Tài khoản của bạn đã bị khóa do đăng nhập sai 3 lần. Click vào đây để xác minh danh tính và mở khóa tài khoản." - Link dẫn đến vietcombank-verify.com (giả)</p>
<p><strong>Giả mạo Shopee:</strong> "Chúc mừng! Bạn đã trúng thưởng iPhone 15 Pro Max trong chương trình tri ân khách hàng. Nhập thông tin để nhận quà." - Yêu cầu số thẻ, CVV</p>
<p><strong>Giả mạo Cục Thuế:</strong> "Bạn có khoản hoàn thuế 5.000.000đ chưa nhận. Đăng nhập để nhận tiền." - Link đến trang giả mạo cổng dịch vụ công</p>
`
  },
  {
    title: 'Cách bảo mật mạng Wi-Fi tại nhà',
    slug: 'bao-mat-wifi-tai-nha',
    description: 'Hướng dẫn chi tiết thiết lập mạng không dây an toàn để ngăn chặn truy cập trái phép và bảo vệ dữ liệu gia đình.',
    level: 'advanced',
    categorySlug: 'wifi-mang',
    content: `
<h2>Tại sao cần bảo mật Wi-Fi?</h2>
<p>Wi-Fi không được bảo mật đúng cách có thể dẫn đến nhiều rủi ro nghiêm trọng: người lạ sử dụng internet miễn phí (làm chậm mạng), đánh cắp dữ liệu cá nhân khi bạn truy cập ngân hàng online, theo dõi hoạt động trực tuyến, hoặc thậm chí sử dụng mạng của bạn cho hoạt động phi pháp.</p>
<p>Theo khảo sát, hơn 40% router tại Việt Nam vẫn sử dụng mật khẩu mặc định hoặc mật khẩu yếu, tạo điều kiện cho hacker dễ dàng xâm nhập.</p>

<h2>Các bước bảo mật Wi-Fi chi tiết</h2>
<ol>
<li><strong>Đổi mật khẩu admin router:</strong> Mật khẩu mặc định thường là admin/admin hoặc admin/password. Truy cập 192.168.1.1 hoặc 192.168.0.1, đăng nhập và đổi ngay. Đặt mật khẩu mạnh ít nhất 12 ký tự.</li>
<li><strong>Sử dụng mã hóa WPA3 hoặc WPA2-AES:</strong> Vào phần Wireless Security, chọn WPA3-Personal (nếu có) hoặc WPA2-AES. TUYỆT ĐỐI không dùng WEP (đã bị bẻ khóa từ 2001) hoặc WPA-TKIP.</li>
<li><strong>Đặt mật khẩu Wi-Fi mạnh:</strong> Tối thiểu 12 ký tự, kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt. Tránh dùng số điện thoại, địa chỉ nhà.</li>
<li><strong>Đổi tên mạng (SSID):</strong> Không dùng tên mặc định như "TP-Link_XXXX" vì tiết lộ loại router. Cũng không dùng tên/địa chỉ nhà. Đặt tên trung tính.</li>
<li><strong>Tắt WPS (Wi-Fi Protected Setup):</strong> WPS có lỗ hổng bảo mật nghiêm trọng, có thể bị brute force trong vài giờ. Tắt trong phần cài đặt router.</li>
<li><strong>Cập nhật firmware router:</strong> Nhà sản xuất thường xuyên vá lỗ hổng bảo mật. Kiểm tra và cập nhật firmware mỗi 3 tháng.</li>
<li><strong>Tạo mạng Guest riêng:</strong> Cho khách sử dụng mạng Guest với mật khẩu khác, cách ly khỏi mạng chính và các thiết bị của bạn.</li>
<li><strong>Giới hạn thiết bị kết nối:</strong> Sử dụng MAC filtering để chỉ cho phép các thiết bị đã biết kết nối (tuy nhiên MAC có thể bị giả mạo).</li>
</ol>

<h2>Cài đặt nâng cao</h2>
<ul>
<li><strong>Tắt quản lý từ xa:</strong> Disable Remote Management để ngăn truy cập router từ internet.</li>
<li><strong>Đổi cổng quản lý:</strong> Đổi từ cổng 80 mặc định sang cổng khác.</li>
<li><strong>Bật tường lửa router:</strong> Hầu hết router có firewall tích hợp, hãy đảm bảo nó được bật.</li>
<li><strong>Sử dụng DNS an toàn:</strong> Đổi DNS sang 1.1.1.1 (Cloudflare) hoặc 8.8.8.8 (Google) để tăng bảo mật và tốc độ.</li>
<li><strong>Kiểm tra thiết bị kết nối:</strong> Định kỳ vào router xem danh sách thiết bị đang kết nối, phát hiện thiết bị lạ.</li>
</ul>
`
  },

  {
    title: 'An toàn khi sử dụng mạng xã hội',
    slug: 'an-toan-mang-xa-hoi',
    description: 'Hướng dẫn cài đặt quyền riêng tư và chia sẻ thông tin thông minh trên Facebook, Zalo, TikTok.',
    level: 'basic',
    categorySlug: 'mang-xa-hoi',
    content: `
<h2>Rủi ro khi chia sẻ quá nhiều trên mạng xã hội</h2>
<p>Mạng xã hội là mỏ vàng thông tin cho kẻ lừa đảo. Từ những thông tin tưởng chừng vô hại như ngày sinh, tên thú cưng, trường học, nơi làm việc, kẻ xấu có thể: đoán mật khẩu và câu hỏi bảo mật, giả mạo danh tính để lừa bạn bè/người thân, tấn công có chủ đích (spear phishing), theo dõi lịch trình để đột nhập nhà khi bạn đi vắng.</p>
<p>Theo thống kê, 78% kẻ trộm sử dụng mạng xã hội để xác định mục tiêu và thời điểm ra tay.</p>

<h2>Cài đặt quyền riêng tư trên Facebook</h2>
<ol>
<li><strong>Ai có thể xem bài đăng:</strong> Vào Settings → Privacy → Who can see your future posts → Chọn "Friends" thay vì "Public"</li>
<li><strong>Giới hạn bài đăng cũ:</strong> Settings → Privacy → Limit Past Posts để chuyển tất cả bài cũ về Friends only</li>
<li><strong>Ẩn danh sách bạn bè:</strong> Vào Profile → Friends → Edit Privacy → Chọn "Only me"</li>
<li><strong>Kiểm soát tag:</strong> Settings → Profile and Tagging → Bật "Review tags" và "Review posts you're tagged in"</li>
<li><strong>Ẩn thông tin cá nhân:</strong> Vào About → Edit từng mục → Chọn "Only me" cho số điện thoại, email, ngày sinh, địa chỉ</li>
<li><strong>Tắt nhận diện khuôn mặt:</strong> Settings → Face Recognition → Chọn "No"</li>
<li><strong>Kiểm tra ứng dụng kết nối:</strong> Settings → Apps and Websites → Xóa các app không dùng</li>
</ol>

<h2>Những điều KHÔNG NÊN chia sẻ</h2>
<ul>
<li><strong>Ảnh CMND/CCCD, bằng lái, hộ chiếu:</strong> Thông tin này có thể bị dùng để mở tài khoản ngân hàng, vay tiền, hoặc giả mạo danh tính</li>
<li><strong>Vé máy bay, boarding pass:</strong> Chứa mã đặt chỗ (PNR) có thể bị dùng để thay đổi/hủy chuyến bay</li>
<li><strong>Địa chỉ nhà cụ thể:</strong> Kẻ xấu có thể đến tận nhà hoặc gửi hàng lừa đảo</li>
<li><strong>Lịch trình đi du lịch:</strong> "Đi Đà Nẵng 1 tuần" = "Nhà tôi trống 1 tuần"</li>
<li><strong>Ảnh chìa khóa:</strong> Có thể bị sao chép từ ảnh</li>
<li><strong>Thông tin tài chính:</strong> Lương, số dư tài khoản, hóa đơn</li>
<li><strong>Thông tin công việc nhạy cảm:</strong> Có thể vi phạm NDA và bị lợi dụng</li>
</ul>

<h2>Nhận biết tài khoản giả mạo</h2>
<ul>
<li>Tài khoản mới tạo, ít bạn bè, ít bài đăng</li>
<li>Ảnh đại diện là người mẫu/người nổi tiếng hoặc ảnh stock</li>
<li>Chủ động kết bạn và nhắn tin ngay</li>
<li>Hỏi thông tin cá nhân hoặc xin tiền</li>
<li>Tên có ký tự lạ hoặc số thay chữ</li>
</ul>
`
  },
  {
    title: 'Bảo vệ điện thoại khỏi phần mềm độc hại',
    slug: 'bao-ve-dien-thoai-malware',
    description: 'Hướng dẫn toàn diện các bước bảo vệ smartphone Android và iPhone khỏi virus, malware, spyware.',
    level: 'advanced',
    categorySlug: 'thiet-bi',
    content: `
<h2>Các loại malware phổ biến trên điện thoại</h2>
<p>Điện thoại thông minh chứa đựng toàn bộ cuộc sống số của bạn: tin nhắn, ảnh, tài khoản ngân hàng, email công việc. Malware trên điện thoại có thể:</p>
<ul>
<li><strong>Spyware:</strong> Theo dõi vị trí, ghi âm cuộc gọi, đọc tin nhắn, chụp màn hình</li>
<li><strong>Banking Trojan:</strong> Đánh cắp thông tin đăng nhập ngân hàng, OTP</li>
<li><strong>Ransomware:</strong> Khóa điện thoại, đòi tiền chuộc</li>
<li><strong>Adware:</strong> Hiển thị quảng cáo liên tục, tiêu hao pin và data</li>
<li><strong>Cryptominer:</strong> Sử dụng điện thoại để đào tiền ảo, làm nóng và hỏng máy</li>
</ul>

<h2>Cách malware xâm nhập điện thoại</h2>
<ol>
<li><strong>Ứng dụng giả mạo:</strong> App giả mạo game, tiện ích phổ biến trên store không chính thức</li>
<li><strong>Link độc hại:</strong> Click link trong SMS, email, tin nhắn mạng xã hội</li>
<li><strong>File APK từ nguồn lạ:</strong> Cài đặt file APK tải từ web không rõ nguồn gốc</li>
<li><strong>Wi-Fi công cộng:</strong> Kết nối Wi-Fi không mật khẩu tại quán cafe, sân bay</li>
<li><strong>Cáp sạc công cộng:</strong> Juice jacking - cáp sạc USB có thể truyền malware</li>
</ol>

<h2>10 bước bảo vệ điện thoại</h2>
<ol>
<li><strong>Chỉ cài app từ store chính thức:</strong> Google Play (Android), App Store (iOS). Tránh xa các store bên thứ 3.</li>
<li><strong>Kiểm tra quyền truy cập:</strong> App đèn pin không cần quyền đọc tin nhắn, danh bạ, vị trí. Từ chối các quyền không hợp lý.</li>
<li><strong>Đọc đánh giá trước khi cài:</strong> Xem review, số lượt tải, nhà phát triển. Cẩn thận với app mới, ít review.</li>
<li><strong>Cập nhật hệ điều hành:</strong> Bật cập nhật tự động. Các bản vá bảo mật rất quan trọng.</li>
<li><strong>Không root/jailbreak:</strong> Việc này vô hiệu hóa nhiều lớp bảo mật của hệ điều hành.</li>
<li><strong>Cài phần mềm bảo mật:</strong> Kaspersky, Bitdefender, Norton cho Android. iOS ít cần hơn nhưng vẫn nên có.</li>
<li><strong>Bật khóa màn hình:</strong> Sử dụng PIN 6 số, vân tay, hoặc Face ID. Tránh pattern đơn giản.</li>
<li><strong>Bật Find My Device:</strong> Để có thể định vị, khóa, xóa dữ liệu từ xa nếu mất điện thoại.</li>
<li><strong>Sao lưu dữ liệu:</strong> Backup thường xuyên lên cloud hoặc máy tính.</li>
<li><strong>Cẩn thận với Wi-Fi công cộng:</strong> Sử dụng VPN khi kết nối Wi-Fi lạ. Không truy cập ngân hàng trên Wi-Fi công cộng.</li>
</ol>

<h2>Dấu hiệu điện thoại bị nhiễm malware</h2>
<ul>
<li>Pin hết nhanh bất thường</li>
<li>Điện thoại nóng khi không sử dụng</li>
<li>Data di động tăng đột biến</li>
<li>Xuất hiện app lạ không cài</li>
<li>Quảng cáo pop-up liên tục</li>
<li>Điện thoại chậm, lag</li>
<li>Tin nhắn/cuộc gọi lạ trong lịch sử</li>
</ul>
`
  },

  {
    title: 'Tại sao cập nhật phần mềm lại quan trọng?',
    slug: 'tai-sao-cap-nhat-phan-mem',
    description: 'Hiểu rõ tầm quan trọng của việc luôn cập nhật hệ điều hành, trình duyệt và ứng dụng để bảo vệ thiết bị.',
    level: 'basic',
    categorySlug: 'phan-mem',
    content: `
<h2>Cập nhật phần mềm = Vá lỗ hổng bảo mật</h2>
<p>Mỗi phần mềm đều có lỗi (bug), và một số lỗi có thể bị hacker khai thác để xâm nhập hệ thống. Khi lỗ hổng được phát hiện, nhà phát triển sẽ phát hành bản vá (patch) trong các bản cập nhật. Nếu bạn không cập nhật, thiết bị của bạn vẫn có lỗ hổng đã được công khai - như để cửa nhà mở toang.</p>
<p>Ví dụ thực tế: Lỗ hổng WannaCry năm 2017 đã lây nhiễm hơn 200,000 máy tính trên 150 quốc gia, gây thiệt hại hàng tỷ đô la. Microsoft đã phát hành bản vá 2 tháng trước đó, nhưng nhiều người không cập nhật.</p>

<h2>Các loại cập nhật quan trọng</h2>
<ol>
<li><strong>Cập nhật hệ điều hành (OS):</strong> Windows Update, macOS Update, iOS/Android Update. Đây là cập nhật quan trọng nhất vì OS là nền tảng của mọi thứ.</li>
<li><strong>Cập nhật trình duyệt:</strong> Chrome, Firefox, Safari, Edge. Trình duyệt là cửa ngõ vào internet, thường xuyên bị tấn công.</li>
<li><strong>Cập nhật ứng dụng:</strong> Đặc biệt các app ngân hàng, email, mạng xã hội - nơi chứa dữ liệu nhạy cảm.</li>
<li><strong>Cập nhật firmware:</strong> Router, camera IP, thiết bị IoT. Thường bị bỏ quên nhưng rất quan trọng.</li>
<li><strong>Cập nhật driver:</strong> Driver card đồ họa, âm thanh, mạng trên máy tính.</li>
</ol>

<h2>Rủi ro khi không cập nhật</h2>
<ul>
<li><strong>Bị khai thác lỗ hổng đã biết:</strong> Hacker có danh sách các lỗ hổng và công cụ khai thác sẵn. Thiết bị không cập nhật là mục tiêu dễ dàng.</li>
<li><strong>Malware xâm nhập:</strong> Nhiều malware lây lan qua các lỗ hổng chưa được vá.</li>
<li><strong>Dữ liệu bị đánh cắp:</strong> Thông tin cá nhân, tài khoản ngân hàng, mật khẩu có thể bị lộ.</li>
<li><strong>Thiết bị bị kiểm soát:</strong> Hacker có thể biến thiết bị của bạn thành botnet để tấn công người khác.</li>
<li><strong>Ransomware:</strong> Dữ liệu bị mã hóa, đòi tiền chuộc.</li>
</ul>

<h2>Cách cập nhật an toàn và hiệu quả</h2>
<ol>
<li><strong>Bật cập nhật tự động:</strong> Đây là cách đơn giản nhất. Windows: Settings → Update & Security → Windows Update → Advanced options → Bật Automatic updates.</li>
<li><strong>Cập nhật ngay khi có thông báo:</strong> Đừng nhấn "Remind me later" quá nhiều lần. Lỗ hổng càng để lâu càng nguy hiểm.</li>
<li><strong>Ưu tiên Security Update:</strong> Nếu bận, hãy ưu tiên các bản cập nhật có ghi "Security" hoặc "Critical".</li>
<li><strong>Backup trước khi cập nhật lớn:</strong> Với các bản cập nhật OS lớn (như Windows 10 lên 11), nên backup dữ liệu phòng trường hợp lỗi.</li>
<li><strong>Cập nhật từ nguồn chính thức:</strong> Chỉ tải cập nhật từ website chính thức hoặc qua tính năng update tích hợp. Không tải từ link lạ.</li>
<li><strong>Khởi động lại sau cập nhật:</strong> Nhiều bản vá chỉ có hiệu lực sau khi restart.</li>
</ol>

<h2>Lịch cập nhật khuyến nghị</h2>
<ul>
<li><strong>Hệ điều hành:</strong> Ngay khi có thông báo, tối đa trong 1 tuần</li>
<li><strong>Trình duyệt:</strong> Ngay lập tức (thường tự động)</li>
<li><strong>Ứng dụng điện thoại:</strong> Hàng tuần, bật auto-update</li>
<li><strong>Router:</strong> Kiểm tra mỗi tháng</li>
<li><strong>Phần mềm diệt virus:</strong> Tự động cập nhật hàng ngày</li>
</ul>
`
  }
]
