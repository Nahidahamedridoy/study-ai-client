'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Tag, BarChart2, ArrowLeft, AlertCircle, User as UserIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchResourceById, fetchRelatedResources } from '@/services/resource.service';
import { formatDate } from '@/utils/formatters';
import ResourceDetailSkeleton from '@/components/resources/ResourceDetailSkeleton';
import ResourceCard from '@/components/resources/ResourceCard';
import ResourceSkeleton from '@/components/resources/ResourceSkeleton';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

const LEVEL_COLORS = {
    Beginner:     'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-400',
    Intermediate: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400',
    Advanced:     'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
};

function ErrorState({ message, onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-4">
            <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center">
                <AlertCircle className="text-error" size={40} />
            </div>
            <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Failed to load resource</h2>
                <p className="text-text-muted max-w-sm">{message || 'Something went wrong while fetching this resource.'}</p>
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

    const { title, description, category, level, tags = [], createdAt, image, creator } = resource;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Back nav */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Link
                    href="/explore"
                    className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Explore
                </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* ── Main column ── */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="lg:col-span-2"
                >
                    {/* Hero image */}
                    <div className="relative w-full h-72 md:h-[420px] rounded-2xl overflow-hidden bg-background mb-8 shadow-sm group">
                        {image ? (
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                priority
                                sizes="(max-width: 1024px) 100vw, 66vw"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700">
                                <span className="text-8xl select-none group-hover:scale-110 transition-transform duration-500">📚</span>
                            </div>
                        )}
                    </div>

                    {/* Badges row */}
                    <div className="flex flex-wrap items-center gap-3 mb-5">
                        <span className="bg-primary-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                            {category}
                        </span>
                        <span className={`inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full ${LEVEL_COLORS[level] ?? LEVEL_COLORS.Beginner}`}>
                            <BarChart2 size={13} />
                            {level}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3 leading-tight">
                        {title}
                    </h1>

                    {/* Date & Creator */}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-8">
                        {creator?.name && (
                            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-3 py-1.5 rounded-full">
                                <UserIcon size={14} />
                                <span className="font-medium text-foreground">By {creator.name}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            Published {formatDate(createdAt)}
                        </div>
                    </div>

                    {/* Full description */}
                    <Card variant="default" className="p-7 mb-8">
                        <h2 className="text-lg font-bold text-foreground mb-4">About This Resource</h2>
                        <p className="text-text-muted leading-relaxed whitespace-pre-wrap">
                            {description}
                        </p>
                    </Card>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
                                <Tag size={15} />
                                Tags
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-text-muted px-3 py-1.5 rounded-full hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 transition-colors cursor-default"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* ── Sidebar: Related Resources ── */}
                <motion.aside
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <h2 className="text-xl font-bold text-foreground mb-6">Related Resources</h2>

                    {relatedLoading ? (
                        <div className="grid grid-cols-1 gap-5">
                            {[1, 2, 3].map(i => <ResourceSkeleton key={i} />)}
                        </div>
                    ) : !related?.length ? (
                        <Card variant="glass" className="p-6 text-center text-text-muted text-sm shadow-none">
                            No related resources found.
                        </Card>
                    ) : (
                        <div className="grid grid-cols-1 gap-5">
                            {related.map(res => (
                                <ResourceCard key={res._id} resource={res} />
                            ))}
                        </div>
                    )}
                </motion.aside>
            </div>
        </div>
    );
}
