$ErrorActionPreference = "Continue"

function Create-Page($path, $title, $desc) {
    $dir = Split-Path $path -Parent
    if (!(Test-Path $dir)) { New-Item -ItemType Directory -Path $dir -Force | Out-Null }
    $content = @"
'use client'
import { useState } from 'react'

export default function ${title}Page() {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900'>
      <div className='max-w-6xl mx-auto px-4 py-16'>
        <h1 className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600'>
          $title
        </h1>
        <p className='mt-4 text-lg text-gray-600 dark:text-gray-400'>$desc</p>
        <div className='mt-12 grid gap-8'>
          <div className='p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700'>
            <p className='text-gray-500'>Content coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  )
}
"@
    $content | Out-File -FilePath $path -Encoding utf8
}

# Phase 5: New Pages
Create-Page "app/pricing/page.tsx" "Pricing" "Chon goi phu hop voi nhu cau cua ban"
git add app/pricing/page.tsx; git commit -m "feat: add pricing page with plan comparison"

Create-Page "app/faq/page.tsx" "FAQ" "Cau hoi thuong gap"
git add app/faq/page.tsx; git commit -m "feat: add FAQ page with accordion"

Create-Page "app/contact/page.tsx" "Contact" "Lien he voi chung toi"
git add app/contact/page.tsx; git commit -m "feat: add contact page with form"

Create-Page "app/blog/page.tsx" "Blog" "Tin tuc va bai viet ve an toan mang"
git add app/blog/page.tsx; git commit -m "feat: add blog listing page"

New-Item -ItemType Directory -Path "app/blog/[slug]" -Force | Out-Null
Create-Page "app/blog/[slug]/page.tsx" "BlogPost" "Chi tiet bai viet"
git add "app/blog/[slug]/page.tsx"; git commit -m "feat: add blog post detail page"

Create-Page "app/knowledge-base/page.tsx" "KnowledgeBase" "Co so kien thuc ve lua dao"
git add app/knowledge-base/page.tsx; git commit -m "feat: add knowledge base index page"

New-Item -ItemType Directory -Path "app/knowledge-base/[slug]" -Force | Out-Null
Create-Page "app/knowledge-base/[slug]/page.tsx" "KBArticle" "Chi tiet bai viet kien thuc"
git add "app/knowledge-base/[slug]/page.tsx"; git commit -m "feat: add knowledge base article page"

Create-Page "app/settings/page.tsx" "Settings" "Quan ly tai khoan cua ban"
git add app/settings/page.tsx; git commit -m "feat: add user settings page"

New-Item -ItemType Directory -Path "app/settings/profile" -Force | Out-Null
Create-Page "app/settings/profile/page.tsx" "Profile" "Cap nhat thong tin ca nhan"
git add "app/settings/profile/page.tsx"; git commit -m "feat: add profile settings page"

New-Item -ItemType Directory -Path "app/settings/notifications" -Force | Out-Null
Create-Page "app/settings/notifications/page.tsx" "Notifications" "Cai dat thong bao"
git add "app/settings/notifications/page.tsx"; git commit -m "feat: add notification preferences page"

New-Item -ItemType Directory -Path "app/settings/security" -Force | Out-Null
Create-Page "app/settings/security/page.tsx" "Security" "Bao mat tai khoan"
git add "app/settings/security/page.tsx"; git commit -m "feat: add security settings page"

Create-Page "app/changelog/page.tsx" "Changelog" "Lich su cap nhat"
git add app/changelog/page.tsx; git commit -m "feat: add changelog page"

Create-Page "app/status/page.tsx" "Status" "Trang thai he thong"
git add app/status/page.tsx; git commit -m "feat: add system status page"

Create-Page "app/leaderboard/page.tsx" "Leaderboard" "Bang xep hang cong dong"
git add app/leaderboard/page.tsx; git commit -m "feat: add community leaderboard page"

Create-Page "app/resources/page.tsx" "Resources" "Tai nguyen chong lua dao"
git add app/resources/page.tsx; git commit -m "feat: add downloadable resources page"

Create-Page "app/campaigns/page.tsx" "Campaigns" "Chien dich nang cao nhan thuc"
git add app/campaigns/page.tsx; git commit -m "feat: add public campaigns page"

New-Item -ItemType Directory -Path "app/campaigns/[slug]" -Force | Out-Null
Create-Page "app/campaigns/[slug]/page.tsx" "CampaignDetail" "Chi tiet chien dich"
git add "app/campaigns/[slug]/page.tsx"; git commit -m "feat: add campaign detail page"

New-Item -ItemType Directory -Path "app/tools/phone-checker" -Force | Out-Null
Create-Page "app/tools/phone-checker/page.tsx" "PhoneChecker" "Kiem tra so dien thoai lua dao"
git add "app/tools/phone-checker/page.tsx"; git commit -m "feat: add phone checker tool page"

New-Item -ItemType Directory -Path "app/tools/ip-lookup" -Force | Out-Null
Create-Page "app/tools/ip-lookup/page.tsx" "IPLookup" "Tra cuu dia chi IP"
git add "app/tools/ip-lookup/page.tsx"; git commit -m "feat: add IP lookup tool page"

New-Item -ItemType Directory -Path "app/tools/whois" -Force | Out-Null
Create-Page "app/tools/whois/page.tsx" "WHOIS" "Tra cuu thong tin ten mien"
git add "app/tools/whois/page.tsx"; git commit -m "feat: add WHOIS lookup tool page"

New-Item -ItemType Directory -Path "app/dashboard/settings" -Force | Out-Null
Create-Page "app/dashboard/settings/page.tsx" "DashboardSettings" "Cai dat dashboard"
git add "app/dashboard/settings/page.tsx"; git commit -m "feat: add dashboard settings page"

New-Item -ItemType Directory -Path "app/dashboard/notifications" -Force | Out-Null
Create-Page "app/dashboard/notifications/page.tsx" "DashboardNotifications" "Thong bao"
git add "app/dashboard/notifications/page.tsx"; git commit -m "feat: add dashboard notifications page"

Create-Page "app/accessibility/page.tsx" "Accessibility" "Cam ket ve tiep can"
git add app/accessibility/page.tsx; git commit -m "feat: add accessibility statement page"

Create-Page "app/security/page.tsx" "SecurityPolicy" "Chinh sach bao mat"
git add app/security/page.tsx; git commit -m "feat: add security policy page"

# Error page
@"
'use client'
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='text-center p-8'>
        <div className='text-6xl mb-4'>⚠️</div>
        <h2 className='text-2xl font-bold text-red-500'>Something went wrong!</h2>
        <p className='text-gray-500 mt-2'>{error.message}</p>
        <button onClick={reset} className='mt-6 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600'>
          Try Again
        </button>
      </div>
    </div>
  )
}
"@ | Out-File -FilePath "app/error.tsx" -Encoding utf8
git add app/error.tsx; git commit -m "feat: add global error boundary page"

Write-Host "Phase 5 done! 25 pages created."
