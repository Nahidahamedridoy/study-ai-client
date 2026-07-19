'use client';

import { useAuthGuard } from '@/hooks/useAuthGuard';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardTopbar from '@/components/dashboard/DashboardTopbar';
import Skeleton from '@/components/ui/Skeleton';

export default function DashboardShell({ children }) {
    const { session, isPending } = useAuthGuard();

    if (isPending) {
        return (
            <div className="flex h-screen bg-background">
                <div className="hidden lg:flex flex-col w-[68px] bg-white/60 dark:bg-gray-950/60 backdrop-blur-xl border-r border-gray-200/60 dark:border-white/5 p-3 gap-3">
                    <Skeleton className="h-9 w-9 rounded-xl mx-auto" />
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-9 w-9 rounded-xl mx-auto" />)}
                    <div className="mt-auto"><Skeleton className="h-9 w-9 rounded-xl mx-auto" /></div>
                </div>
                <main className="flex-1 overflow-y-auto">
                    <div className="h-16 border-b border-gray-200/60 dark:border-white/5 bg-white/60 dark:bg-gray-950/60 backdrop-blur-xl" />
                    <div className="p-6 md:p-8 space-y-6">
                        <Skeleton className="h-8 w-48" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-[140px] w-full rounded-2xl" />)}
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-72 w-full rounded-2xl" />)}
                        </div>
                        <Skeleton className="h-48 w-full rounded-2xl" />
                    </div>
                </main>
            </div>
        );
    }

    if (!session) return null;

    return (
        <div className="flex min-h-screen bg-background">
            <DashboardSidebar user={session.user} />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <DashboardTopbar user={session.user} />
                <main className="flex-1 overflow-y-auto dashboard-scroll">
                    {children}
                </main>
            </div>
        </div>
    );
}
