'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats, fetchMyResources } from '@/services/resource.service';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import Skeleton from '@/components/ui/Skeleton';
import { formatDate } from '@/utils/formatters';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Eye, Star, TrendingUp, ArrowRight } from 'lucide-react';

import StatCards from '@/components/dashboard/StatCards';
import { WeeklyActivityChart, ResourceCategoriesChart, LearningProgressChart } from '@/components/dashboard/DashboardCharts';
import ActivityTimeline from '@/components/dashboard/ActivityTimeline';
import QuickActions from '@/components/dashboard/QuickActions';
import PageTransition from '@/components/dashboard/PageTransition';
import AnimatedCounter from '@/components/dashboard/AnimatedCounter';

const LEVEL_COLORS = {
    Beginner: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-500/20',
    Intermediate: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200/50 dark:border-blue-500/20',
    Advanced: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 border border-rose-200/50 dark:border-rose-500/20',
};

function DashboardStatCard({ label, value, icon: Icon, gradient, loading }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-2xl p-5 overflow-hidden relative group cursor-default"
        >
            {/* Subtle glow */}
            <div className={`absolute -top-14 -right-14 w-28 h-28 rounded-full bg-gradient-to-br ${gradient} opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500 blur-2xl`} />

            <div className="relative">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg mb-4`}>
                    <Icon size={20} className="text-white" strokeWidth={2} />
                </div>
                <p className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                    {loading ? (
                        <span className="inline-block w-14 h-8 bg-gray-100 dark:bg-white/10 rounded-lg animate-pulse" />
                    ) : (
                        <AnimatedCounter value={value ?? 0} />
                    )}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
            </div>
        </motion.div>
    );
}

export default function DashboardPage() {
    const { session } = useAuthGuard();

    const { data: stats, isLoading: statsLoading } = useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: fetchDashboardStats,
        enabled: !!session,
    });

    const { data: myResData, isLoading: resLoading } = useQuery({
        queryKey: ['my-resources', 1],
        queryFn: () => fetchMyResources({ page: 1, limit: 5 }),
        enabled: !!session,
    });

    const myResources = myResData?.resources ?? myResData ?? [];

    const statCards = [
        { label: 'Total Resources', value: stats?.totalResources, icon: BookOpen, gradient: 'from-blue-500 to-blue-600' },
        { label: 'Total Views', value: stats?.totalViews, icon: Eye, gradient: 'from-emerald-500 to-teal-500' },
        { label: 'Saved by Others', value: stats?.savedCount, icon: Star, gradient: 'from-violet-500 to-purple-500' },
        { label: 'This Month', value: stats?.monthlyAdded, icon: TrendingUp, gradient: 'from-amber-500 to-orange-500' },
    ];

    return (
        <PageTransition>
            <div className="p-6 md:p-8 space-y-6 max-w-[1400px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Welcome back, <span className="text-gradient">{session?.user?.name?.split(' ')[0] ?? 'there'}</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                        Here's an overview of your study resources and activity.
                    </p>
                </motion.div>

                {/* Quick Actions */}
                <QuickActions />

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    {statCards.map((s, i) => (
                        <DashboardStatCard key={s.label} {...s} loading={statsLoading} />
                    ))}
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <WeeklyActivityChart />
                    <ResourceCategoriesChart />
                    <LearningProgressChart />
                </div>

                {/* Bottom Row: Recent Resources + Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Recent Resources */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="lg:col-span-2 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-2xl overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100/80 dark:border-white/5">
                            <div>
                                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Recent Resources</h3>
                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Your latest uploads</p>
                            </div>
                            <Link
                                href="/dashboard/manage-resources"
                                className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 flex items-center gap-1 transition-colors"
                            >
                                View all <ArrowRight size={12} />
                            </Link>
                        </div>

                        {resLoading ? (
                            <div className="p-5 space-y-3">
                                {[...Array(4)].map((_, i) => (
                                    <Skeleton key={i} className="h-14 w-full rounded-xl" />
                                ))}
                            </div>
                        ) : !myResources.length ? (
                            <div className="py-16 text-center text-gray-500 dark:text-gray-400">
                                <BookOpen size={40} className="mx-auto mb-3 opacity-20" />
                                <p className="font-medium text-sm">No resources yet</p>
                                <Link
                                    href="/dashboard/add-resource"
                                    className="text-xs text-primary-600 dark:text-primary-400 hover:underline mt-1 inline-block"
                                >
                                    Add your first resource
                                </Link>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100/80 dark:divide-white/5">
                                {myResources.map((res, index) => (
                                    <motion.div
                                        key={res._id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        className="flex items-center justify-between px-5 py-3.5 hover:bg-gray-50/80 dark:hover:bg-white/[0.02] transition-colors group"
                                    >
                                        <div className="min-w-0 flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-500/10 to-accent-500/10 dark:from-primary-500/20 dark:to-accent-500/20 flex items-center justify-center flex-shrink-0">
                                                <BookOpen size={16} className="text-primary-500 dark:text-primary-400" />
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-[13px] font-semibold text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                                    {res.title}
                                                </p>
                                                <p className="text-[11px] text-gray-400 dark:text-gray-500">
                                                    {res.category} · {formatDate(res.createdAt)}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`ml-4 flex-shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-full ${LEVEL_COLORS[res.level] ?? LEVEL_COLORS.Beginner}`}>
                                            {res.level}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Activity Timeline */}
                    <ActivityTimeline />
                </div>
            </div>
        </PageTransition>
    );
}
