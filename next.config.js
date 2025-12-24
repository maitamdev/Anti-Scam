/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Chỉ sử dụng basePath khi deploy lên GitHub Pages với repo name
  // Nếu dùng custom domain hoặc username.github.io thì comment dòng này
  // basePath: '/your-repo-name',
  // assetPrefix: '/your-repo-name/',
  trailingSlash: true,
}

module.exports = nextConfig
