'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient, useSession } from '@/lib/auth-client';
import Button from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BrainCircuit } from 'lucide-react';
import UserDropdown from './UserDropdown';
import ThemeToggle from '@/components/ui/ThemeToggle';

const publicNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'Explore', href: '/explore' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

const privateNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'Explore', href: '/explore' },
  { name: 'Study Planner', href: '/dashboard/study-planner' },
  { name: 'AI Chat', href: '/dashboard/chat' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const { data: session, isPending } = useSession();

  const navLinks = session ? privateNavLinks : publicNavLinks;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'bg-white/85 dark:bg-gray-950/85 backdrop-blur-md shadow-lg shadow-gray-200/20 dark:shadow-black/20 border-b border-gray-200/50 dark:border-gray-800/50' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex flex-shrink-0 items-center gap-2 group">
              <BrainCircuit className="text-primary-600 transition-transform group-hover:rotate-12 duration-300" size={28} />
              <span className="text-xl text-purple-500 font-bold tracking-tight text-gray-900 dark:text-white">StudyMate <span className="text-gradient">AI</span></span>
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
                      ? 'text-primary-600 dark:text-primary-400 font-semibold'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-50/50 dark:hover:bg-gray-800/50'
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
            
            <div className="flex items-center pl-4 ml-2 border-l border-gray-200 dark:border-gray-800 gap-3">
                <ThemeToggle />
                {isPending ? (
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-full"></div>
                ) : session ? (
                  <UserDropdown session={session} />
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

          {/* Mobile right section */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            {isPending ? (
              <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-full"></div>
            ) : session ? (
              <UserDropdown session={session} />
            ) : null}
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
            className="md:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl overflow-hidden border-t border-gray-200/50 dark:border-gray-800/50 absolute w-full shadow-2xl"
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
              
              {!isPending && !session && (
                <div className="pt-6 mt-6 border-t border-gray-200/50 dark:border-gray-800/50">
                  <div className="flex flex-col gap-3">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start py-3">Sign In</Button>
                    </Link>
                    <Link href="/register" onClick={() => setIsOpen(false)}>
                        <Button variant="primary" className="w-full justify-center py-3">Get Started</Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
