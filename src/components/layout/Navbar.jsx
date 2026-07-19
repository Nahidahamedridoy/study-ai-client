'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient, useSession } from '@/lib/auth-client';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BrainCircuit, LogOut, ChevronDown } from 'lucide-react';

const publicNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'Explore', href: '/explore' },
  { name: 'About', href: '/about' },
];

const privateNavLinks = [
  ...publicNavLinks,
  { name: 'Dashboard', href: '/dashboard' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const { data: session, isPending } = useSession();

  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
        },
      },
    });
  };

  const navLinks = session ? privateNavLinks : publicNavLinks;

  return (
    <nav className="sticky top-0 z-50 w-full glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex flex-shrink-0 items-center gap-2 group">
              <BrainCircuit className="text-primary-600 transition-transform group-hover:rotate-12 duration-300" size={28} />
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">StudyMate <span className="text-gradient">AI</span></span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-primary-50 dark:bg-primary-900/20 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            
            <div className="flex items-center pl-6 ml-2 border-l border-gray-200 dark:border-gray-800">
                {isPending ? (
                  <div className="w-24 h-9 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl"></div>
                ) : session ? (
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-gray-600 hover:text-rose-600 dark:text-gray-300 dark:hover:text-rose-400 px-3"
                  >
                    <LogOut size={16} />
                    Logout
                  </Button>
                ) : (
                  <div className="flex items-center space-x-3">
                    <Link href="/login">
                        <Button variant="ghost">Sign In</Button>
                    </Link>
                    <Link href="/register">
                        <Button variant="primary">Get Started</Button>
                    </Link>
                  </div>
                )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden glass overflow-hidden border-t border-gray-200/50 dark:border-gray-800/50 absolute w-full"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                        : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-900/50'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              })}
              
              <div className="pt-6 mt-6 border-t border-gray-200/50 dark:border-gray-800/50">
                {!isPending && session ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-base font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-900/20 transition-colors"
                  >
                    <LogOut size={20} />
                    Logout
                  </button>
                ) : !isPending ? (
                  <div className="flex flex-col gap-3">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start py-3">Sign In</Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                        <Button variant="primary" className="w-full justify-center py-3">Get Started</Button>
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
