import { NextResponse } from 'next/server';

// **UPDATED: Using an array to support multiple users/roles**
const VALID_CREDENTIALS = [
    {
        company_name: "Mansi RoadWays",
        username: "Admin",
        password: "123",
        role: "admin"
    },
    {
        company_name: "Mansi RoadWays",
        username: "Employee01",
        password: "456", 
        role: "employee"
    },
];

export async function POST(request) {
    let requestBody;
    
    try {
        requestBody = await request.json();
    } catch (error) {
        return NextResponse.json(
            { message: "Invalid JSON format in request body." }, 
            { status: 400 }
        );
    }
    
    const { company_name, username, password } = requestBody;

    // Normalize inputs for case-insensitive matching
    const normalizedCompany = company_name?.trim().toLowerCase();
    const normalizedUsername = username?.trim().toLowerCase();

    if (!normalizedCompany || !normalizedUsername || !password) {
        return NextResponse.json(
            { message: "Missing required fields: company_name, username, or password." }, 
            { status: 400 }
        );
    }

    const user = VALID_CREDENTIALS.find(
        (u) => 
            u.company_name.toLowerCase() === normalizedCompany &&
            u.username.toLowerCase() === normalizedUsername &&
            u.password === password
    );

    if (user) {
        // 1. Prepare session data
        const sessionData = { 
            id: user.username, 
            company: user.company_name, 
            role: user.role,
            isAuthenticated: true 
        };

        const serializedSession = JSON.stringify(sessionData);
        
        const maxAge = 60 * 60 * 24;
        
        const cookieOptions = [
            `Max-Age=${maxAge}`,
            'Path=/',
            'SameSite=Strict',
            process.env.NODE_ENV === 'production' ? 'Secure' : ''
        ].filter(Boolean).join('; ');
        
        const cookieHeader = `user_session=${serializedSession}; ${cookieOptions}`;

        // 3. FIX: Create NextResponse and set the cookie in the headers
        return NextResponse.json(
            { 
                message: "Login successful.", 
                user: sessionData 
            }, 
            { 
                status: 200,
                headers: {
                    'Set-Cookie': cookieHeader
                }
            }
        );
    } else {
        return NextResponse.json(
            { message: "Invalid credentials provided." }, 
            { status: 401 }
        );
    }
}