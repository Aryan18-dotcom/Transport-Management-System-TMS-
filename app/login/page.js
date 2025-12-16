"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from 'react-toastify';
import Loader from "../utils/Loader";

const initialFormData = {
  company_name: "",
  username: "",
  password: "",
};

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      toast.success(message);
    }
  }, [searchParams]);

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/userAuth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      

      const data = await response.json();

      if (response.status === 200) {
        toast.success(data.message || "Login successful!");
        resetForm();
        if (data.user["role"]){
          router.push('/admin/dashboard');
        } else if (data.user["employee"]){
          router.push('/employee/dashboard')
        } else {
          toast.error("We cant get your Role, thus Login Again.");
        }
      } else {
        toast.error(data.message || "Login failed.");
        resetForm();
      }
    } catch (err) {
      console.log(err);
      toast.error("Network error. Please check your connection and try again.");
      resetForm();
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen w-full flex items-center justify-center bg-neutral-100">
      <Loader isLoading={loading} message="Logging in..." />
      <div className="w-full h-full bg-white shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Left Image Section */}
        <div className="relative hidden md:block">
          <Image
            height={1000}
            width={1000}
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
            alt="Transport"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex flex-col p-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-white">
                Transport Management System
              </h2>
              <p className="mt-2 text-sm text-neutral-200 max-w-sm">
                A single-stop solution to manage your entire transport business —
                trucks, drivers, trips, expenses, and profits.
              </p>
            </div>
          </div>
        </div>

        {/* Right Login Form Section */}
        <div className="flex flex-col justify-center px-8 md:px-12">
          <h1 className="text-2xl font-bold text-neutral-800">
            Welcome Back
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Login to manage your transport operations
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Company Name
              </label>
              <input
                id="company_name"
                name="company_name"
                type="text"
                placeholder="XyzCompany"
                value={formData.company_name}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="xyzUser"
                value={formData.username}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 w-full rounded-lg border border-neutral-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-neutral-800"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full text-white py-2 rounded-lg font-medium flex items-center justify-center transition ${
                loading
                  ? "bg-neutral-400 cursor-not-allowed"
                  : "bg-neutral-800 hover:bg-neutral-700"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-xs text-neutral-500 mt-4 text-center">
            Don't have an account?{" "}
            <Link href={"signup"} className="font-medium text-neutral-800 cursor-pointer hover:underline">
              Signup
            </Link>
          </p>

          <p className="text-xs text-neutral-400 mt-6 text-center">
            © 2025 Transport Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
