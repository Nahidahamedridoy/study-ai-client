'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import {
    LayoutDashboard, PlusCircle, BookOpen, User, LogOut,
    Menu, X, ChevronRight,
} from 'lucide-react';

const NAV_ITEMS = [
    { label: 'Dashboard',        href: '/dashboard',                  icon: LayoutDashboard },
    { label: 'Add Resource',     href: '/dashboard/add-resource',     icon: PlusCircle },
    { label: 'Manage Resources', href: '/dashboard/manage-resources', icon: BookOpen },
    { label: 'Profile',          href: '/profile',                    icon: User },
];

export default function DashboardSidebar({ user }) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut({ fetchOptions: { onSuccess: () => router.push('/login') } });
    };

    const NavLink = ({ item }) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
            <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
            >
                <Icon size={18} />
                {item.label}
                {active && <ChevronRight size={14} className="ml-auto opacity-70" />}
            </Link>
        );
    };

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="px-4 py-5 border-b border-gray-200 dark:border-gray-800">
                <Link href="/" className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                    StudyMate AI
                </Link>
                <p className="text-xs text-gray-400 mt-0.5">Dashboard</p>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {NAV_ITEMS.map(item => <NavLink key={item.href} item={item} />)}
            </nav>

            {/* User + Logout */}
            <div className="px-3 py-4 border-t border-gray-200 dark:border-gray-800">
                {user && (
                    <div className="flex items-center gap-3 px-4 py-3 mb-2 rounded-xl bg-gray-50 dark:bg-gray-800">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                            {user.name?.[0]?.toUpperCase() ?? 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                            <p className="text-xs text-gray-400 truncate">{user.email}</p>
                        </div>
                    </div>
                )}
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile top bar */}
            <div className="lg:hidden flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
                <Link href="/" className="text-lg font-extrabold text-blue-600 dark:text-blue-400">StudyMate AI</Link>
                <button
                    onClick={() => setOpen(!open)}
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile drawer overlay */}
            {open && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Mobile drawer */}
            <aside className={`
                lg:hidden fixed top-0 left-0 h-full w-72 z-50 bg-white dark:bg-gray-950
                border-r border-gray-200 dark:border-gray-800 shadow-xl
                transform transition-transform duration-300
                ${open ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <SidebarContent />
            </aside>

            {/* Desktop sidebar */}
            <aside className="hidden lg:flex flex-col w-64 xl:w-72 flex-shrink-0 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 sticky top-0 h-screen">
                <SidebarContent />
            </aside>
        </>
    );
}
