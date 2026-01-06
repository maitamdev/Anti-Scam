/**
 * Firebase Sign-in API Route
 * Handles Google authentication via Firebase and creates/updates user in database
 */

import { NextRequest, NextResponse } from 'next/server'
import { adminAuth } from '@/app/lib/firebase-admin'
import prisma from '@/app/lib/db'
import { hash } from 'bcryptjs'
import { nanoid } from 'nanoid'

export async function POST(req: NextRequest) {
    try {
        const { idToken, email, name, avatar } = await req.json()

        if (!idToken || !email) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        // Verify Firebase ID token
        let decodedToken
        try {
            decodedToken = await adminAuth.verifyIdToken(idToken)
        } catch (error) {
            console.error('Firebase token verification failed:', error)
            return NextResponse.json(
                { error: 'Invalid Firebase token' },
                { status: 401 }
            )
        }

        // Check if user exists
        let user = await prisma.user.findUnique({
            where: { email }
        })

        // Generate a temporary password for this session
        const tempPassword = nanoid(32)
        const hashedPassword = await hash(tempPassword, 12)

        if (!user) {
            // Create new user
            user = await prisma.user.create({
                data: {
                    email,
                    name: name || email.split('@')[0],
                    avatar,
                    password: hashedPassword,
                    tier: 'FREE',
                    role: 'USER',
                    status: 'ACTIVE',
                    dailyScans: 0,
                    dailyImageScans: 0,
                    totalScans: 0,
                    lastResetAt: new Date()
                }
            })
        } else {
            // Update existing user
            user = await prisma.user.update({
                where: { email },
                data: {
                    name: name || user.name,
                    avatar: avatar || user.avatar,
                    password: hashedPassword, // Update password for this session
                }
            })
        }

        return NextResponse.json({
            success: true,
            tempPassword,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                avatar: user.avatar
            }
        })
    } catch (error) {
        console.error('Firebase signin error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
