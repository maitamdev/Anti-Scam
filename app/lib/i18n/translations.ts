export const translations = {
  vi: {
    // Common
    common: {
      home: 'Trang chủ',
      scan: 'Quét URL',
      check: 'Kiểm tra',
      alerts: 'Cảnh báo',
      guide: 'Hướng dẫn',
      quiz: 'Trắc nghiệm',
      report: 'Báo cáo',
      about: 'Giới thiệu',
      login: 'Đăng nhập',
      register: 'Đăng ký',
      logout: 'Đăng xuất',
      dashboard: 'Bảng điều khiển',
      loading: 'Đang tải...',
      error: 'Lỗi',
      success: 'Thành công',
      cancel: 'Hủy',
      confirm: 'Xác nhận',
      save: 'Lưu',
      delete: 'Xóa',
      edit: 'Sửa',
      search: 'Tìm kiếm',
      filter: 'Lọc',
      all: 'Tất cả',
      back: 'Quay lại',
      next: 'Tiếp theo',
      previous: 'Trước đó',
      submit: 'Gửi',
      close: 'Đóng',
    },

    // Header
    header: {
      tagline: 'Bảo vệ bạn khỏi lừa đảo trực tuyến',
      scanUrl: 'Quét URL',
      checkInfo: 'Kiểm tra thông tin',
      scamAlerts: 'Cảnh báo lừa đảo',
      safetyGuide: 'Hướng dẫn an toàn',
      testKnowledge: 'Kiểm tra kiến thức',
    },

    // Home page
    home: {
      title: 'Phát hiện Lừa đảo',
      subtitle: 'bằng AI',
      description: 'Bảo vệ bạn và gia đình khỏi các chiêu trò lừa đảo trực tuyến với công nghệ AI tiên tiến',
      scanNow: 'Quét ngay',
      learnMore: 'Tìm hiểu thêm',
      features: {
        aiPowered: 'AI Phân tích',
        aiDesc: 'Sử dụng trí tuệ nhân tạo để phát hiện website lừa đảo',
        realtime: 'Thời gian thực',
        realtimeDesc: 'Kiểm tra và cảnh báo ngay lập tức',
        database: 'Cơ sở dữ liệu',
        databaseDesc: 'Hàng nghìn website lừa đảo đã được ghi nhận',
        community: 'Cộng đồng',
        communityDesc: 'Báo cáo và chia sẻ thông tin lừa đảo',
      },
      stats: {
        scanned: 'URL đã quét',
        blocked: 'Lừa đảo phát hiện',
        users: 'Người dùng',
        reports: 'Báo cáo',
      },
    },

    // Scan page
    scan: {
      title: 'Quét Website',
      subtitle: 'Kiểm tra độ an toàn của bất kỳ URL nào',
      placeholder: 'Nhập URL cần kiểm tra (vd: https://example.com)',
      scanning: 'Đang phân tích...',
      scanButton: 'Quét ngay',
      result: {
        safe: 'An toàn',
        suspicious: 'Đáng ngờ',
        dangerous: 'Nguy hiểm',
        unknown: 'Chưa xác định',
        score: 'Điểm rủi ro',
        confidence: 'Độ tin cậy AI',
        category: 'Phân loại',
        details: 'Chi tiết phân tích',
        securityCheck: 'Kiểm tra bảo mật',
        ssl: 'Chứng chỉ SSL',
        privacyPolicy: 'Chính sách bảo mật',
        contactInfo: 'Thông tin liên hệ',
        socialLinks: 'Liên kết MXH',
        loginForm: 'Form đăng nhập',
        paymentForm: 'Form thanh toán',
        riskFactors: 'Yếu tố rủi ro phát hiện',
        trustFactors: 'Yếu tố tin cậy',
        websiteTitle: 'Tiêu đề website',
        technologies: 'Công nghệ phát hiện',
        externalSources: 'Nguồn kiểm tra bên ngoài',
      },
      aiAnalysis: {
        title: 'Chi tiết phân tích AI',
        websiteType: 'Loại website',
        function: 'Chức năng',
        domainAnalysis: 'Phân tích domain',
        security: 'Bảo mật',
        conclusion: 'Kết luận',
        otherInfo: 'Thông tin khác',
      },
      virusTotal: {
        title: 'VirusTotal Security Scan',
        engines: 'engines',
        malicious: 'Độc hại',
        suspicious: 'Đáng ngờ',
        harmless: 'An toàn',
        undetected: 'Chưa xác định',
        noThreat: 'Không phát hiện mối đe dọa từ',
        threatDetected: 'antivirus phát hiện mối đe dọa!',
        suspiciousDetected: 'antivirus đánh dấu đáng ngờ',
      },
    },

    // Check page
    check: {
      title: 'Kiểm tra thông tin',
      subtitle: 'Xác minh số điện thoại, email, tài khoản ngân hàng',
      phone: {
        title: 'Số điện thoại',
        placeholder: 'Nhập số điện thoại',
        check: 'Kiểm tra',
      },
      email: {
        title: 'Email',
        placeholder: 'Nhập địa chỉ email',
        check: 'Kiểm tra',
      },
      bankAccount: {
        title: 'Tài khoản ngân hàng',
        placeholder: 'Nhập số tài khoản',
        bank: 'Chọn ngân hàng',
        check: 'Kiểm tra',
      },
    },

    // Alerts page
    alerts: {
      title: 'Cảnh báo',
      subtitle: 'Lừa đảo',
      description: 'Thông tin mới nhất về các chiêu trò lừa đảo đang hoành hành tại Việt Nam',
      updating: 'Cập nhật liên tục',
      stats: {
        alerts: 'Cảnh báo',
        critical: 'Nghiêm trọng',
        reports: 'Báo cáo',
        views: 'Lượt xem',
      },
      filters: {
        searchPlaceholder: 'Tìm kiếm cảnh báo...',
        allTypes: 'Tất cả loại',
        allLevels: 'Tất cả mức độ',
      },
      categories: {
        PHISHING: 'Giả mạo',
        INVESTMENT: 'Đầu tư',
        ROMANCE: 'Tình cảm',
        JOB: 'Việc làm',
        PRIZE: 'Trúng thưởng',
        IMPERSONATION: 'Mạo danh',
        CRYPTO: 'Tiền ảo',
        OTHER: 'Khác',
      },
      severity: {
        CRITICAL: 'Nghiêm trọng',
        HIGH: 'Cao',
        MEDIUM: 'Trung bình',
        LOW: 'Thấp',
      },
      noAlerts: 'Chưa có cảnh báo nào',
      systemUpdating: 'Hệ thống đang cập nhật thông tin mới nhất',
      reportCta: {
        title: 'Bạn phát hiện chiêu trò lừa đảo mới?',
        subtitle: 'Hãy báo cáo để giúp cộng đồng cảnh giác',
        button: 'Báo cáo ngay',
      },
      trustedSources: 'Nguồn thông tin uy tín từ cơ quan chức năng',
      backToHome: 'Quay lại trang chủ',
      trustedNews: 'Tin tức từ nguồn uy tín',
      verified: 'Xác thực',
      communityAlerts: 'Cảnh báo từ cộng đồng',
    },

    // Tips
    tips: {
      tip: 'Mẹo',
      items: [
        {
          title: 'Kiểm tra URL cẩn thận',
          content: 'Website giả thường có URL tương tự nhưng khác một chút: vietcombank-vn.com thay vì vietcombank.com.vn'
        },
        {
          title: 'Ngân hàng không bao giờ hỏi OTP',
          content: 'Không có ngân hàng hay tổ chức nào gọi điện/nhắn tin yêu cầu bạn cung cấp mã OTP.'
        },
        {
          title: '"Banking lỗi" = Lừa đảo',
          content: 'Nếu ai đó nhờ chuyển tiền với lý do "app banking đang lỗi", hãy gọi điện xác nhận trực tiếp.'
        },
        {
          title: 'Trúng thưởng bất ngờ = Lừa đảo',
          content: 'Bạn không thể trúng thưởng từ chương trình bạn chưa từng tham gia.'
        },
        {
          title: 'Việc nhẹ lương cao = Lừa đảo',
          content: 'Không có công việc nào trả 500k-2tr/ngày mà chỉ cần điện thoại và không cần kinh nghiệm.'
        },
        {
          title: 'Không nộp tiền để nhận việc',
          content: 'Công việc hợp pháp không bao giờ yêu cầu bạn đặt cọc hay nạp tiền trước.'
        },
        {
          title: 'Xác minh qua video call',
          content: 'Nếu người quen nhờ chuyển tiền, hãy yêu cầu video call để xác nhận danh tính.'
        },
        {
          title: 'Liên hệ hotline chính thức',
          content: 'Khi nghi ngờ, gọi hotline chính thức của ngân hàng (tra trên website, không dùng số trong tin nhắn).'
        },
      ],
    },

    // Footer
    footer: {
      description: 'Bảo vệ người dùng Việt Nam khỏi các chiêu trò lừa đảo trực tuyến',
      features: 'Tính năng',
      resources: 'Tài nguyên',
      legal: 'Pháp lý',
      privacy: 'Chính sách bảo mật',
      terms: 'Điều khoản sử dụng',
      contact: 'Liên hệ',
      copyright: 'Bản quyền',
    },

    // Check page
    checkPage: {
      title: 'Kiểm tra',
      titleHighlight: 'Lừa đảo',
      subtitle: 'Tra cứu số tài khoản, email, số điện thoại trong cơ sở dữ liệu lừa đảo',
      freeCheck: 'Kiểm tra miễn phí',
      tabs: {
        account: 'Tài khoản',
        email: 'Email',
        phone: 'Điện thoại',
      },
      bankLabel: 'Ngân hàng (tùy chọn)',
      selectBank: 'Chọn ngân hàng...',
      accountNumber: 'Số tài khoản',
      emailAddress: 'Địa chỉ email',
      phoneNumber: 'Số điện thoại',
      placeholder: {
        bank: 'Nhập số tài khoản ngân hàng...',
        email: 'Nhập địa chỉ email...',
        phone: 'Nhập số điện thoại...',
      },
      checking: 'Đang kiểm tra...',
      checkNow: 'Kiểm tra ngay',
      enterInfo: 'Vui lòng nhập thông tin cần kiểm tra',
      connectionError: 'Không thể kết nối đến server',
      result: {
        reportCount: 'Số lần bị báo cáo',
        bank: 'Ngân hàng',
        owner: 'Chủ tài khoản',
        totalLoss: 'Tổng thiệt hại',
        carrier: 'Nhà mạng',
        category: 'Loại',
        description: 'Mô tả',
        verified: 'Đã được xác minh bởi hệ thống',
      },
      tips: {
        account: {
          title: 'Kiểm tra tài khoản',
          desc: 'Tra cứu số tài khoản ngân hàng trước khi chuyển tiền cho người lạ',
        },
        email: {
          title: 'Kiểm tra email',
          desc: 'Xác minh email có phải từ nguồn đáng tin cậy hay là lừa đảo',
        },
        phone: {
          title: 'Kiểm tra số điện thoại',
          desc: 'Tra cứu số điện thoại lạ gọi đến hoặc nhắn tin yêu cầu chuyển tiền',
        },
      },
      warning: {
        title: 'Lưu ý quan trọng',
        content: 'Kết quả kiểm tra chỉ mang tính tham khảo dựa trên dữ liệu báo cáo từ cộng đồng. Việc không tìm thấy trong danh sách không đảm bảo 100% an toàn. Hãy luôn cẩn thận và xác minh kỹ trước khi giao dịch.',
      },
    },

    // Quiz page
    quiz: {
      title: 'Quiz Nhận Biết Lừa Đảo',
      subtitle: '5000+ câu hỏi đa dạng giúp bạn nhận biết các chiêu trò lừa đảo online',
      backToHome: 'Quay lại trang chủ',
      modes: {
        quick: { title: 'Chơi Nhanh', desc: '10 câu ngẫu nhiên' },
        challenge: { title: 'Thử Thách', desc: '20 câu, giới hạn thời gian' },
        practice: { title: 'Luyện Tập', desc: 'Chọn chủ đề' },
        custom: { title: 'Tùy Chỉnh', desc: 'Thiết lập theo ý muốn' },
      },
      customize: 'Tùy chỉnh',
      questionCount: 'Số câu hỏi',
      difficulty: 'Độ khó',
      category: 'Chủ đề',
      timeLimit: 'Giới hạn thời gian',
      difficulties: {
        mixed: 'Trộn lẫn',
        easy: 'Dễ',
        medium: 'Trung bình',
        hard: 'Khó',
      },
      allCategories: 'Tất cả chủ đề',
      noTimeLimit: 'Không giới hạn',
      secondsPerQuestion: 'giây/câu',
      questions: 'câu',
      startGame: 'Bắt Đầu Chơi',
      question: 'Câu',
      score: 'Điểm',
      confirm: 'Xác nhận',
      nextQuestion: 'Câu tiếp theo',
      viewResult: 'Xem kết quả',
      explanation: 'Giải thích',
      result: {
        excellent: 'Xuất sắc!',
        good: 'Khá tốt!',
        needImprove: 'Cần cải thiện!',
        excellentDesc: 'Bạn có kiến thức tốt về nhận biết lừa đảo!',
        goodDesc: 'Bạn đã nắm được cơ bản, hãy tiếp tục học hỏi!',
        needImproveDesc: 'Hãy đọc thêm hướng dẫn để bảo vệ bản thân tốt hơn!',
        scoreLabel: 'Điểm số',
        correct: 'Đúng',
        time: 'Thời gian',
        playAgain: 'Chơi lại',
        learnMore: 'Học thêm',
      },
    },

    // Guide page
    guidePage: {
      title: 'Tài nguyên & Hướng dẫn',
      subtitle: 'Khám phá các bài viết, mẹo và hướng dẫn để bảo vệ bản thân trên không gian mạng.',
      backToHome: 'Quay lại trang chủ',
      categories: 'Danh mục',
      all: 'Tất cả',
      searchPlaceholder: 'Tìm kiếm bài viết, hướng dẫn...',
      assessmentCta: {
        title: 'Đánh giá mức độ an toàn',
        desc: 'Tìm hiểu xem bạn có đang an toàn trên không gian mạng hay không.',
        button: 'Bắt đầu ngay',
      },
      levels: {
        advanced: 'Nâng cao',
        basic: 'Cơ bản',
      },
      noArticles: 'Chưa có bài viết',
      noArticlesSearch: 'Không tìm thấy bài viết phù hợp với từ khóa của bạn.',
      noArticlesDefault: 'Các bài viết hướng dẫn sẽ sớm được cập nhật.',
    },

    // Report page
    reportPage: {
      title: 'Báo cáo Website Lừa đảo',
      subtitle: 'Giúp cộng đồng bằng cách báo cáo các website đáng ngờ',
      backToHome: 'Quay lại trang chủ',
      protectCommunity: {
        title: 'Bảo vệ cộng đồng',
        desc: 'Mỗi báo cáo của bạn giúp AI học hỏi và bảo vệ hàng nghìn người khác',
      },
      quickVerify: {
        title: 'Xác minh nhanh chóng',
        desc: 'Đội ngũ admin sẽ xác minh báo cáo trong vòng 24 giờ',
      },
    },

    // About page
    aboutPage: {
      title: 'Về',
      subtitle: 'Công cụ miễn phí giúp người dùng Việt Nam kiểm tra và nhận biết các website, tin nhắn lừa đảo trước khi trở thành nạn nhân.',
      backToHome: 'Quay lại trang chủ',
      mission: {
        badge: 'Sứ mệnh',
        title: 'Giảm thiểu thiệt hại do lừa đảo online',
        desc1: 'Mỗi năm, hàng nghìn người Việt Nam mất tiền vì các chiêu trò lừa đảo online: giả mạo ngân hàng, nhờ chuyển tiền, trúng thưởng giả, tuyển dụng lừa đảo...',
        desc2: 'ANTI-SCAM ra đời với mục tiêu cung cấp công cụ đơn giản, miễn phí để mọi người có thể kiểm tra nhanh các link và tin nhắn đáng ngờ trước khi click.',
      },
      stats: {
        scamTypes: 'Loại lừa đảo được nhận diện',
        quizQuestions: 'Câu hỏi quiz',
        free: 'Miễn phí',
      },
      features: {
        title: 'Tính năng chính',
        subtitle: 'Những công cụ giúp bạn an toàn hơn trên mạng',
        urlCheck: {
          title: 'Kiểm tra URL',
          desc: 'Phân tích website để phát hiện dấu hiệu phishing, giả mạo ngân hàng, TMĐT.',
        },
        aiImage: {
          title: 'AI Phân tích Hình ảnh',
          desc: 'Upload ảnh tin nhắn Zalo, SMS, email để AI nhận diện chiêu trò lừa đảo.',
        },
        quiz: {
          title: 'Quiz Trắc nghiệm',
          desc: '5000+ câu hỏi giúp nâng cao nhận thức về các hình thức lừa đảo.',
        },
        free: {
          title: 'Miễn phí 100%',
          desc: 'Không giới hạn sử dụng, không cần đăng ký, không quảng cáo.',
        },
      },
      disclaimer: {
        title: '⚠️ Lưu ý quan trọng',
        items: [
          'Kết quả kiểm tra chỉ mang tính chất tham khảo, không đảm bảo 100% chính xác.',
          'Công cụ không thay thế cho việc cảnh giác cá nhân khi sử dụng internet.',
          'Luôn xác minh trực tiếp với ngân hàng/tổ chức qua hotline chính thức nếu nghi ngờ.',
          'Không bao giờ cung cấp OTP, mật khẩu cho bất kỳ ai qua điện thoại/tin nhắn.',
        ],
      },
      cta: {
        title: 'Bắt đầu kiểm tra ngay',
        subtitle: 'Dán link hoặc upload ảnh tin nhắn đáng ngờ để kiểm tra miễn phí.',
        scanButton: 'Kiểm tra URL/Ảnh',
        quizButton: 'Làm Quiz',
      },
    },
  },

  en: {
    // Common
    common: {
      home: 'Home',
      scan: 'Scan URL',
      check: 'Check',
      alerts: 'Alerts',
      guide: 'Guide',
      quiz: 'Quiz',
      report: 'Report',
      about: 'About',
      login: 'Login',
      register: 'Register',
      logout: 'Logout',
      dashboard: 'Dashboard',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      cancel: 'Cancel',
      confirm: 'Confirm',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      search: 'Search',
      filter: 'Filter',
      all: 'All',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      close: 'Close',
    },

    // Header
    header: {
      tagline: 'Protecting you from online scams',
      scanUrl: 'Scan URL',
      checkInfo: 'Check Information',
      scamAlerts: 'Scam Alerts',
      safetyGuide: 'Safety Guide',
      testKnowledge: 'Test Knowledge',
    },

    // Home page
    home: {
      title: 'Detect Scams',
      subtitle: 'with AI',
      description: 'Protect yourself and your family from online scams with advanced AI technology',
      scanNow: 'Scan Now',
      learnMore: 'Learn More',
      features: {
        aiPowered: 'AI Powered',
        aiDesc: 'Using artificial intelligence to detect scam websites',
        realtime: 'Real-time',
        realtimeDesc: 'Instant checking and alerts',
        database: 'Database',
        databaseDesc: 'Thousands of scam websites recorded',
        community: 'Community',
        communityDesc: 'Report and share scam information',
      },
      stats: {
        scanned: 'URLs Scanned',
        blocked: 'Scams Detected',
        users: 'Users',
        reports: 'Reports',
      },
    },

    // Scan page
    scan: {
      title: 'Scan Website',
      subtitle: 'Check the safety of any URL',
      placeholder: 'Enter URL to check (e.g., https://example.com)',
      scanning: 'Analyzing...',
      scanButton: 'Scan Now',
      result: {
        safe: 'Safe',
        suspicious: 'Suspicious',
        dangerous: 'Dangerous',
        unknown: 'Unknown',
        score: 'Risk Score',
        confidence: 'AI Confidence',
        category: 'Category',
        details: 'Analysis Details',
        securityCheck: 'Security Check',
        ssl: 'SSL Certificate',
        privacyPolicy: 'Privacy Policy',
        contactInfo: 'Contact Info',
        socialLinks: 'Social Links',
        loginForm: 'Login Form',
        paymentForm: 'Payment Form',
        riskFactors: 'Risk Factors Detected',
        trustFactors: 'Trust Factors',
        websiteTitle: 'Website Title',
        technologies: 'Technologies Detected',
        externalSources: 'External Sources',
      },
      aiAnalysis: {
        title: 'AI Analysis Details',
        websiteType: 'Website Type',
        function: 'Function',
        domainAnalysis: 'Domain Analysis',
        security: 'Security',
        conclusion: 'Conclusion',
        otherInfo: 'Other Information',
      },
      virusTotal: {
        title: 'VirusTotal Security Scan',
        engines: 'engines',
        malicious: 'Malicious',
        suspicious: 'Suspicious',
        harmless: 'Harmless',
        undetected: 'Undetected',
        noThreat: 'No threats detected from',
        threatDetected: 'antivirus detected threats!',
        suspiciousDetected: 'antivirus flagged as suspicious',
      },
    },

    // Check page
    check: {
      title: 'Check Information',
      subtitle: 'Verify phone numbers, emails, bank accounts',
      phone: {
        title: 'Phone Number',
        placeholder: 'Enter phone number',
        check: 'Check',
      },
      email: {
        title: 'Email',
        placeholder: 'Enter email address',
        check: 'Check',
      },
      bankAccount: {
        title: 'Bank Account',
        placeholder: 'Enter account number',
        bank: 'Select bank',
        check: 'Check',
      },
    },

    // Alerts page
    alerts: {
      title: 'Scam',
      subtitle: 'Alerts',
      description: 'Latest information about scams currently happening',
      updating: 'Continuously updating',
      stats: {
        alerts: 'Alerts',
        critical: 'Critical',
        reports: 'Reports',
        views: 'Views',
      },
      filters: {
        searchPlaceholder: 'Search alerts...',
        allTypes: 'All types',
        allLevels: 'All levels',
      },
      categories: {
        PHISHING: 'Phishing',
        INVESTMENT: 'Investment',
        ROMANCE: 'Romance',
        JOB: 'Job',
        PRIZE: 'Prize',
        IMPERSONATION: 'Impersonation',
        CRYPTO: 'Crypto',
        OTHER: 'Other',
      },
      severity: {
        CRITICAL: 'Critical',
        HIGH: 'High',
        MEDIUM: 'Medium',
        LOW: 'Low',
      },
      noAlerts: 'No alerts yet',
      systemUpdating: 'System is updating with latest information',
      reportCta: {
        title: 'Discovered a new scam?',
        subtitle: 'Report it to help the community stay alert',
        button: 'Report Now',
      },
      trustedSources: 'Trusted information sources from authorities',
      backToHome: 'Back to Home',
      trustedNews: 'News from trusted sources',
      verified: 'Verified',
      communityAlerts: 'Community Alerts',
    },

    // Tips
    tips: {
      tip: 'Tip',
      items: [
        {
          title: 'Check URLs carefully',
          content: 'Fake websites often have similar but slightly different URLs: bank-secure.com instead of bank.com'
        },
        {
          title: 'Banks never ask for OTP',
          content: 'No bank or organization will call/text asking you to provide OTP codes.'
        },
        {
          title: '"Banking error" = Scam',
          content: 'If someone asks to transfer money because "banking app is down", call to verify directly.'
        },
        {
          title: 'Unexpected prize = Scam',
          content: 'You cannot win a prize from a program you never participated in.'
        },
        {
          title: 'Easy job, high pay = Scam',
          content: 'No job pays $100-500/day requiring only a phone and no experience.'
        },
        {
          title: 'Never pay to get a job',
          content: 'Legitimate jobs never require you to deposit or pay money upfront.'
        },
        {
          title: 'Verify via video call',
          content: 'If an acquaintance asks for money transfer, request a video call to verify identity.'
        },
        {
          title: 'Contact official hotline',
          content: 'When in doubt, call the official bank hotline (look up on website, not from messages).'
        },
      ],
    },

    // Footer
    footer: {
      description: 'Protecting users from online scams',
      features: 'Features',
      resources: 'Resources',
      legal: 'Legal',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      contact: 'Contact',
      copyright: 'Copyright',
    },

    // Check page
    checkPage: {
      title: 'Check',
      titleHighlight: 'Scam',
      subtitle: 'Look up bank accounts, emails, phone numbers in scam database',
      freeCheck: 'Free check',
      tabs: {
        account: 'Account',
        email: 'Email',
        phone: 'Phone',
      },
      bankLabel: 'Bank (optional)',
      selectBank: 'Select bank...',
      accountNumber: 'Account number',
      emailAddress: 'Email address',
      phoneNumber: 'Phone number',
      placeholder: {
        bank: 'Enter bank account number...',
        email: 'Enter email address...',
        phone: 'Enter phone number...',
      },
      checking: 'Checking...',
      checkNow: 'Check now',
      enterInfo: 'Please enter information to check',
      connectionError: 'Cannot connect to server',
      result: {
        reportCount: 'Report count',
        bank: 'Bank',
        owner: 'Account owner',
        totalLoss: 'Total loss',
        carrier: 'Carrier',
        category: 'Category',
        description: 'Description',
        verified: 'Verified by system',
      },
      tips: {
        account: {
          title: 'Check account',
          desc: 'Look up bank account before transferring money to strangers',
        },
        email: {
          title: 'Check email',
          desc: 'Verify if email is from trusted source or scam',
        },
        phone: {
          title: 'Check phone number',
          desc: 'Look up unknown phone numbers calling or texting for money',
        },
      },
      warning: {
        title: 'Important notice',
        content: 'Check results are for reference only based on community reports. Not finding in the list does not guarantee 100% safety. Always be careful and verify before transactions.',
      },
    },

    // Quiz page
    quiz: {
      title: 'Scam Recognition Quiz',
      subtitle: '5000+ diverse questions to help you recognize online scam tricks',
      backToHome: 'Back to home',
      modes: {
        quick: { title: 'Quick Play', desc: '10 random questions' },
        challenge: { title: 'Challenge', desc: '20 questions, time limit' },
        practice: { title: 'Practice', desc: 'Choose topic' },
        custom: { title: 'Custom', desc: 'Set up as you like' },
      },
      customize: 'Customize',
      questionCount: 'Question count',
      difficulty: 'Difficulty',
      category: 'Category',
      timeLimit: 'Time limit',
      difficulties: {
        mixed: 'Mixed',
        easy: 'Easy',
        medium: 'Medium',
        hard: 'Hard',
      },
      allCategories: 'All categories',
      noTimeLimit: 'No limit',
      secondsPerQuestion: 'sec/question',
      questions: 'questions',
      startGame: 'Start Game',
      question: 'Question',
      score: 'Score',
      confirm: 'Confirm',
      nextQuestion: 'Next question',
      viewResult: 'View result',
      explanation: 'Explanation',
      result: {
        excellent: 'Excellent!',
        good: 'Good job!',
        needImprove: 'Need improvement!',
        excellentDesc: 'You have good knowledge about scam recognition!',
        goodDesc: 'You got the basics, keep learning!',
        needImproveDesc: 'Read more guides to better protect yourself!',
        scoreLabel: 'Score',
        correct: 'Correct',
        time: 'Time',
        playAgain: 'Play again',
        learnMore: 'Learn more',
      },
    },

    // Guide page
    guidePage: {
      title: 'Resources & Guides',
      subtitle: 'Explore articles, tips and guides to protect yourself online.',
      backToHome: 'Back to home',
      categories: 'Categories',
      all: 'All',
      searchPlaceholder: 'Search articles, guides...',
      assessmentCta: {
        title: 'Safety assessment',
        desc: 'Find out if you are safe online.',
        button: 'Start now',
      },
      levels: {
        advanced: 'Advanced',
        basic: 'Basic',
      },
      noArticles: 'No articles yet',
      noArticlesSearch: 'No articles found matching your keywords.',
      noArticlesDefault: 'Guide articles will be updated soon.',
    },

    // Report page
    reportPage: {
      title: 'Report Scam Website',
      subtitle: 'Help the community by reporting suspicious websites',
      backToHome: 'Back to home',
      protectCommunity: {
        title: 'Protect community',
        desc: 'Each report helps AI learn and protect thousands of others',
      },
      quickVerify: {
        title: 'Quick verification',
        desc: 'Admin team will verify reports within 24 hours',
      },
    },

    // About page
    aboutPage: {
      title: 'About',
      subtitle: 'Free tool helping Vietnamese users check and recognize scam websites and messages before becoming victims.',
      backToHome: 'Back to home',
      mission: {
        badge: 'Mission',
        title: 'Reduce damage from online scams',
        desc1: 'Every year, thousands of Vietnamese lose money to online scams: fake banks, money transfer requests, fake prizes, job scams...',
        desc2: 'ANTI-SCAM was created to provide simple, free tools for everyone to quickly check suspicious links and messages before clicking.',
      },
      stats: {
        scamTypes: 'Scam types detected',
        quizQuestions: 'Quiz questions',
        free: 'Free',
      },
      features: {
        title: 'Main features',
        subtitle: 'Tools to help you stay safe online',
        urlCheck: {
          title: 'URL Check',
          desc: 'Analyze websites to detect phishing, fake banks, e-commerce.',
        },
        aiImage: {
          title: 'AI Image Analysis',
          desc: 'Upload Zalo, SMS, email screenshots for AI to detect scam tricks.',
        },
        quiz: {
          title: 'Quiz',
          desc: '5000+ questions to raise awareness about scam types.',
        },
        free: {
          title: '100% Free',
          desc: 'Unlimited use, no registration, no ads.',
        },
      },
      disclaimer: {
        title: '⚠️ Important notice',
        items: [
          'Check results are for reference only, not 100% accurate.',
          'Tool does not replace personal vigilance when using internet.',
          'Always verify directly with bank/organization via official hotline if suspicious.',
          'Never provide OTP, password to anyone via phone/message.',
        ],
      },
      cta: {
        title: 'Start checking now',
        subtitle: 'Paste link or upload suspicious message screenshot to check for free.',
        scanButton: 'Check URL/Image',
        quizButton: 'Take Quiz',
      },
    },
  },
}

export type Language = 'vi' | 'en'
export type TranslationKeys = typeof translations.vi
