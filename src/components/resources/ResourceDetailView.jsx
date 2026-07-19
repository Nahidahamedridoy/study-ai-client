'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Tag, BarChart2, ArrowLeft, AlertCircle } from 'lucide-react';
import { fetchResourceById, fetchRelatedResources } from '@/services/resource.service';
import { formatDate } from '@/utils/formatters';
import ResourceDetailSkeleton from '@/components/resources/ResourceDetailSkeleton';
import ResourceCard from '@/components/resources/ResourceCard';
import ResourceSkeleton from '@/components/resources/ResourceSkeleton';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const LEVEL_COLORS = {
    Beginner:     'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    Intermediate: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Advanced:     'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
};

function ErrorState({ message, onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
            <div className="w-20 h-20 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center">
                <AlertCircle className="text-rose-500" size={40} />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Failed to load resource</h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">{message || 'Something went wrong while fetching this resource.'}</p>
            </div>
            <div className="flex gap-3">
                <Link href="/explore">
                    <Button className="bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200">
                        Back to Explore
                    </Button>
                </Link>
                <Button onClick={onRetry}>Try Again</Button>
            </div>
        </div>
    );
}

export default function ResourceDetailView({ id }) {
    const {
        data: resource,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['resource', id],
        queryFn: () => fetchResourceById(id),
        enabled: !!id,
    });

    const {
        data: related,
        isLoading: relatedLoading,
    } = useQuery({
        queryKey: ['resource-related', id],
        queryFn: () => fetchRelatedResources(id),
        enabled: !!id,
    });

    if (isLoading) return <ResourceDetailSkeleton />;
    if (isError)   return <ErrorState message={error?.message} onRetry={refetch} />;

    const { title, description, category, level, tags = [], createdAt, image } = resource;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Back nav */}
            <Link
                href="/explore"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 mb-8 transition-colors"
            >
                <ArrowLeft size={16} />
                Back to Explore
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* ── Main column ── */}
                <div className="lg:col-span-2">
                    {/* Hero image */}
                    <div className="relative w-full h-72 md:h-[420px] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-8 shadow-sm">
                        {image ? (
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1024px) 100vw, 66vw"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700">
                                <span className="text-8xl select-none">📚</span>
                            </div>
                        )}
                    </div>

                    {/* Badges row */}
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className="bg-blue-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                            {category}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full ${LEVEL_COLORS[level] ?? LEVEL_COLORS.Beginner}`}>
                            <BarChart2 size={13} />
                            {level}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3 leading-tight">
                        {title}
                    </h1>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500 mb-8">
                        <Calendar size={14} />
                        Published {formatDate(createdAt)}
                    </div>

                    {/* Full description */}
                    <Card className="p-7 mb-8 shadow-none border border-gray-100 dark:border-gray-800">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">About This Resource</h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {description}
                        </p>
                    </Card>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                                <Tag size={15} />
                                Tags
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-3 py-1.5 rounded-full hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-colors cursor-default"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Sidebar: Related Resources ── */}
                <aside>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Related Resources</h2>

                    {relatedLoading ? (
                        <div className="grid grid-cols-1 gap-5">
                            {[1, 2, 3].map(i => <ResourceSkeleton key={i} />)}
                        </div>
                    ) : !related?.length ? (
                        <Card className="p-6 text-center text-gray-500 dark:text-gray-400 text-sm">
                            No related resources found.
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-5">
                            {related.map(res => (
                                <ResourceCard key={res._id} resource={res} />
                            ))}
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
}
