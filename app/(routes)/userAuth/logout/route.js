import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Clear the user_session cookie by setting it to expire immediately
        const response = NextResponse.json(
            { message: "Logged out successfully" },
            { status: 200 }
        );

        response.cookies.set('user_session', '', {
            maxAge: 0,
            path: '/',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { message: "Logout failed" },
            { status: 500 }
        );
    }
}