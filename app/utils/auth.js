export async function getSessionData() {
    try {
        const res = await fetch('/api/session', {method: "GET",});
        
        if (!res.ok) return { isAuthenticated: false, role: null, user: null };
        return await res.json();
    } catch (e) {
        console.error(e);
        return { isAuthenticated: false, role: null, user: null };
    }
}

export async function requireAuth() {
    const session = await getSessionData();
    return { role: session.role, user: session.user, isAuthenticated: session.isAuthenticated };
}