"use client";

import { LogsIcon } from "lucide-react";
import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

const pages = [
  { Page: "Overview", Link: "#overview" },
  { Page: "Features", Link: "#features" },
  { Page: "Stats", Link: "#stats" },
];

const NavBar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check if the scroll position is more than 100 pixels
    const unsubscribe = scrollY.on("change", (y) => {
      setScrolled(y > 100);
    });

    return () => unsubscribe();
  }, [scrollY]);

  return (
    // The parent nav remains fixed, full width, and centered
    <nav className="fixed top-0 z-50 w-full flex justify-center">
      <motion.div
        initial={{ width: "100%", maxWidth: "100%" }}
        animate={{
          // Use max-w-4xl (56rem) as the target scrolled width
          maxWidth: scrolled ? "56rem" : "100%",
          // Use a deep semi-transparent navy/charcoal for a cleaner look
          backgroundColor: scrolled
            ? "rgba(10, 10, 15, 0.75)"
            : "rgba(0,0,0,0)",
          backdropFilter: scrolled ? "blur(12px)" : "blur(0px)", 
          boxShadow: scrolled
            ? "0 8px 20px rgba(0,0,0,0.3)"
            : "0 0 0 rgba(0,0,0,0)",
          y: scrolled ? 16 : 0, // Moves it down 16px when scrolled
          // Add a subtle border on scroll
          borderColor: scrolled ? "rgba(45, 45, 55, 1)" : "rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="rounded-full border border-transparent transition-colors duration-300" // Use rounded-full for modern pill shape
      >
        <div className="px-6 py-2 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 text-white">
            <LogsIcon className="size-6 text-blue-400" /> {/* Highlight logo */}
            <span className="text-xl font-bold tracking-tight">TMS</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center gap-6">
            {pages.map((page, index) => (
              <a
                key={index}
                href={page.Link}
                className="text-sm font-medium text-neutral-300 hover:text-blue-400 transition"
              >
                {page.Page}
              </a>
            ))}
          </div>

          {/* CTA - Primary Color */}
          <Link
            href="/signup"
            className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600 transition"
          >
            Sign up
          </Link>
        </div>
      </motion.div>
    </nav>
  );
};

export default NavBar;