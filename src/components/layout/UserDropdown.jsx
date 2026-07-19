'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { authClient } from '@/lib/auth-client';
import { useRouter, usePathname } from 'next/navigation';
import {
  User,
  LayoutDashboard,
  FilePlus,
  Library,
  Bot,
  Calendar,
  Settings,
  LogOut
} from 'lucide-react';

export default function UserDropdown({ session }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();

  const user = session?.user;
  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    : user?.email?.substring(0, 2).toUpperCase() || 'U';

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
        },
      },
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuItems = [
    { label: 'My Profile', href: '/profile', icon: User },
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Add Resource', href: '/resources/add', icon: FilePlus },
    { label: 'Manage Resources', href: '/resources', icon: Library },
    { label: 'AI Chat', href: '/chat', icon: Bot },
    { label: 'Study Planner', href: '/study-planner', icon: Calendar },
    { label: 'Settings', href: '#', icon: Settings, isPlaceholder: true },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 hover:ring-2 hover:ring-primary-500 hover:ring-offset-2 dark:hover:ring-offset-gray-900 transition-all focus:outline-none overflow-hidden"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        {user?.image ? (
          <img
            src={user.image}
            alt={user?.name || 'User'}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-sm font-semibold">{initials}</span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50 flex flex-col"
          >
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-bold text-gray-900 dark:text-white truncate">
                {user?.name || 'User'}
              </p>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300 truncate mt-0.5">
                {user?.email}
              </p>
            </div>

            <div className="p-2 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                       if (item.isPlaceholder) {
                          e.preventDefault();
                       } else {
                          setIsOpen(false);
                       }
                    }}
                    className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-colors ${
                      isActive 
                        ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 font-semibold' 
                        : 'text-gray-800 dark:text-gray-100 font-medium hover:bg-gray-100 dark:hover:bg-gray-800'
                    } ${item.isPlaceholder ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="p-2 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="flex w-full items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
