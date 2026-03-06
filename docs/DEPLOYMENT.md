# Deployment Guide

## Prerequisites
- Node.js 20+
- PostgreSQL database
- Vercel account (or similar)

## Environment Variables
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret
ADMIN_SECRET=your-admin-secret
STRIPE_SECRET_KEY=sk_...
HUGGINGFACE_API_KEY=hf_...

## Steps
1. Clone repo
2. npm install
3. npx prisma migrate deploy
4. npm run build
5. npm start

## Vercel Deployment
1. Connect GitHub repo
2. Set environment variables
3. Deploydocs: add deployment guide
