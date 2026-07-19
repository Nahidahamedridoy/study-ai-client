'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import {
    BrainCircuit, LayoutDashboard, PlusCircle, BookOpen, User, LogOut,
    Menu, X, ChevronLeft, ChevronRight, Compass, MessageSquare, CalendarDays
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const NAV_ITEMS = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'AI Chat', href: '/dashboard/chat', icon: MessageSquare },
    { label: 'Study Planner', href: '/dashboard/study-planner', icon: CalendarDays },
    { label: 'Add Resource', href: '/dashboard/add-resource', icon: PlusCircle },
    { label: 'Manage Resources', href: '/dashboard/manage-resources', icon: BookOpen },
    { label: 'Explore', href: '/explore', icon: Compass },
    { label: 'Profile', href: '/profile', icon: User },
];

export default function DashboardSidebar({ user }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = useCallback(async () => {
        await authClient.signOut({ fetchOptions: { onSuccess: () => router.push('/login') } });
    }, [router]);

    const NavLink = ({ item }) => {
        const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
        const Icon = item.icon;
        return (
            <Link
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 group ${
                    collapsed ? 'justify-center' : ''
                } ${
                    active
                        ? 'text-primary-700 dark:text-primary-300'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100/60 dark:hover:bg-white/5'
                }`}
            >
                {active && (
                    <motion.div
                        layoutId="sidebar-active"
                        className="absolute inset-0 bg-primary-50 dark:bg-primary-500/10 border border-primary-200/60 dark:border-primary-400/20 rounded-xl"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                )}
                <Icon size={18} className="relative z-10 flex-shrink-0" strokeWidth={active ? 2.2 : 1.8} />
                {!collapsed && <span className="relative z-10">{item.label}</span>}
                {active && !collapsed && (
                    <ChevronRight size={12} className="ml-auto relative z-10 opacity-40" />
                )}
                {collapsed && (
                    <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-gray-900 dark:bg-gray-700 text-white text-xs font-medium opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-xl">
                        {item.label}
                    </div>
                )}
            </Link>
        );
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className={`px-4 py-5 flex items-center ${collapsed ? 'justify-center' : 'gap-2.5'}`}>
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25 group-hover:shadow-primary-500/40 transition-shadow duration-300">
                        <BrainCircuit className="text-white" size={20} />
                    </div>
                    {!collapsed && (
                        <div>
                            <span className="text-[15px] font-extrabold tracking-tight text-gray-900 dark:text-white">
                                StudyMate
                            </span>
                            <span className="text-[15px] font-extrabold tracking-tight text-gradient ml-1">AI</span>
                        </div>
                    )}
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
                <div className={`${collapsed ? '' : 'px-1'} mb-2`}>
                    {!collapsed && (
                        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2 px-3">
                            Navigation
                        </p>
                    )}
                </div>
                {NAV_ITEMS.map(item => (
                    <NavLink key={item.href} item={item} />
                ))}
            </nav>

            {/* Collapse toggle */}
            <div className="px-3 py-2 hidden lg:block">
                <button
                    onClick={() => setCollapsed(c => !c)}
                    className="flex items-center justify-center w-full py-2 rounded-xl text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100/60 dark:hover:bg-white/5 transition-colors"
                >
                    {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>
            </div>

            {/* User + Logout */}
            <div className={`px-3 py-4 border-t border-gray-100/80 dark:border-white/5 ${collapsed ? 'px-2' : ''}`}>
                {user && (
                    <div className={`flex items-center gap-3 px-3 py-3 mb-2 rounded-xl bg-gray-50/80 dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 ${collapsed ? 'justify-center px-2' : ''}`}>
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md shadow-primary-500/20">
                            {user.name?.[0]?.toUpperCase() ?? 'U'}
                        </div>
                        {!collapsed && (
                            <div className="overflow-hidden min-w-0">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                                <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{user.email}</p>
                            </div>
                        )}
                    </div>
                )}
                <button
                    onClick={handleLogout}
                    className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-[13px] font-medium text-gray-500 dark:text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all duration-200 ${collapsed ? 'justify-center' : ''}`}
                >
                    <LogOut size={18} />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile top bar */}
            <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white/70 dark:bg-gray-950/70 backdrop-blur-xl border-b border-gray-200/60 dark:border-white/5 sticky top-0 z-30">
                <Link href="/" className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-md shadow-primary-500/20">
                        <BrainCircuit className="text-white" size={18} />
                    </div>
                    <span className="text-[15px] font-extrabold text-gray-900 dark:text-white tracking-tight">
                        StudyMate <span className="text-gradient">AI</span>
                    </span>
                </Link>
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                >
                    {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        onClick={() => setMobileOpen(false)}
                    />
                )}
            </AnimatePresence>

            {/* Mobile drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.aside
                        initial={{ x: -288 }}
                        animate={{ x: 0 }}
                        exit={{ x: -288 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="lg:hidden fixed top-0 left-0 h-full w-72 z-50 bg-white/90 dark:bg-gray-950/90 backdrop-blur-2xl border-r border-gray-200/60 dark:border-white/5 shadow-2xl"
                    >
                        <SidebarContent />
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Desktop sidebar */}
            <aside
                className={`hidden lg:flex flex-col flex-shrink-0 bg-white/60 dark:bg-gray-950/60 backdrop-blur-xl border-r border-gray-200/60 dark:border-white/5 sticky top-0 h-screen sidebar-transition ${
                    collapsed ? 'w-[68px]' : 'w-64'
                }`}
            >
                <SidebarContent />
            </aside>
        </>
    );
}
