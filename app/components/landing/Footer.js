import Link from "next/link";
import { LogsIcon } from "lucide-react";
import { Twitter, Linkedin, Github } from "lucide-react"; // Social icons

const Footer = () => {
  const footerLinks = [
    {
      title: "Product",
      links: [
        { name: "Overview", href: "#overview" },
        { name: "Features", href: "#features" },
        { name: "Pricing", href: "#pricing" },
        { name: "Stats", href: "#stats" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
        { name: "Blog", href: "/blog" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
        { name: "Data Security", href: "/security" },
      ],
    },
  ];

  return (
    <footer className="bg-white border-t border-neutral-100 pt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Logo and Tagline (Col 1/2) */}
          <div className="col-span-2 md:col-span-2 space-y-4">
            {/* Logo */}
            <div className="flex items-center gap-2 text-neutral-900">
              <LogsIcon className="size-6 text-blue-600" />
              <span className="text-xl font-bold tracking-tight">TMS</span>
            </div>
            {/* Description/Tagline */}
            <p className="text-sm text-neutral-600 max-w-xs">
              The digital backbone for efficient transport and roadways management.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-neutral-400 hover:text-neutral-900 transition">
                <Twitter className="size-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-neutral-900 transition">
                <Linkedin className="size-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-neutral-900 transition">
                <Github className="size-5" />
              </a>
            </div>
          </div>

          {/* Navigation Columns (Col 3, 4, 5) */}
          {footerLinks.map((column, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-semibold text-neutral-900">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-600 hover:text-blue-600 transition"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright and Attribution Bar */}
        <div className="border-t border-neutral-100 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-neutral-500 mb-2">
          <p className="mb-2 md:mb-0">
            &copy; 2025 Transport Management System. All rights reserved.
          </p>
          
          <p>
            Built by{" "}
            <a 
              href="https://ac-portfolio-phi.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-medium text-neutral-700 hover:text-blue-600 transition"
            >
              Aryan Chheda
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;