import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = await cookies();
    
    const sessionCookie = cookieStore.get('user_session');
    

    if (!sessionCookie) {
        return Response.json({ isAuthenticated: false, role: null, user: null });
    }

    try {
        const sessionData = JSON.parse(sessionCookie.value);
        
        if (sessionData && sessionData.role) {
            return Response.json({ 
                isAuthenticated: true, 
                role: sessionData.role,
                user: sessionData 
            });
        }
    } catch (e) {
        console.error("Failed to parse user session cookie:", e);
    }

    return Response.json({ isAuthenticated: false, role: null, user: null });
}