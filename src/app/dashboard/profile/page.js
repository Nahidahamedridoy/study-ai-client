'use client';

import { useState } from 'react';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import { motion } from 'framer-motion';
import {
    User, Mail, Shield, Calendar, BookOpen,
    MessageSquare, Brain, Edit3, Check, X,
    Camera, Star, Award, Zap
} from 'lucide-react';
import PageTransition from '@/components/dashboard/PageTransition';
import Skeleton from '@/components/ui/Skeleton';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats, fetchStudyPlans } from '@/services/resource.service';

function StatBadge({ icon: Icon, label, value, gradient, loading }) {
    return (
        <motion.div
            whileHover={{ y: -2, boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-2xl p-5 flex items-center gap-4 cursor-default"
        >
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                <Icon size={20} className="text-white" strokeWidth={2} />
            </div>
            <div>
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    {loading ? (
                        <span className="inline-block w-10 h-7 bg-gray-100 dark:bg-white/10 rounded-lg animate-pulse" />
                    ) : (
                        value ?? '—'
                    )}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
            </div>
        </motion.div>
    );
}

function InfoRow({ icon: Icon, label, value, loading }) {
    return (
        <div className="flex items-center gap-4 py-4 border-b border-gray-100 dark:border-white/5 last:border-0">
            <div className="w-9 h-9 rounded-xl bg-gray-50 dark:bg-white/[0.04] flex items-center justify-center flex-shrink-0 border border-gray-100 dark:border-white/5">
                <Icon size={16} className="text-gray-400 dark:text-gray-500" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-0.5">{label}</p>
                {loading ? (
                    <Skeleton className="h-4 w-48" />
                ) : (
                    <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{value || '—'}</p>
                )}
            </div>
        </div>
    );
}

export default function ProfilePage() {
    const { session, isPending } = useAuthGuard();
    const user = session?.user;

    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: fetchDashboardStats,
        enabled: !!session,
    });

    const { data: studyPlans, isLoading: plansLoading } = useQuery({
        queryKey: ['study-plans-profile'],
        queryFn: () => fetchStudyPlans({ limit: 100 }),
        enabled: !!session,
    });

    const plans = Array.isArray(studyPlans) ? studyPlans : [];
    const joinedDate = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : null;

    const initials = user?.name
        ? user.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
        : 'U';

    const loading = isPending || !session;

    return (
        <PageTransition>
            <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6">

                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        My <span className="text-gradient">Profile</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                        View your account details and learning statistics.
                    </p>
                </motion.div>

                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden"
                >
                    {/* Cover gradient */}
                    <div className="h-28 bg-gradient-to-br from-primary-500 via-accent-500 to-secondary-500 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.15)_0%,_transparent_60%)]" />
                        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5 blur-2xl" />
                        <div className="absolute -top-4 right-12 w-24 h-24 rounded-full bg-white/10 blur-xl" />
                    </div>

                    <div className="px-6 pb-6">
                        {/* Avatar */}
                        <div className="flex items-end justify-between -mt-10 mb-4">
                            <div className="relative">
                                {loading ? (
                                    <Skeleton className="w-20 h-20 rounded-2xl" />
                                ) : (
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-2xl font-extrabold shadow-xl shadow-primary-500/30 border-4 border-white dark:border-gray-950 ring-1 ring-primary-200 dark:ring-primary-500/30 select-none">
                                        {initials}
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-2 pb-1">
                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Active
                                </div>
                            </div>
                        </div>

                        {/* Name & email */}
                        {loading ? (
                            <div className="space-y-2 mb-5">
                                <Skeleton className="h-7 w-48" />
                                <Skeleton className="h-4 w-64" />
                            </div>
                        ) : (
                            <div className="mb-5">
                                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                    {user?.name || 'Unknown User'}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{user?.email}</p>
                            </div>
                        )}

                        {/* Info rows */}
                        <div className="rounded-xl bg-gray-50/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5 px-4 divide-y divide-gray-100 dark:divide-white/5">
                            <InfoRow icon={User}     label="Full Name"   value={user?.name}     loading={loading} />
                            <InfoRow icon={Mail}     label="Email"       value={user?.email}    loading={loading} />
                            <InfoRow icon={Shield}   label="Role"        value={user?.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1)) : 'Member'} loading={loading} />
                            <InfoRow icon={Calendar} label="Joined"      value={joinedDate}     loading={loading} />
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <Zap size={14} className="text-amber-500" />
                        Learning Statistics
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <StatBadge
                            icon={BookOpen}
                            label="Total Resources"
                            value={stats?.totalResources}
                            gradient="from-blue-500 to-blue-600"
                            loading={statsLoading}
                        />
                        <StatBadge
                            icon={MessageSquare}
                            label="AI Chats"
                            value={stats?.totalAIChats}
                            gradient="from-accent-500 to-cyan-500"
                            loading={statsLoading}
                        />
                        <StatBadge
                            icon={Brain}
                            label="Study Plans"
                            value={plans.length}
                            gradient="from-amber-500 to-orange-500"
                            loading={plansLoading}
                        />
                    </div>
                </motion.div>

                {/* Achievement badges */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-2xl p-5"
                >
                    <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                        <Award size={14} className="text-violet-500" />
                        Achievements
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: 'Early Adopter',   color: 'bg-violet-50 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200/60 dark:border-violet-500/20' },
                            { label: 'Resource Creator', color: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200/60 dark:border-blue-500/20' },
                            { label: 'AI Explorer',     color: 'bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-200/60 dark:border-cyan-500/20' },
                            { label: 'Study Planner',   color: 'bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-500/20' },
                        ].map(({ label, color }) => (
                            <span
                                key={label}
                                className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${color}`}
                            >
                                <Star size={11} className="opacity-70" />
                                {label}
                            </span>
                        ))}
                    </div>
                </motion.div>

            </div>
        </PageTransition>
    );
}
