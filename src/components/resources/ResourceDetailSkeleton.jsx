import Skeleton from '@/components/ui/Skeleton';

export default function ResourceDetailSkeleton() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Main column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Image */}
                    <Skeleton className="w-full h-72 md:h-96 rounded-2xl" />
                    {/* Badges */}
                    <div className="flex gap-3">
                        <Skeleton className="h-7 w-24 rounded-full" />
                        <Skeleton className="h-7 w-20 rounded-full" />
                    </div>
                    {/* Title */}
                    <Skeleton className="h-9 w-3/4 rounded-xl" />
                    <Skeleton className="h-5 w-1/3 rounded-lg" />
                    {/* Description */}
                    <div className="space-y-3 pt-2">
                        <Skeleton className="h-4 w-full rounded" />
                        <Skeleton className="h-4 w-full rounded" />
                        <Skeleton className="h-4 w-5/6 rounded" />
                        <Skeleton className="h-4 w-full rounded" />
                        <Skeleton className="h-4 w-4/5 rounded" />
                    </div>
                    {/* Tags */}
                    <div className="flex gap-2 pt-2">
                        {[1, 2, 3].map(i => (
                            <Skeleton key={i} className="h-7 w-16 rounded-full" />
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    <Skeleton className="h-8 w-40 rounded-xl" />
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex gap-3">
                            <Skeleton className="h-20 w-28 rounded-xl flex-shrink-0" />
                            <div className="flex-1 space-y-2 py-1">
                                <Skeleton className="h-4 w-full rounded" />
                                <Skeleton className="h-3 w-2/3 rounded" />
                                <Skeleton className="h-5 w-16 rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
