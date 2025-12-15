export async function POST(request) {
    let requestBody;
    
    try {
        // 1. Parse the request body
        requestBody = await request.json();
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Invalid JSON format in request body." }), 
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
    
    const { 
        company_name, 
        admin_full_name,
        admin_username,
        admin_email,
        password,
        confirm_password 
    } = requestBody;

    const requiredFields = [
        company_name, 
        admin_full_name,
        admin_username,
        admin_email,
        password,
        confirm_password
    ];

    if (requiredFields.some(field => !field)) {
        return new Response(
            JSON.stringify({ message: "Missing one or more required fields." }), 
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    // Check if passwords match
    if (password !== confirm_password) {
        return new Response(
            JSON.stringify({ message: "Password and Confirm Password do not match." }), 
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }

    // Basic password strength (example)
    if (password.length < 8) {
        return new Response(
            JSON.stringify({ message: "Password must be at least 8 characters long." }), 
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
    
    // Simulate check for existing company/user (Database check)
    if (company_name === "Acme Logistics") {
        return new Response(
            JSON.stringify({ message: "Company name is already taken." }), 
            { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
    }
    if (admin_username === "existing_admin") {
        return new Response(
            JSON.stringify({ message: "Username is already taken." }), 
            { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
    }


    const newCompanyId = "CMP-" + Date.now();
    const newAdminId = "USR-" + Date.now();

    const newUserData = {
        companyId: newCompanyId,
        userId: newAdminId,
        username: admin_username,
        role: "admin",
    };

    return new Response(
        JSON.stringify({ 
            message: "Company and Admin user successfully created.", 
            user: { 
                username: newUserData.username,
                role: newUserData.role,
                company: company_name
            } 
        }), 
        { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
}