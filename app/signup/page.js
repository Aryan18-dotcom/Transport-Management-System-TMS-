"use client";
import Image from "next/image";
import Link from "next/link";
// Removed `redirect` import as it should not be used in client components like this
import React, { useState } from "react";
// Assuming the path is correct: "../utils/Loader"
import Loader from "../utils/Loader";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const initialFormData = {
  company_name: "",
  admin_full_name: "",
  admin_username: "", 
  admin_email: "",
  password: "",
  confirm_password: "",
};

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // --- Client-Side Validation ---
    if (formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match.");
      setLoading(false);
      resetForm();
      return;
    }
    
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      setLoading(false);
      resetForm();
      return;
    }

    try {
      const response = await fetch("/userAuth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), 
      });

      const data = await response.json();
      
      if (response.status === 201) {
        toast.success(data.message || "Signup success, Admin and the Company created.")
        resetForm(); 
        router.push('/login');
      } else {
        // Handle API errors (400, 409, etc.)
        toast.error(data.message || "Signup failed due to an unknown error.");
        resetForm(); // Reset form on failure
      }
    } catch (err) {
      toast.error("Network error. Please check your connection and try again.");
      resetForm(); // Reset form on network error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-neutral-100">
      
      {/* 1. FIX APPLIED: Correct way to render the Loader component */}
      <Loader isLoading={loading} message="Processing Admin Registration..." />
      
      <div className="bg-white shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Left Info + Image Section */}
        <div className="relative hidden md:block">
          <Image
            height={1000}
            width={1000}
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
            alt="Transport"
            className="h-full w-full object-cover"
            priority
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* Info Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-8 text-white">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                Transport Management System
              </h2>
              <p className="mt-2 text-sm text-neutral-200 max-w-sm">
                A single-stop solution to manage your entire transport business —
                trucks, drivers, trips, expenses, and profits.
              </p>
            </div>

            {/* Info Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
              <h3 className="text-lg font-semibold">
                Admin Account Creation
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-neutral-200">
                <li>✔ This signup creates a <b>Company Owner (Admin)</b></li>
                <li>✔ Full access to all trucks, drivers & finances</li>
                <li>✔ Add and manage employees after login</li>
                <li>✔ Track vehicle-wise profit & expenses</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Signup Form */}
        <div className="flex flex-col justify-center px-8 md:px-12 py-8">
          <h1 className="text-2xl font-bold text-neutral-800">
            Create Admin Account
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Register your transport company and start managing everything in one place.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="company_name" className="block text-sm font-medium text-neutral-700">
                Company Name
              </label>
              <input
                id="company_name"
                name="company_name"
                type="text"
                placeholder="ABC Roadways"
                value={formData.company_name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="admin_full_name" className="block text-sm font-medium text-neutral-700">
                Admin Full Name
              </label>
              <input
                id="admin_full_name"
                name="admin_full_name"
                type="text"
                placeholder="Your full name"
                value={formData.admin_full_name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="admin_username" className="block text-sm font-medium text-neutral-700">
                Admin Username (Used for Login)
              </label>
              <input
                id="admin_username"
                name="admin_username" 
                type="text"
                placeholder="Enter the USername You want for you!"
                value={formData.admin_username} 
                onChange={handleChange} 
                required
                className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="admin_email" className="block text-sm font-medium text-neutral-700">
                Email
              </label>
              <input
                id="admin_email"
                name="admin_email"
                type="email"
                placeholder="admin@company.com"
                value={formData.admin_email}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
                Password (Min 8 characters)
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-neutral-700">
                Confirm Password
              </label>
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                placeholder="••••••••"
                value={formData.confirm_password}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Status Messages */}
            {/* {error && (
              <p className="text-sm text-center text-red-600 font-medium bg-red-50 p-3 rounded-lg border border-red-200">
                {error}
              </p>
            )} */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 rounded-lg font-medium flex items-center justify-center transition ${
                loading
                  ? "bg-neutral-400 cursor-not-allowed"
                  : "bg-neutral-800 hover:bg-neutral-700"
              }`}
            >
              {/* 3. FIX APPLIED: Removed the inline SVG loader, relying solely on the external Loader component */}
              {loading ? "Processing..." : "Create Admin Account"}
            </button>
          </form>

          <p className="text-xs text-neutral-500 mt-4 text-center">
            Already have an account?{" "}
            <Link href={"login"} className="font-medium text-neutral-800 cursor-pointer hover:underline">
              Login
            </Link>
          </p>
          <p className="text-xs text-neutral-400 text-center mt-1">
            © 2025 Transport Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;