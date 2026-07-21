'use client';

import { usePathname } from 'next/navigation';
import { Search, Bell, Sun, Moon, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ROUTE_LABELS = {
    '/dashboard': 'Overview',
    '/dashboard/chat': 'AI Chat',
    '/dashboard/study-planner': 'Study Planner',
    '/dashboard/add-resource': 'Add Resource',
    '/dashboard/manage-resources': 'Manage Resources',
    '/explore': 'Explore',
    '/profile': 'Profile',
};

function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
}

export default function DashboardTopbar({ user }) {
    const pathname = usePathname();
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const currentTheme = theme === 'system' ? systemTheme : theme;
    const toggleTheme = () => setTheme(currentTheme === 'dark' ? 'light' : 'dark');

    const pathParts = pathname.split('/').filter(Boolean);
    const breadcrumbs = pathParts.map((part, i) => {
        const href = '/' + pathParts.slice(0, i + 1).join('/');
        return {
            label: ROUTE_LABELS[href] || part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
            href,
            isLast: i === pathParts.length - 1,
        };
    });

    return (
        <div className="sticky top-0 z-20 bg-white/60 dark:bg-gray-950/60 backdrop-blur-xl border-b border-gray-200/60 dark:border-white/5">
            <div className="flex items-center justify-between gap-4 px-6 md:px-8 h-16">
                {/* Left: Greeting + Breadcrumb */}
                <div className="min-w-0 flex-1">
                    <h1 className="text-base font-bold text-gray-900 dark:text-white truncate">
                        {getGreeting()}, <span className="text-gradient">{user?.name?.split(' ')[0] ?? 'there'}</span>
                    </h1>
                    <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                        {breadcrumbs.map((crumb, i) => (
                            <span key={crumb.href} className="flex items-center gap-1">
                                {i > 0 && <ChevronRight size={10} className="opacity-40" />}
                                <span className={crumb.isLast ? 'text-gray-600 dark:text-gray-300 font-medium' : ''}>
                                    {crumb.label}
                                </span>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Right: Search + Notifications + Theme + Avatar */}
                <div className="flex items-center gap-2">
                    {/* Search */}
                    <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100/60 dark:bg-white/[0.04] border border-gray-200/60 dark:border-white/5 text-gray-400 dark:text-gray-500 w-56 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-300 dark:focus-within:border-primary-500/30 focus-within:bg-white dark:focus-within:bg-white/[0.06] focus-within:shadow-sm">
                        <Search size={14} />
                        <input
                            type="text"
                            placeholder="Search resources..."
                            className="bg-transparent text-sm outline-none w-full text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                    </div>

                    {/* Notifications */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-white/5 transition-colors"
                    >
                        <Bell size={18} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full ring-2 ring-white dark:ring-gray-950" />
                    </motion.button>

                    {/* Theme toggle */}
                    {mounted ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-white/5 transition-colors"
                        >
                            {currentTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                        </motion.button>
                    ) : (
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center">
                            <span className="w-4 h-4 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
                        </div>
                    )}

                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-primary-500/20 cursor-pointer hover:shadow-lg hover:shadow-primary-500/30 transition-shadow duration-200">
                        {user?.name?.[0]?.toUpperCase() ?? 'U'}
                    </div>
                </div>
            </div>
        </div>
    );
}
