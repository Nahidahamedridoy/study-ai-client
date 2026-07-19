'use client';

import { useSession, authClient } from '@/lib/auth-client';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { fetchMyResources } from '@/services/resource.service';
import { formatDate } from '@/utils/formatters';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import {
    Mail, Calendar, ShieldCheck, LogOut,
    Edit3, LayoutDashboard, BookOpen, AlertCircle
} from 'lucide-react';

const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 24 } },
};

export default function ProfilePage() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const { data: myResources, isLoading: loadingResources } = useQuery({
        queryKey: ['myResources-count', session?.user?.email],
        queryFn: () => fetchMyResources({ email: session.user.email, limit: 1 }),
        enabled: !!session?.user?.email,
    });

    const handleLogout = async () => {
        try {
            await authClient.signOut();
            router.push('/login');
        } catch {
            toast.error('Logout failed. Please try again.');
        }
    };

    /* ── Loading ── */
    if (isPending) {
        return (
            <div className="max-w-2xl mx-auto py-16 px-4 space-y-6 animate-pulse">
                <div className="flex flex-col items-center gap-4">
                    <Skeleton className="w-28 h-28 rounded-full" />
                    <Skeleton className="h-6 w-40 rounded-xl" />
                    <Skeleton className="h-4 w-56 rounded-lg" />
                </div>
                <Skeleton className="h-48 w-full rounded-2xl" />
            </div>
        );
    }

    /* ── Not signed in ── */
    if (!session) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-5 text-center px-4">
                <div className="w-20 h-20 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center">
                    <AlertCircle size={36} className="text-rose-500" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Not signed in</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Please sign in to view your profile.</p>
                </div>
                <Link href="/login"><Button variant="primary">Go to Login</Button></Link>
            </div>
        );
    }

    const { user } = session;
    const initials = user.name
        ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
        : (user.email ?? 'SM').substring(0, 2).toUpperCase();
    const totalResources = myResources?.totalResources ?? 0;

    return (
        <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
            <motion.div
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.1 } } }}
                className="space-y-6"
            >
                {/* ── Avatar + name ── */}
                <motion.div variants={item} className="flex flex-col items-center text-center gap-4">
                    {/* Avatar */}
                    <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-3xl font-black border-4 border-white dark:border-gray-900 shadow-2xl shadow-primary-500/20 overflow-hidden">
                        {user.image ? (
                            <Image src={user.image} alt={user.name ?? 'avatar'} fill className="object-cover" />
                        ) : initials}
                    </div>

                    <div>
                        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                            {user.name || 'Anonymous User'}
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{user.email}</p>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
                        <Button
                            variant="primary"
                            onClick={() => toast('Edit Profile coming soon!', { icon: '✏️' })}
                        >
                            <Edit3 size={15} className="mr-2" />
                            Edit Profile
                        </Button>
                        <Link href="/dashboard">
                            <Button variant="secondary">
                                <LayoutDashboard size={15} className="mr-2" />
                                Dashboard
                            </Button>
                        </Link>
                        <Button
                            variant="ghost"
                            onClick={handleLogout}
                            className="text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/30 border border-rose-100 dark:border-rose-900/30"
                        >
                            <LogOut size={15} className="mr-2" />
                            Log Out
                        </Button>
                    </div>
                </motion.div>

                {/* ── Info card ── */}
                <motion.div variants={item}>
                    <Card variant="default" className="divide-y divide-gray-100 dark:divide-white/5 border-gray-200/60 dark:border-white/[0.07] shadow-md shadow-gray-200/20 dark:shadow-none">

                        <div className="flex items-center gap-4 px-6 py-4">
                            <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                                <Mail size={16} className="text-gray-500 dark:text-gray-400" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">Email</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-6 py-4">
                            <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                                <Calendar size={16} className="text-gray-500 dark:text-gray-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">Joined</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    {user.createdAt ? formatDate(user.createdAt) : '—'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-6 py-4">
                            <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center flex-shrink-0">
                                <ShieldCheck size={16} className="text-emerald-500" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">Account Status</p>
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 px-2.5 py-1 rounded-lg uppercase tracking-wider">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Active
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 px-6 py-4">
                            <div className="w-9 h-9 rounded-xl bg-primary-50 dark:bg-primary-900/20 flex items-center justify-center flex-shrink-0">
                                <BookOpen size={16} className="text-primary-600 dark:text-primary-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">Resources Created</p>
                                {loadingResources ? (
                                    <Skeleton className="h-5 w-8 rounded" />
                                ) : (
                                    <motion.p
                                        initial={{ opacity: 0, scale: 0.7 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3, type: 'spring', bounce: 0.4 }}
                                        className="text-sm font-bold text-primary-700 dark:text-primary-300"
                                    >
                                        {totalResources} resource{totalResources !== 1 ? 's' : ''}
                                    </motion.p>
                                )}
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* ── Quick links ── */}
                <motion.div variants={item} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Link href="/dashboard/manage-resources" className="group block">
                        <Card variant="glass" className="p-4 hover:border-primary-300 dark:hover:border-primary-500/40 transition-all duration-200 hover:shadow-md hover:shadow-primary-500/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-primary-500/20">
                                    <BookOpen size={18} className="text-white" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">My Resources</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Manage what you've shared</p>
                                </div>
                                <span className="ml-auto text-gray-400 group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all">→</span>
                            </div>
                        </Card>
                    </Link>

                    <Link href="/explore" className="group block">
                        <Card variant="glass" className="p-4 hover:border-accent-300 dark:hover:border-accent-500/40 transition-all duration-200 hover:shadow-md hover:shadow-accent-500/5">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-500 to-primary-500 flex items-center justify-center flex-shrink-0 shadow-md shadow-accent-500/20">
                                    <LayoutDashboard size={18} className="text-white" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">Explore Resources</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Discover study material</p>
                                </div>
                                <span className="ml-auto text-gray-400 group-hover:text-accent-500 group-hover:translate-x-0.5 transition-all">→</span>
                            </div>
                        </Card>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
