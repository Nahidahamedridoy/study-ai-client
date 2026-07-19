'use client';

import { useAuthGuard } from '@/hooks/useAuthGuard';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import Skeleton from '@/components/ui/Skeleton';

export default function DashboardShell({ children }) {
    const { session, isPending } = useAuthGuard();

    // Full-screen skeleton while session resolves
    if (isPending) {
        return (
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
                <div className="hidden lg:flex flex-col w-64 xl:w-72 bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 p-4 gap-3">
                    <Skeleton className="h-8 w-40 mb-4" />
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-10 w-full rounded-xl" />)}
                    <div className="mt-auto"><Skeleton className="h-16 w-full rounded-xl" /></div>
                </div>
                <main className="flex-1 p-6 space-y-4 overflow-y-auto">
                    <Skeleton className="h-8 w-48" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
                    </div>
                    <Skeleton className="h-64 w-full rounded-2xl" />
                </main>
            </div>
        );
    }

    // Redirecting handled by useAuthGuard — render nothing
    if (!session) return null;

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            <DashboardSidebar user={session.user} />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
