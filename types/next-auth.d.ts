import 'next-auth'
import { Tier, Role } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      name?: string | null
      avatar?: string | null
      role: Role
      tier: Tier
      dailyScans?: number
      totalScans?: number
    }
  }

  interface User {
    id: string
    email: string
    name?: string | null
    avatar?: string | null
    role: Role
    tier: Tier
    dailyScans?: number
    totalScans?: number
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    role: Role
    tier: Tier
    dailyScans?: number
    totalScans?: number
  }
}
