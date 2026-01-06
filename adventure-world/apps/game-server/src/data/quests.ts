// Zone 1: Phishing Forest Quests

export const QUESTS_Z1 = [
    {
        id: 'z1_q1',
        name: 'Email Detective',
        description: 'Nhận diện 5 email phishing trong mailbox ảo',
        difficulty: 'EASY',
        type: 'PUZZLE',
        xpReward: 100,
        coinReward: 20,
        badgeReward: null,
        data: {
            questions: [
                {
                    id: 'q1',
                    question: 'Email này từ "vietcombank-alerts@gmail.com" yêu cầu xác minh tài khoản. Đây là:',
                    options: [
                        { id: 'a', text: 'Email hợp lệ từ ngân hàng', isCorrect: false },
                        { id: 'b', text: 'Email lừa đảo - Ngân hàng không dùng Gmail', isCorrect: true },
                    ],
                    explanation: 'Ngân hàng sử dụng domain chính thức như @vietcombank.com.vn',
                },
                {
                    id: 'q2',
                    question: '"Bạn đã trúng thưởng 100 triệu! Click link để nhận ngay!" Email này là:',
                    options: [
                        { id: 'a', text: 'Thật - Ai không muốn trúng thưởng', isCorrect: false },
                        { id: 'b', text: 'Lừa đảo - Trúng thưởng ngẫu nhiên không có thật', isCorrect: true },
                    ],
                    explanation: 'Không có chương trình trúng thưởng ngẫu nhiên gửi qua email.',
                },
                {
                    id: 'q3',
                    question: 'Email có tiêu đề "URGENT: Account will be closed" từ địa chỉ lạ:',
                    options: [
                        { id: 'a', text: 'Hợp lệ - Cần hành động gấp', isCorrect: false },
                        { id: 'b', text: 'Lừa đảo - Tạo áp lực tâm lý', isCorrect: true },
                    ],
                    explanation: 'Scammer thường tạo cảm giác cấp bách để bạn không kịp suy nghĩ.',
                },
                {
                    id: 'q4',
                    question: 'Email yêu cầu "nhập lại mật khẩu vào link dưới đây":',
                    options: [
                        { id: 'a', text: 'Bình thường, hệ thống cần cập nhật', isCorrect: false },
                        { id: 'b', text: 'Lừa đảo - Không bao giờ nhập mật khẩu qua link email', isCorrect: true },
                    ],
                    explanation: 'Tổ chức uy tín không bao giờ yêu cầu mật khẩu qua email.',
                },
                {
                    id: 'q5',
                    question: 'Email từ "hr@company.com" thông báo bạn được tăng lương, click để xem:',
                    options: [
                        { id: 'a', text: 'Kiểm tra với HR trước khi click', isCorrect: true },
                        { id: 'b', text: 'Click ngay vì email từ công ty', isCorrect: false },
                    ],
                    explanation: 'Luôn xác minh qua kênh khác trước khi click link trong email.',
                },
            ],
        },
    },
    {
        id: 'z1_q2',
        name: 'Domain Hunter',
        description: 'Tìm 3 domain giả mạo trong rừng',
        difficulty: 'EASY',
        type: 'PUZZLE',
        xpReward: 150,
        coinReward: 30,
        badgeReward: null,
        data: {
            questions: [
                {
                    id: 'q1',
                    question: 'Domain nào là thật?',
                    options: [
                        { id: 'a', text: 'vietcombank.com.vn', isCorrect: true },
                        { id: 'b', text: 'vietcombank-online.com', isCorrect: false },
                    ],
                    explanation: 'Domain chính thức của Vietcombank là vietcombank.com.vn',
                },
                {
                    id: 'q2',
                    question: 'Domain nào là giả?',
                    options: [
                        { id: 'a', text: 'facebook.com', isCorrect: false },
                        { id: 'b', text: 'faceb00k-login.com', isCorrect: true },
                    ],
                    explanation: 'Lưu ý cách viết sai - dùng số 0 thay chữ o.',
                },
                {
                    id: 'q3',
                    question: 'Trang nào có vẻ an toàn?',
                    options: [
                        { id: 'a', text: 'https://momo.vn/payment', isCorrect: true },
                        { id: 'b', text: 'http://momo-pay.xyz/verify', isCorrect: false },
                    ],
                    explanation: 'HTTPS và domain .vn/.com.vn đáng tin hơn .xyz',
                },
            ],
        },
    },
    {
        id: 'z1_q3',
        name: 'Link Labyrinth',
        description: 'Đi đúng đường qua mê cung link thật/giả',
        difficulty: 'MEDIUM',
        type: 'PUZZLE',
        xpReward: 200,
        coinReward: 40,
        badgeReward: 'forest_explorer',
        data: {
            questions: [
                {
                    id: 'q1',
                    question: 'Bạn nhận SMS "Giao dịch 50tr, click để hủy: bit.ly/abc123". Bạn nên:',
                    options: [
                        { id: 'a', text: 'Click để hủy giao dịch ngay', isCorrect: false },
                        { id: 'b', text: 'Gọi hotline ngân hàng để kiểm tra', isCorrect: true },
                    ],
                    explanation: 'Không click link lạ. Liên hệ trực tiếp với ngân hàng.',
                },
                {
                    id: 'q2',
                    question: 'Website yêu cầu tải file .exe để "bảo vệ tài khoản":',
                    options: [
                        { id: 'a', text: 'Tải vì cần bảo vệ', isCorrect: false },
                        { id: 'b', text: 'Từ chối - File .exe có thể là virus', isCorrect: true },
                    ],
                    explanation: 'Không bao giờ tải file .exe từ trang web lạ.',
                },
                {
                    id: 'q3',
                    question: 'Link rút gọn bit.ly/xyz trong email ngân hàng:',
                    options: [
                        { id: 'a', text: 'An toàn vì từ ngân hàng', isCorrect: false },
                        { id: 'b', text: 'Đáng ngờ - Ngân hàng dùng link đầy đủ', isCorrect: true },
                    ],
                    explanation: 'Tổ chức chính thống thường dùng link đầy đủ, không rút gọn.',
                },
                {
                    id: 'q4',
                    question: 'Pop-up "Máy tính bị virus! Gọi 1900xxxx ngay":',
                    options: [
                        { id: 'a', text: 'Gọi ngay để được hỗ trợ', isCorrect: false },
                        { id: 'b', text: 'Đóng ngay - Đây là scam support', isCorrect: true },
                    ],
                    explanation: 'Tech support scam phổ biến. Windows không hiện số điện thoại.',
                },
                {
                    id: 'q5',
                    question: 'QR code dán đè lên QR chính thức tại quán cafe:',
                    options: [
                        { id: 'a', text: 'Quét bình thường', isCorrect: false },
                        { id: 'b', text: 'Báo nhân viên, có thể bị dán đè', isCorrect: true },
                    ],
                    explanation: 'QR code giả có thể dẫn đến trang lừa đảo.',
                },
            ],
        },
    },
];
