-- ============================================
-- SUPABASE SQL COMMANDS - Chạy trong SQL Editor
-- ============================================
-- Vào: Supabase Dashboard → SQL Editor → New Query
-- Copy và chạy từng phần dưới đây

-- ============================================
-- BƯỚC 1: Enable Extensions (Nếu chưa có)
-- ============================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";


-- ============================================
-- BƯỚC 2: KHÔNG CẦN TẠO TABLES THỦ CÔNG
-- ============================================
-- Prisma sẽ tự tạo tất cả tables khi bạn chạy:
-- npx prisma db push


-- ============================================
-- BƯỚC 3: (OPTIONAL) Tạo Admin User đầu tiên
-- ============================================
-- Chạy SAU KHI đã push schema với Prisma

-- Tạo password hash (thay 'YourPassword123' bằng password bạn muốn)
-- Hoặc generate hash tại: https://bcrypt-generator.com (cost: 12)

INSERT INTO "User" (
  id,
  email,
  name,
  password,
  role,
  tier,
  status,
  "emailVerified",
  "createdAt",
  "updatedAt"
) VALUES (
  gen_random_uuid(),
  'admin@antiscam.vn',
  'Admin',
  -- Password hash của 'admin123' (THAY ĐỔI NÀY TRONG PRODUCTION!)
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIwNoRKWMK',
  'ADMIN',
  'ENTERPRISE',
  'ACTIVE',
  NOW(),
  NOW(),
  NOW()
);

-- Verify admin user đã tạo
SELECT id, email, name, role, tier FROM "User" WHERE role = 'ADMIN';


-- ============================================
-- BƯỚC 4: (OPTIONAL) Create Indexes cho Performance
-- ============================================
-- Prisma đã tự động tạo indexes từ schema.prisma
-- Nhưng có thể thêm custom indexes nếu cần:

-- Index cho search scans by domain
CREATE INDEX IF NOT EXISTS idx_scan_history_domain_search 
ON "ScanHistory" USING gin(to_tsvector('english', domain));

-- Index cho User lookup by email (case-insensitive)
CREATE INDEX IF NOT EXISTS idx_user_email_lower 
ON "User" (LOWER(email));


-- ============================================
-- BƯỚC 5: (OPTIONAL) Row Level Security (RLS)
-- ============================================
-- Nếu muốn enable RLS cho bảo mật extra

-- Enable RLS for ScanHistory
ALTER TABLE "ScanHistory" ENABLE ROW LEVEL SECURITY;

-- Policy: Users chỉ xem được scan của mình
CREATE POLICY "Users can view own scans" ON "ScanHistory"
  FOR SELECT
  USING (auth.uid()::text = "userId");

-- Policy: Users chỉ tạo được scan với userId của mình
CREATE POLICY "Users can create own scans" ON "ScanHistory"
  FOR INSERT
  WITH CHECK (auth.uid()::text = "userId");


-- ============================================
-- BƯỚC 6: Verify Database Setup
-- ============================================

-- Check tất cả tables đã được tạo
SELECT 
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns WHERE table_name = t.table_name) as column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

-- Check total records trong các bảng chính
SELECT 
  'User' as table_name, COUNT(*) as count FROM "User"
UNION ALL
SELECT 'ScanHistory', COUNT(*) FROM "ScanHistory"
UNION ALL
SELECT 'Subscription', COUNT(*) FROM "Subscription"
UNION ALL
SELECT 'ApiKey', COUNT(*) FROM "ApiKey"
UNION ALL
SELECT 'Watchlist', COUNT(*) FROM "Watchlist";


-- ============================================
-- BƯỚC 7: Useful Queries cho Monitoring
-- ============================================

-- Top users by scan count
SELECT 
  u.email,
  u.tier,
  COUNT(sh.id) as total_scans
FROM "User" u
LEFT JOIN "ScanHistory" sh ON u.id = sh."userId"
GROUP BY u.id, u.email, u.tier
ORDER BY total_scans DESC
LIMIT 10;

-- Active subscriptions
SELECT 
  u.email,
  s.tier,
  s.status,
  s."currentPeriodEnd"
FROM "Subscription" s
JOIN "User" u ON s."userId" = u.id
WHERE s.status = 'ACTIVE'
ORDER BY s."createdAt" DESC;

-- API usage by key
SELECT 
  u.email,
  ak.name as api_key_name,
  ak.prefix,
  COUNT(au.id) as total_requests,
  MAX(au."createdAt") as last_used
FROM "ApiKey" ak
JOIN "User" u ON ak."userId" = u.id
LEFT JOIN "ApiUsage" au ON ak.id = au."apiKeyId"
GROUP BY ak.id, u.email, ak.name, ak.prefix
ORDER BY total_requests DESC;


-- ============================================
-- BƯỚC 8: Cleanup (CHỈ DÙNG CHO DEV/TESTING!)
-- ============================================
-- CẢNH BÁO: Các lệnh này XÓA DATA!

-- Reset scan history
-- TRUNCATE TABLE "ScanHistory" CASCADE;

-- Reset all data (NGUY HIỂM!)
-- DO $$
-- DECLARE
--   r RECORD;
-- BEGIN
--   FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
--     EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' CASCADE';
--   END LOOP;
-- END $$;
