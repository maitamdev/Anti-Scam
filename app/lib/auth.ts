/**
 * NextAuth Configuration
 * Handles authentication with multiple providers
 */

import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import { compare } from 'bcryptjs'
import prisma from './db'
import { Tier, Role } from '@prisma/client'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  
  providers: [
    // Email & Password
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email và mật khẩu là bắt buộc')
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user || !user.password) {
          throw new Error('Email hoặc mật khẩu không đúng')
        }

        const isPasswordValid = await compare(credentials.password, user.password)

        if (!isPasswordValid) {
          throw new Error('Email hoặc mật khẩu không đúng')
        }

        if (user.status !== 'ACTIVE') {
          throw new Error('Tài khoản của bạn đã bị tạm khóa')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar,
          role: user.role,
          tier: user.tier,
        }
      }
    }),

    // Google OAuth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/dashboard' // Redirect after first sign in
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id
        token.role = user.role
        token.tier = user.tier
        token.dailyScans = user.dailyScans
        token.totalScans = user.totalScans
      }

      // Update session
      if (trigger === 'update' && session) {
        token = { ...token, ...session.user }
      }

      // Refresh user stats from DB on each request
      if (token.id) {
        try {
          const dbUser = await prisma.user.findUnique({
            where: { id: token.id as string },
            select: { dailyScans: true, totalScans: true, tier: true }
          })
          if (dbUser) {
            token.dailyScans = dbUser.dailyScans
            token.totalScans = dbUser.totalScans
            token.tier = dbUser.tier
          }
        } catch (e) {
          // Ignore errors
        }
      }

      return token
    },

    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as Role
        session.user.tier = token.tier as Tier
        session.user.dailyScans = token.dailyScans as number
        session.user.totalScans = token.totalScans as number
      }

      return session
    },

    async signIn({ user, account, profile }) {
      // For OAuth providers, ensure user tier is set
      if (account?.provider !== 'credentials') {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! }
        })

        if (existingUser && !existingUser.tier) {
          await prisma.user.update({
            where: { id: existingUser.id },
            data: { tier: Tier.FREE }
          })
        }
      }

      return true
    }
  },

  events: {
    async signIn({ user, isNewUser }) {
      if (isNewUser) {
        // Initialize new user data
        await prisma.user.update({
          where: { id: user.id },
          data: {
            tier: Tier.FREE,
            role: Role.USER,
            status: 'ACTIVE',
            dailyScans: 0,
            dailyImageScans: 0,
            totalScans: 0,
            lastResetAt: new Date()
          }
        })
      }
    }
  },

  debug: process.env.NODE_ENV === 'development',
}
