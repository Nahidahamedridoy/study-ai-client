'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient, useSession } from '@/lib/auth-client';
import { Button } from '@heroui/react';

const publicNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'Explore', href: '/explore' },
  { name: 'About', href: '/about' },
];

const publicAuthLinks = [
  { name: 'Login', href: '/login' },
  { name: 'Register', href: '/register' },
];

const privateNavLinks = [
  { name: 'Home', href: '/' },
  { name: 'Explore', href: '/explore' },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Add Resource', href: '/resources/add' },
  { name: 'Manage Resources', href: '/resources/manage' },
  { name: 'AI Chat', href: '/chat' },
  { name: 'Study Planner', href: '/planner' },
  { name: 'Profile', href: '/profile' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  // session structure prepared with Better Auth
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

  const NavItem = ({ name, href }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
          isActive
            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
            : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-blue-400'
        }`}
        onClick={() => setIsOpen(false)}
      >
        {name}
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-gray-950/80 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">StudyMate AI</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30'
                    : 'text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {isPending ? (
              <div className="w-20 h-8 ml-4 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-md"></div>
            ) : session ? (
              <Button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                Logout
              </Button>
            ) : (
              <div className="flex items-center space-x-2 ml-4 border-l border-gray-200 dark:border-gray-800 pl-4">
                {publicAuthLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      link.name === 'Register'
                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <NavItem key={link.name} name={link.name} href={link.href} />
            ))}
            
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
              {!isPending && session ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 transition-colors"
                >
                  Logout
                </button>
              ) : !isPending ? (
                <div className="flex flex-col space-y-2 mt-2">
                  {publicAuthLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                        link.name === 'Register'
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'text-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-800'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
