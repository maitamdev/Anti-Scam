# Adventure World - Deployment Guide

## 🚀 Option 1: Vercel (Recommended for Client)

### Deploy Web Client to Vercel
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repo
4. Set Root Directory: `apps/web`
5. Set Environment Variables:
   ```
   NEXT_PUBLIC_GAME_SERVER_URL=wss://your-game-server.railway.app
   NEXT_PUBLIC_SOCIAL_SERVER_URL=https://your-social-server.railway.app
   ```
6. Deploy!

---

## 🎮 Option 2: Railway (Full Stack)

### Deploy all 3 servers on Railway

1. Create account at [railway.app](https://railway.app)

2. Create new project from GitHub repo

3. Add 3 services:

#### Service 1: Web (Next.js)
- Root: `/`
- Build: `cd apps/web && pnpm build`
- Start: `cd apps/web && pnpm start`
- Port: `3000`

#### Service 2: Game Server (Colyseus)
- Root: `/`
- Build: `cd apps/game-server && pnpm build`
- Start: `cd apps/game-server && pnpm start`
- Port: `2567`

#### Service 3: Social Server (Socket.IO)
- Root: `/`
- Build: `cd apps/social-server && pnpm build`
- Start: `cd apps/social-server && pnpm start`
- Port: `3001`

4. Set Environment Variables:
```
JWT_SECRET=your-secret-key-change-this
NEXT_PUBLIC_GAME_SERVER_URL=wss://game-server-xxx.railway.app
NEXT_PUBLIC_SOCIAL_SERVER_URL=https://social-server-xxx.railway.app
```

---

## 🐳 Option 3: Docker Compose (Self-Host)

```bash
docker-compose up -d
```

Access at `http://localhost:3000`

---

## ⚡ Quick Deploy Commands

### GitHub
```bash
cd c:\Users\Asus\Downloads\DHV\adventure-world
git add .
git commit -m "Initial Adventure World MVP"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/adventure-world.git
git push -u origin main
```

### Vercel CLI
```bash
npm i -g vercel
cd apps/web
vercel --prod
```

---

## 🔧 Environment Variables (Production)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for JWT tokens |
| `NEXT_PUBLIC_GAME_SERVER_URL` | WebSocket URL for Colyseus |
| `NEXT_PUBLIC_SOCIAL_SERVER_URL` | HTTP URL for Socket.IO |

---

## ❓ Notes

- **Game Server (Colyseus)**: Needs WebSocket support. Railway/Render work well.
- **Social Server (Socket.IO)**: Standard HTTP + WebSocket.
- **Database**: Add PostgreSQL service on Railway or use Supabase/Neon.

## Free Hosting Options

| Service | Free Tier | Best For |
|---------|-----------|----------|
| Vercel | Unlimited | Web Client |
| Railway | $5/month credit | All servers |
| Render | 750 hours | Backend |
| Supabase | 500MB DB | PostgreSQL |
