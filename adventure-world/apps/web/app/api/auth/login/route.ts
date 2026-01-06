import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Demo users (same store as register - in production use Prisma)
const users: Map<string, { id: string; email: string; username: string; passwordHash: string }> = new Map();

// Add a demo user
const demoPasswordHash = '$2a$10$demo'; // In real app, use bcrypt
users.set('demo', {
    id: 'demo_user',
    email: 'demo@adventure.world',
    username: 'DemoPlayer',
    passwordHash: demoPasswordHash,
});

const JWT_SECRET = process.env.JWT_SECRET || 'adventure-world-secret-key';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { success: false, error: 'Vui lòng điền email và mật khẩu' },
                { status: 400 }
            );
        }

        // Find user
        let foundUser = null;
        for (const user of users.values()) {
            if (user.email === email) {
                foundUser = user;
                break;
            }
        }

        // Demo login bypass
        if (email === 'demo@adventure.world' && password === 'demo1234') {
            const demoUser = { id: 'demo_user', email, username: 'DemoPlayer' };
            const accessToken = jwt.sign({ sub: demoUser.id, username: demoUser.username }, JWT_SECRET, { expiresIn: '15m' });
            const refreshToken = jwt.sign({ sub: demoUser.id }, JWT_SECRET, { expiresIn: '7d' });

            return NextResponse.json({
                success: true,
                user: { ...demoUser, level: 5 },
                tokens: { accessToken, refreshToken },
            });
        }

        if (!foundUser) {
            return NextResponse.json(
                { success: false, error: 'Email hoặc mật khẩu không đúng' },
                { status: 401 }
            );
        }

        // Verify password
        const validPassword = await bcrypt.compare(password, foundUser.passwordHash);
        if (!validPassword) {
            return NextResponse.json(
                { success: false, error: 'Email hoặc mật khẩu không đúng' },
                { status: 401 }
            );
        }

        // Generate tokens
        const accessToken = jwt.sign(
            { sub: foundUser.id, username: foundUser.username },
            JWT_SECRET,
            { expiresIn: '15m' }
        );
        const refreshToken = jwt.sign(
            { sub: foundUser.id },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        return NextResponse.json({
            success: true,
            user: {
                id: foundUser.id,
                email: foundUser.email,
                username: foundUser.username,
                level: 1,
            },
            tokens: { accessToken, refreshToken },
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { success: false, error: 'Đã có lỗi xảy ra' },
            { status: 500 }
        );
    }
}
