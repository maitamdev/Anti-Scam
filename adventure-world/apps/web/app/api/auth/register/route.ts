import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// In-memory store for demo (replace with Prisma in production)
const users: Map<string, { id: string; email: string; username: string; passwordHash: string }> = new Map();

const JWT_SECRET = process.env.JWT_SECRET || 'adventure-world-secret-key';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, username, password } = body;

        // Validate
        if (!email || !username || !password) {
            return NextResponse.json(
                { success: false, error: 'Vui lòng điền đủ thông tin' },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { success: false, error: 'Mật khẩu phải có ít nhất 8 ký tự' },
                { status: 400 }
            );
        }

        // Check existing
        for (const user of users.values()) {
            if (user.email === email) {
                return NextResponse.json(
                    { success: false, error: 'Email đã được sử dụng' },
                    { status: 409 }
                );
            }
            if (user.username === username) {
                return NextResponse.json(
                    { success: false, error: 'Tên người dùng đã tồn tại' },
                    { status: 409 }
                );
            }
        }

        // Create user
        const id = `user_${Date.now()}`;
        const passwordHash = await bcrypt.hash(password, 10);

        users.set(id, { id, email, username, passwordHash });

        // Generate tokens
        const accessToken = jwt.sign({ sub: id, username }, JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ sub: id }, JWT_SECRET, { expiresIn: '7d' });

        return NextResponse.json({
            success: true,
            user: { id, email, username, level: 1 },
            tokens: { accessToken, refreshToken },
        });
    } catch (error) {
        console.error('Register error:', error);
        return NextResponse.json(
            { success: false, error: 'Đã có lỗi xảy ra' },
            { status: 500 }
        );
    }
}
