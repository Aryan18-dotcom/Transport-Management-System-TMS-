"use client";

import NavBar from "@/app/utils/NavBar";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Truck,
  BarChart3,
  FileText,
  ArrowRight,
  ClipboardList,
} from "lucide-react";

// --- Micro-Skeletons for Visual Trust (Replace big image) ---
// These small components represent the core features visually.
const MicroSkeletons = () => (
  <motion.div
    className="mt-16 grid grid-cols-3 gap-4 w-full max-w-3xl mx-auto"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.6 }}
  >
    {/* Skeleton 1: Truck Tracking */}
    <div className="flex flex-col items-center p-4 bg--900/50 backdrop-blur-sm rounded-xl border border-neutral-700/50">
      <Truck className="size-6 text-blue-400" />
      <p className="text-xs text-neutral-400 mt-2">Vehicle Status</p>
      <motion.div
        className="h-2 w-16 mt-1 bg-green-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: 40 }}
        transition={{ delay: 1, duration: 1 }}
      />
    </div>

    {/* Skeleton 2: Profit Analysis */}
    <div className="flex flex-col items-center p-4 bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-700/50">
      <BarChart3 className="size-6 text-yellow-400" />
      <p className="text-xs text-neutral-400 mt-2">Net Profit</p>
      <motion.div
        className="h-2 w-16 mt-1 bg-yellow-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: 64 }}
        transition={{ delay: 1.2, duration: 1 }}
      />
    </div>

    {/* Skeleton 3: Documentation */}
    <div className="flex flex-col items-center p-4 bg-neutral-900/50 backdrop-blur-sm rounded-xl border border-neutral-700/50">
      <FileText className="size-6 text-red-400" />
      <p className="text-xs text-neutral-400 mt-2">Documents</p>
      <motion.div
        className="h-2 w-16 mt-1 bg-red-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: 50 }}
        transition={{ delay: 1.4, duration: 1 }}
      />
    </div>
  </motion.div>
);
// --- End Micro-Skeletons ---


const HeroSection = () => {
  return (
    // Use neutral dark background for contrast, height set to min-h-screen for full effect
    <section className="relative min-h-screen w-full overflow-hidden bg-neutral-950">
      <NavBar />

      {/* --- Subtle Background Animation (Diagonal Line) --- */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-neutral-950" />
        {/* Animated Slant Line */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="gold-light-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4A90E2" /> {/* Start Blue */}
                <stop offset="50%" stopColor="#FFD700" /> {/* Mid Gold/Yellow */}
                <stop offset="100%" stopColor="#4A90E2" /> {/* End Blue */}
              </linearGradient>
            </defs>
            {/* The Slanted Line Path */}
            <motion.path
              d="M 0 500 L 1920 0" // Path from bottom-left to top-right
              fill="none"
              stroke="url(#gold-light-gradient)"
              strokeWidth="2"
              strokeDasharray="1000" // Length of the path
              initial={{ strokeDashoffset: 1000 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>
      </motion.div>
      {/* --- End Background Animation --- */}


      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center pt-32 pb-20">
        <div className="max-w-4xl px-6 text-center">
          
          {/* Headline - Direct and Powerful */}
          <motion.h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Digital Management for 
            <span className="block text-blue-400/90 mt-1">
              Roadways & Transport Companies
            </span>
          </motion.h1>

          {/* Subtext - Clear Explanation & Trust Building */}
          <motion.p
            className="mx-auto mt-6 max-w-3xl text-lg text-neutral-300 leading-relaxed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Eliminate complexity and maximize profitability with one powerful platform. 
            Track trips, expenses, documents, and vehicle ROI in real-time.
          </motion.p>

          {/* CTAs - Direct Action */}
          <motion.div
            className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {/* Primary CTA: Start Managing (Most prominent action) */}
            <Link
              href="/signup"
              className="inline-flex items-center rounded-full bg-blue-500 px-8 py-3 text-lg font-semibold text-white shadow-xl shadow-blue-500/30 transition hover:bg-blue-600 hover:scale-[1.02]"
            >
              Start Managing Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            {/* Secondary CTA: Demo (For higher trust/commitment) */}
            <Link
              href="/demo"
              className="inline-flex items-center rounded-full border border-neutral-600 bg-neutral-800 px-8 py-3 text-lg font-medium text-neutral-300 hover:border-blue-500 hover:text-white transition"
            >
              Book a Demo
            </Link>
          </motion.div>
          
          {/* Micro-Skeletons for Visual Trust */}
          <MicroSkeletons />

        </div>
      </div>
    </section>
  );
};

export default HeroSection;