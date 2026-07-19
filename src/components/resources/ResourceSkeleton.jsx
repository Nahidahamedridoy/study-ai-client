import Skeleton from '@/components/ui/Skeleton';

export default function ResourceSkeleton() {
    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden flex flex-col h-full">
            {/* Image placeholder */}
            <Skeleton className="h-44 w-full rounded-none" />

            {/* Body */}
            <div className="flex flex-col flex-1 p-5 gap-3">
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="mt-auto">
                    <Skeleton className="h-4 w-24 mb-4" />
                    <Skeleton className="h-10 w-full" />
                </div>
            </div>
        </div>
    );
}
