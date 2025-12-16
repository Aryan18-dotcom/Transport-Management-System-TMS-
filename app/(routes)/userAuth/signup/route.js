import fs from 'fs';
import path from 'path';

// Helper functions to read and write data
const getUserData = () => {
    try {
        const filePath = path.join(process.cwd(), 'SiteData', 'Users.json');
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error('Error reading Users.json:', error);
        return [];
    }
};

const getCompanyData = () => {
    try {
        const filePath = path.join(process.cwd(), 'SiteData', 'Companies.json');
        const fileContents = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(fileContents);
    } catch (error) {
        console.error('Error reading Companies.json:', error);
        return [];
    }
};

const saveUserData = (userData) => {
    try {
        const filePath = path.join(process.cwd(), 'SiteData', 'Users.json');
        fs.writeFileSync(filePath, JSON.stringify(userData, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing Users.json:', error);
        return false;
    }
};

const saveCompanyData = (companyData) => {
    try {
        const filePath = path.join(process.cwd(), 'SiteData', 'Companies.json');
        fs.writeFileSync(filePath, JSON.stringify(companyData, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error writing Companies.json:', error);
        return false;
    }
};

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
    
    // Get existing data
    const existingUsers = getUserData();
    const existingCompanies = getCompanyData();

    // Check if company name already exists
    const companyExists = existingCompanies.some(
        company => company.company_name.toLowerCase() === company_name.toLowerCase()
    );

    if (companyExists) {
        return new Response(
            JSON.stringify({ message: "Company name is already taken." }), 
            { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
    }

    // Check if username already exists
    const usernameExists = existingUsers.some(
        user => user.username.toLowerCase() === admin_username.toLowerCase()
    );

    if (usernameExists) {
        return new Response(
            JSON.stringify({ message: "Username is already taken." }), 
            { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
    }

    // Check if email already exists
    const emailExists = existingUsers.some(
        user => user.email.toLowerCase() === admin_email.toLowerCase()
    );

    if (emailExists) {
        return new Response(
            JSON.stringify({ message: "Email is already registered." }), 
            { status: 409, headers: { 'Content-Type': 'application/json' } }
        );
    }


    const newCompanyId = "CMP-" + Date.now();
    const newAdminId = "USR-" + Date.now();
    const currentTimestamp = new Date().toISOString();

    // Create new company record
    const newCompany = {
        companyId: newCompanyId,
        company_name: company_name,
        created_at: currentTimestamp,
        total_members: 1,
        member_ids: [newAdminId],
        status: "active"
    };

    // Create new user record
    const newUser = {
        userId: newAdminId,
        companyId: newCompanyId,
        username: admin_username,
        password: password,
        role: "admin",
        email: admin_email,
        full_name: admin_full_name,
        created_at: currentTimestamp,
        status: "active"
    };

    // Add new company to existing companies array
    existingCompanies.push(newCompany);

    // Add new user to existing users array
    existingUsers.push(newUser);

    // Save both files
    const companySaveSuccess = saveCompanyData(existingCompanies);
    const userSaveSuccess = saveUserData(existingUsers);

    if (!companySaveSuccess || !userSaveSuccess) {
        return new Response(
            JSON.stringify({ message: "Failed to save data. Please try again." }), 
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }

    return new Response(
        JSON.stringify({ 
            message: "Company and Admin user successfully created.", 
            user: { 
                username: newUser.username,
                role: newUser.role,
                company: newCompany.company_name,
                companyId: newUser.companyId,
                userId: newUser.userId,
                email: newUser.email,
                full_name: newUser.full_name
            } 
        }), 
        { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
}