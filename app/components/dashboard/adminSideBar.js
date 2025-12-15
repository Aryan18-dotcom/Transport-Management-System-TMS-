"use client"
import Link from 'next/link';
import { useState } from 'react'; // Import useState
import {
  LayoutDashboard,
  Truck,
  Users,
  Route,
  Wrench,
  FileText,
  DollarSign,
  Settings,
  LogOut,
  Menu, // Use Menu icon for mobile toggle
  X, // Use X icon for closing mobile menu
} from 'lucide-react';

const sidebarLinks = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { name: 'Vehicles', icon: Truck, href: '/vehicles' },
  { name: 'Drivers', icon: Users, href: '/drivers' },
  { name: 'Trips', icon: Route, href: '/trips' },
  { name: 'Maintenance', icon: Wrench, href: '/maintenance' },
  { name: 'Finance', icon: DollarSign, href: '/finance' },
  { name: 'Documents', icon: FileText, href: '/documents' },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile/desktop collapse
  const [showConfirm, setShowConfirm] = useState(false); // State for logout confirmation
  const activePath = '/dashboard'; // Mock active path for highlighting

  // --- Utility Component for Sidebar Content (Desktop/Mobile Shared) ---
  const NavContent = ({ onLinkClick }) => (
    <div className="flex flex-col h-full w-full">
      {/* Header/Logo (Mobile Close Button Added) */}
      <div className="flex items-center justify-between h-16 p-4 border-b border-gray-100">
        <Link href="/dashboard" className="flex items-center" onClick={onLinkClick}>
          <Truck className="w-6 h-6 text-blue-600 mr-2" />
          <span className="text-xl font-bold text-gray-900">TMS Admin</span>
        </Link>
        
        {/* Mobile Close Button */}
        <button 
          onClick={onLinkClick} 
          className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          aria-label="Close menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Links */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const isActive = link.href === activePath;
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={onLinkClick} // Close menu on navigation
              className={`flex items-center p-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'} mr-3`} />
              <span className="text-sm font-medium">
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer/Settings/Logout */}
      <div className="p-4 border-t border-gray-100">
        <Link
          href="/admin/settings"
          onClick={onLinkClick}
          className="flex items-center p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <Settings className="w-5 h-5 text-gray-500 mr-3" />
          <span className="text-sm font-medium">Settings</span>
        </Link>
        <button
          onClick={() => { 
            setShowConfirm(true);
          }}
          className="flex items-center w-full p-3 mt-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span className="text-sm font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
  // --- End Utility Component ---

  return (
    <>
      {/* 1. DESKTOP/TABLET Sidebar (Fixed width, provides padding for content) */}
      {/* The main fixed sidebar ensures content alignment on md/lg screens */}
      <div className="h-screen w-64 hidden md:block relative">
        {/* Fixed Content Container */}
        <div className="flex flex-col w-65 h-full fixed top-0 overflow-y-auto bg-white border-r border-gray-200 shadow-md transition-all duration-300">
          <NavContent onLinkClick={() => {}} /> {/* Desktop content, no closing action needed */}
        </div>
      </div>
      
      {/* 2. MOBILE HEADER (Visible on sm/xs screens) */}
      <div className='md:hidden flex items-center justify-between w-full h-20 px-4 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40'>
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center">
          <Truck className="w-6 h-6 text-blue-600 mr-2" />
          <span className="text-xl font-bold text-gray-900">TMS Admin</span>
        </Link>
        
        {/* Menu Toggle Button */}
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* 3. MOBILE OVERLAY (Visible only when isOpen is true) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)} 
            aria-hidden="true" 
          />

          {/* Sidebar Panel (Sliding effect from the left) */}
          <div className={`
            absolute top-0 left-0 h-full w-65 bg-white shadow-2xl transition-transform duration-300 ease-in-out
            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <NavContent onLinkClick={() => setIsOpen(false)} />
          </div>
        </div>
      )}
      
      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 -z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">Confirm Logout</h2>
            <p className="text-gray-600 mb-6 text-center">Are you sure you want to logout?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  window.location.href = '/userAuth/logout';
                }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Yes
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};