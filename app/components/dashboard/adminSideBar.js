"use client"
import Link from 'next/link';
import { useState } from 'react'; // Import useState
import { usePathname } from 'next/navigation'; // Import usePathname
import { motion, AnimatePresence } from 'motion/react'; // Import motion for animations
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
  Users2, // Use X icon for closing mobile menu
} from 'lucide-react';

const mainSidebarLinks = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { name: 'Vehicles', icon: Truck, href: '/admin/vehicles' },
  { name: 'Drivers', icon: Users, href: '/admin/drivers' },
  { name: 'Trips', icon: Route, href: '/admin/trips' },
  { name: 'Maintenance', icon: Wrench, href: '/admin/maintenance' },
  { name: 'Finance', icon: DollarSign, href: '/admin/finance' },
  { name: 'Documents', icon: FileText, href: '/admin/documents' },
  { name: 'Create Employee', icon: Users2, href: '/admin/createEmployee' },
];

const bottomSidebarLinks = [
  { name: 'Settings', icon: Settings, href: '/admin/settings' },
];

export const Sidebar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(false); // State for mobile/desktop collapse
  const [showConfirm, setShowConfirm] = useState(false); // State for logout confirmation
  const pathname = usePathname(); // Get current pathname

  const NavContent = ({ onLinkClick }) => {
    const renderNavLink = (link, index) => {
      const isActive = link.href === pathname;
      const Icon = link.icon;
      
      return (
        <motion.div
          key={link.name}
          className="relative"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 0.3, 
            delay: index * 0.05,
            ease: "easeOut"
          }}
        >
          {isActive && (
            <motion.div
              layoutId="sidebar-active"
              className="absolute inset-0 bg-blue-500 rounded-lg shadow-md"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <Link
            href={link.href}
            onClick={onLinkClick}
            className={`flex items-center p-3 rounded-lg transition-colors relative z-10 ${
              isActive
                ? 'text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500'} mr-3`} />
            <span className="text-sm font-medium">
              {link.name}
            </span>
          </Link>
        </motion.div>
      );
    };

    return (
      <div className="flex flex-col h-screen w-full">
        {/* Header/Logo */}
        <motion.div 
          className="flex items-center h-16 p-4 border-b border-gray-100"
          layoutId="sidebar-logo"
        >
          <Link href="/admin/dashboard" className="flex items-center" onClick={onLinkClick}>
            <Truck className="w-6 h-6 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">TMS Admin</span>
          </Link>
        </motion.div>

        {/* Main Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto relative">
          {mainSidebarLinks.map((link, index) => renderNavLink(link, index))}
        </nav>

        {/* Divider */}
        <motion.div 
          className="mx-4 border-t border-gray-200"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        ></motion.div>

        {/* Bottom Section - Settings and Logout */}
        <div className="p-4 space-y-1">
          {bottomSidebarLinks.map((link, index) => renderNavLink(link, mainSidebarLinks.length + index))}
          
          <motion.button
            onClick={() => {
              setShowConfirm(true);
            }}
            className="flex items-center w-full p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.3, 
              delay: mainSidebarLinks.length * 0.05 + bottomSidebarLinks.length * 0.05 + 0.1
            }}
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">Log Out</span>
          </motion.button>
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Navbar - Only visible on mobile */}
      <motion.div 
        className='lg:hidden flex items-center justify-between w-full h-16 px-4 bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40'
      >
        {/* Logo */}
        <Link href="/admin/dashboard" className="flex items-center">
          <Truck className="w-6 h-6 text-blue-600 mr-2" />
          <span className="text-xl font-bold text-gray-900">TMS</span>
        </Link>

        {/* Menu Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(true)}
          className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg cursor-pointer"
          aria-label="Open menu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Menu className="w-6 h-6" />
        </motion.button>
      </motion.div>

      {/* Desktop Sidebar - Only visible on md and up */}
      <div className='hidden lg:flex md:flex-col md:h-screen md:w-64 bg-white border-r border-gray-200 shadow-md flex-shrink-0 sticky inset-0'>
        <NavContent onLinkClick={() => {}} />
      </div>

      {/* Mobile Overlay Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Sidebar Panel */}
            <motion.div
              className="absolute top-0 left-0 h-screen w-64 bg-white shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30,
                mass: 0.8,
              }}
            >
              <NavContent onLinkClick={() => setIsOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Logout Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 text-center">Confirm Logout</h2>
            <p className="text-gray-600 mb-6 text-center">Are you sure you want to logout?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  window.location.href = '/login';
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