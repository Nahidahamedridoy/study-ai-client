'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats, fetchMyResources } from '@/services/resource.service';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import { formatDate } from '@/utils/formatters';
import { BookOpen, Eye, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';

function StatCard({ label, value, icon: Icon, color, loading }) {
    if (loading) return <Skeleton className="h-32 w-full rounded-2xl" />;
    return (
        <Card className="p-6 flex items-center gap-5">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${color}`}>
                <Icon size={24} className="text-white" />
            </div>
            <div>
                <p className="text-3xl font-extrabold text-gray-900 dark:text-white">{value ?? '—'}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
            </div>
        </Card>
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
        { label: 'Total Resources',   value: stats?.totalResources,  icon: BookOpen,    color: 'bg-blue-600' },
        { label: 'Total Views',       value: stats?.totalViews,      icon: Eye,         color: 'bg-emerald-500' },
        { label: 'Saved by Others',   value: stats?.savedCount,      icon: Star,        color: 'bg-amber-500' },
        { label: 'This Month Added',  value: stats?.monthlyAdded,    icon: TrendingUp,  color: 'bg-violet-500' },
    ];

    return (
        <div className="p-6 md:p-8 space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                    Welcome back, {session?.user?.name?.split(' ')[0] ?? 'there'} 👋
                </h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
                    Here's an overview of your study resources and activity.
                </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
                {statCards.map(s => (
                    <StatCard key={s.label} {...s} loading={statsLoading} />
                ))}
            </div>

            {/* Recent Resources table */}
            <Card className="overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">My Recent Resources</h2>
                    <Link href="/dashboard/manage-resources" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                        View all
                    </Link>
                </div>

                {resLoading ? (
                    <div className="p-6 space-y-3">
                        {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-12 w-full rounded-xl" />)}
                    </div>
                ) : !myResources.length ? (
                    <div className="py-16 text-center text-gray-500 dark:text-gray-400">
                        <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
                        <p className="font-medium">No resources yet</p>
                        <Link href="/dashboard/add-resource" className="text-sm text-blue-600 hover:underline dark:text-blue-400 mt-1 inline-block">
                            Add your first resource →
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                        {myResources.map(res => (
                            <div key={res._id} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                                <div className="min-w-0">
                                    <p className="font-semibold text-gray-900 dark:text-white truncate">{res.title}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{res.category} · {formatDate(res.createdAt)}</p>
                                </div>
                                <span className={`ml-4 flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${
                                    res.level === 'Advanced' ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400' :
                                    res.level === 'Intermediate' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                                    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                                }`}>
                                    {res.level}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </Card>
        </div>
    );
}
