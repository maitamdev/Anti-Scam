# Architecture Overview

## Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth.js
- **AI**: HuggingFace + Groq
- **Payments**: Stripe

## Directory Structure
app/ - Next.js app router pages and components
app/api/ - API routes
app/lib/ - Utilities, services, and core logic
app/hooks/ - Custom React hooks
app/components/ - Reusable UI components
types/ - TypeScript type definitions
prisma/ - Database schema and migrations
extension/ - Browser extension code

## Data Flow
1. User submits URL
2. Heuristic analysis runs
3. AI model provides prediction
4. Results combined and returned
5. Scan stored in databasedocs: add architecture overview document
