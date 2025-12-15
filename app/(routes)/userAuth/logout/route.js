import { NextResponse } from 'next/server';

export async function GET() {
    // Create a redirect response to the login page with a success message
    const redirectUrl = new URL('/login?message=Logged out successfully', 
        process.env.NEXTAUTH_URL || 'http://localhost:3000');
    
    const response = NextResponse.redirect(redirectUrl);
    
    // Clear the user_session cookie by setting it to expire immediately
    response.cookies.set('user_session', '', {
        maxAge: 0,
        path: '/',
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
    
    return response;
}