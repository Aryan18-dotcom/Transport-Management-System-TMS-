import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// **UPDATED: Reading user and company data from separate JSON files**
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

export async function POST(request) {
  let requestBody;

  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid JSON format in request body." },
      { status: 400 }
    );
  }

  const { company_name, username, password } = requestBody;

  if (!company_name || !username || !password) {
    return NextResponse.json(
      { message: "All fields are required." },
      { status: 400 }
    );
  }

  const normalizedUsername = username.toLowerCase().trim();
  const normalizedCompany = company_name.toLowerCase().trim();

  const users = getUserData();
  const companies = getCompanyData();

  const user = users.find(
    (u) =>
      u.username.toLowerCase() === normalizedUsername &&
      u.password === password &&
      u.status === "active"
  );

  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials provided." },
      { status: 401 }
    );
  }

  const company = companies.find(
    (c) => c.companyId === user.companyId && c.status === "active"
  );

  if (!company || company.company_name.toLowerCase() !== normalizedCompany) {
    return NextResponse.json(
      { message: "Invalid credentials provided." },
      { status: 401 }
    );
  }

  const sessionData = {
    id: user.username,
    company: company.company_name,
    role: user.role,
    companyId: user.companyId,
    userId: user.userId,
    email: user.email,
    full_name: user.full_name,
    isAuthenticated: true,
  };

  const maxAge = 60 * 60 * 24;

  const cookieHeader = `user_session=${JSON.stringify(sessionData)}; Max-Age=${maxAge}; Path=/; SameSite=Strict;${
    process.env.NODE_ENV === "production" ? " Secure;" : ""
  }`;

  return NextResponse.json(
    { message: "Login successful.", user: sessionData },
    {
      status: 200,
      headers: { "Set-Cookie": cookieHeader },
    }
  );
}
