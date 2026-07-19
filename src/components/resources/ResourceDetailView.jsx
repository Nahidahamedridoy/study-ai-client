'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
    Calendar, Tag, BarChart2, ArrowLeft, AlertCircle, 
    User as UserIcon, Share2, Link as LinkIcon, Edit2, Trash2 
} from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { fetchResourceById, fetchRelatedResources, deleteResource } from '@/services/resource.service';
import { formatDate } from '@/utils/formatters';
import ResourceDetailSkeleton from '@/components/resources/ResourceDetailSkeleton';
import ResourceCard from '@/components/resources/ResourceCard';
import ResourceSkeleton from '@/components/resources/ResourceSkeleton';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useSession } from '@/lib/auth-client';

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
    const router = useRouter();
    const queryClient = useQueryClient();
    const { data: session } = useSession();

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

    const deleteMutation = useMutation({
        mutationFn: () => deleteResource(id),
        onSuccess: () => {
            toast.success('Resource deleted successfully');
            queryClient.invalidateQueries(['resources']);
            router.push('/explore');
        },
        onError: () => {
            toast.error('Failed to delete resource');
        }
    });

    if (isLoading) return <ResourceDetailSkeleton />;
    if (isError)   return <ErrorState message={error?.message} onRetry={refetch} />;

    const { title, description, category, level, tags = [], createdAt, image, createdBy, creator } = resource;

    // The owner is the user whose email matches createdBy
    const isOwner = session?.user?.email && createdBy && session.user.email === createdBy;
    const authorName = creator?.name || createdBy?.split('@')[0] || 'Anonymous';

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Link copied to clipboard!');
    };

    const handleShare = async () => {
        const url = window.location.href;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: `Check out this study resource: ${title}`,
                    url,
                });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    handleCopyLink();
                }
            }
        } else {
            handleCopyLink();
        }
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this resource? This cannot be undone.')) {
            deleteMutation.mutate();
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
            {/* Back Nav */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                <Link
                    href="/explore"
                    className="inline-flex items-center gap-2 text-sm font-medium text-text-muted hover:text-primary-600 dark:hover:text-primary-400 mb-6 lg:mb-8 transition-colors group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Explore
                </Link>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* ── Main content area ── */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="lg:col-span-8"
                >
                    {/* Hero Image Container */}
                    <div className="relative w-full aspect-video md:h-[450px] rounded-3xl overflow-hidden bg-background mb-8 shadow-xl shadow-gray-200/40 dark:shadow-none group border border-gray-100 dark:border-white/5">
                        {image ? (
                            <Image
                                src={image}
                                alt={title}
                                fill
                                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                priority
                                sizes="(max-width: 1024px) 100vw, 66vw"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-gray-900 dark:to-gray-800">
                                <motion.span 
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', bounce: 0.5 }}
                                    className="text-8xl select-none"
                                >
                                    📚
                                </motion.span>
                            </div>
                        )}
                        
                        {/* Overlay Gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Meta Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-6">
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="bg-primary-600 shadow-md shadow-primary-600/20 text-white text-[13px] font-bold px-3.5 py-1.5 rounded-full tracking-wide">
                                    {category}
                                </span>
                                <span className={`inline-flex items-center gap-1.5 text-[13px] font-bold px-3.5 py-1.5 rounded-full tracking-wide ${LEVEL_COLORS[level] ?? LEVEL_COLORS.Beginner}`}>
                                    <BarChart2 size={14} />
                                    {level}
                                </span>
                            </div>
                            
                            <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight tracking-tight">
                                {title}
                            </h1>
                            
                            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center gap-2 bg-gray-100/80 dark:bg-gray-800/80 px-4 py-2 rounded-full border border-gray-200/50 dark:border-white/5">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                                        <UserIcon size={12} className="text-white" />
                                    </div>
                                    <span className="font-semibold text-gray-700 dark:text-gray-200">By {authorName}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar size={16} className="text-gray-400" />
                                    <span className="font-medium">Published {formatDate(createdAt)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons (Desktop top right, Mobile below) */}
                        <div className="flex flex-wrap items-center gap-2 shrink-0">
                            {isOwner && (
                                <>
                                    <Link href={`/dashboard/edit-resource/${id}`}>
                                        <Button variant="ghost" className="text-gray-600 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30">
                                            <Edit2 size={16} className="mr-2" />
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button 
                                        variant="ghost" 
                                        onClick={handleDelete}
                                        disabled={deleteMutation.isPending}
                                        className="text-gray-600 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/30"
                                    >
                                        <Trash2 size={16} className="mr-2" />
                                        Delete
                                    </Button>
                                </>
                            )}
                            
                            <div className="h-8 w-px bg-gray-200 dark:bg-gray-800 mx-1 hidden sm:block"></div>

                            <Button variant="ghost" onClick={handleCopyLink} className="text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800">
                                <LinkIcon size={16} />
                            </Button>
                            <Button variant="primary" onClick={handleShare} className="shadow-lg shadow-primary-500/25">
                                <Share2 size={16} className="mr-2" />
                                Share
                            </Button>
                        </div>
                    </div>

                    {/* Content Section */}
                    <Card variant="glass" className="p-8 md:p-10 mb-8 border-gray-200/60 dark:border-white/10 shadow-xl shadow-gray-200/20 dark:shadow-none relative overflow-hidden">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary-500/5 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
                        
                        <h2 className="text-xl font-extrabold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <div className="w-1.5 h-6 bg-primary-500 rounded-full" />
                            About This Resource
                        </h2>
                        
                        <div className="prose prose-gray dark:prose-invert max-w-none">
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap text-[15px] md:text-[16px]">
                                {description}
                            </p>
                        </div>
                    </Card>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="mb-10">
                            <div className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wider">
                                <Tag size={16} className="text-primary-500" />
                                Topics & Tags
                            </div>
                            <div className="flex flex-wrap gap-2.5">
                                {tags.map((tag, i) => (
                                    <motion.span
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + (i * 0.05) }}
                                        key={i}
                                        className="text-[13px] font-semibold bg-white dark:bg-gray-800 border border-gray-200 dark:border-white/10 shadow-sm text-gray-600 dark:text-gray-300 px-4 py-2 rounded-xl hover:border-primary-300 hover:text-primary-600 dark:hover:border-primary-500/50 dark:hover:text-primary-400 transition-colors cursor-default"
                                    >
                                        #{tag}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* ── Sidebar: Related Resources ── */}
                <motion.aside
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="lg:col-span-4"
                >
                    <div className="sticky top-24">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
                                <div className="w-1.5 h-5 bg-accent-500 rounded-full" />
                                Related Resources
                            </h2>
                        </div>

                        {relatedLoading ? (
                            <div className="flex flex-col gap-4">
                                {[1, 2, 3].map(i => <ResourceSkeleton key={i} />)}
                            </div>
                        ) : !related?.length ? (
                            <div className="p-8 text-center bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                                <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">No related resources found in this category.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {related.map((res, i) => (
                                    <motion.div
                                        key={res._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * i }}
                                    >
                                        <ResourceCard resource={res} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.aside>
            </div>
        </div>
    );
}
