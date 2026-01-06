# Adventure World - Anti-Scam 3D Web Game

Một game web 3D giáo dục về chống lừa đảo, cho phép người chơi khám phá thế giới, hoàn thành quest, và sử dụng Scan Center để kiểm tra URL/text.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm 8+ (`npm install -g pnpm`)
- PostgreSQL 15+ (optional for full features)

### Installation

```bash
# Clone và di chuyển vào thư mục
cd c:\Users\Asus\Downloads\DHV\adventure-world

# Cài đặt dependencies
pnpm install

# Copy environment file
copy .env.example .env
```

### Run Development Servers

Mở 3 terminal riêng biệt:

**Terminal 1 - Web Client (Next.js)**
```bash
cd apps/web
pnpm dev
# → http://localhost:3000
```

**Terminal 2 - Game Server (Colyseus)**
```bash
cd apps/game-server
pnpm dev
# → ws://localhost:2567
```

**Terminal 3 - Social Server (Socket.IO)**
```bash
cd apps/social-server
pnpm dev
# → http://localhost:3001
```

### Test the Game

1. Mở browser tại `http://localhost:3000`
2. Click **"Chơi Ngay"** để vào demo mode
3. Vào Hub World, di chuyển bằng WASD
4. Đi đến portal xanh lá, nhấn E để vào Zone Z1
5. Trong Zone Z1, chọn quest và hoàn thành
6. Test Scan Center với URL: `http://fake-bank-login.xyz`

## 📁 Project Structure

```
adventure-world/
├── apps/
│   ├── web/                 # Next.js client + Babylon.js 3D
│   │   ├── app/
│   │   │   ├── page.tsx     # Landing page
│   │   │   ├── hub/         # Hub world
│   │   │   ├── zone/[id]/   # Zone instances
│   │   │   └── api/         # API routes
│   │   └── components/
│   │       ├── babylon/     # 3D scene components
│   │       └── game/        # UI components (HUD, Chat, etc.)
│   │
│   ├── game-server/         # Colyseus multiplayer server
│   │   └── src/
│   │       ├── rooms/       # HubRoom, ZoneRoom
│   │       ├── schemas/     # State schemas
│   │       └── data/        # Quest data
│   │
│   └── social-server/       # Socket.IO chat/presence
│       └── src/
│           └── namespaces/  # chat, presence, notifications
│
└── packages/
    └── shared/              # Shared code
        ├── src/
        │   ├── types/       # TypeScript types
        │   ├── validation/  # Zod schemas
        │   ├── constants/   # Game constants
        │   └── utils/       # Utilities
        └── prisma/          # Database schema
```

## 🎮 Features (MVP)

### Hub World
- ✅ 3D scene với Babylon.js
- ✅ Player movement (WASD)
- ✅ NPC interactions
- ✅ Portals đến 4 zones

### Zone Z1 (Phishing Forest)
- ✅ 3 educational quests
- ✅ Quiz-based puzzles
- ✅ XP/Coin rewards

### Chat System
- ✅ Hub global chat
- ✅ Zone local chat
- ✅ Content filtering
- ✅ Rate limiting

### Scan Center
- ✅ URL scanning
- ✅ Text scanning
- ✅ Risk scoring (0-100)
- ✅ Vietnamese scam patterns

### Profile
- ✅ XP/Level display
- ✅ Badge collection
- ✅ Coin counter

## 🔧 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, React 18 |
| 3D Engine | Babylon.js 7 |
| Game Server | Colyseus 0.15 |
| Social | Socket.IO 4 |
| Database | PostgreSQL + Prisma |
| Language | TypeScript |
| Package Manager | pnpm |

## 📚 Documentation

Xem trong thư mục `.gemini/antigravity/brain/`:
- `A_PRD_GDD.md` - Product & Game Design
- `B_UXUI_Spec.md` - UI/UX Specification
- `C_Art_Bible.md` - Art Direction
- `D_TDD_Architecture.md` - Technical Design
- `E_Database_API_Contracts.md` - API Specs
- `H_Performance_Plan.md` - Optimization
- `I_Trust_Safety_Plan.md` - Security
- `J_Release_Plan.md` - Roadmap

## 🎯 Controls

| Key | Action |
|-----|--------|
| W/A/S/D | Move |
| Mouse | Camera |
| E | Interact |
| Tab | Toggle Chat |

## 📝 Demo Account

Email: `demo@adventure.world`  
Password: `demo1234`

## License

Private - Anti-Scam Educational Project
