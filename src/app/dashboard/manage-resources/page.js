'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchMyResources, deleteResource } from '@/services/resource.service';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import { formatDate } from '@/utils/formatters';
import { Trash2, Pencil, BookOpen, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const LEVEL_COLORS = {
    Beginner:     'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    Intermediate: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Advanced:     'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
};

function ConfirmModal({ resource, onConfirm, onCancel, isPending }) {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="max-w-sm w-full p-6 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center flex-shrink-0">
                        <AlertCircle size={20} className="text-rose-600 dark:text-rose-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">Delete Resource</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">This action cannot be undone.</p>
                    </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    Are you sure you want to delete <strong>"{resource?.title}"</strong>?
                </p>
                <div className="flex gap-3 justify-end">
                    <Button onClick={onCancel} className="bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200">
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} disabled={isPending} className="bg-rose-600 hover:bg-rose-700">
                        {isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default function ManageResourcesPage() {
    const { session } = useAuthGuard();
    const queryClient = useQueryClient();
    const [page, setPage] = useState(1);
    const [toDelete, setToDelete] = useState(null);
    const LIMIT = 10;

    const { data, isLoading, isError } = useQuery({
        queryKey: ['my-resources', page],
        queryFn: () => fetchMyResources({ page, limit: LIMIT }),
        enabled: !!session,
        keepPreviousData: true,
    });

    const resources = data?.resources ?? data ?? [];
    const total     = data?.total ?? resources.length;
    const totalPages = Math.ceil(total / LIMIT) || 1;

    const { mutate: doDelete, isPending: deleting } = useMutation({
        mutationFn: (id) => deleteResource(id),
        onSuccess: () => {
            setToDelete(null);
            queryClient.invalidateQueries({ queryKey: ['my-resources'] });
            queryClient.invalidateQueries({ queryKey: ['dashboard-stats'] });
        },
    });

    return (
        <>
            {toDelete && (
                <ConfirmModal
                    resource={toDelete}
                    onConfirm={() => doDelete(toDelete._id)}
                    onCancel={() => setToDelete(null)}
                    isPending={deleting}
                />
            )}

            <div className="p-6 md:p-8 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">Manage Resources</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">View, edit, or delete your published resources.</p>
                    </div>
                    <Link href="/dashboard/add-resource">
                        <Button className="hidden sm:flex">+ Add Resource</Button>
                    </Link>
                </div>

                <Card className="overflow-hidden">
                    {/* Table header */}
                    <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        <span>Resource</span>
                        <span>Category</span>
                        <span>Level</span>
                        <span>Date</span>
                        <span>Actions</span>
                    </div>

                    {isLoading ? (
                        <div className="p-6 space-y-4">
                            {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full rounded-xl" />)}
                        </div>
                    ) : isError ? (
                        <div className="py-16 text-center text-rose-500">
                            <AlertCircle size={36} className="mx-auto mb-2 opacity-60" />
                            <p className="font-medium">Failed to load resources.</p>
                        </div>
                    ) : !resources.length ? (
                        <div className="py-20 text-center text-gray-500 dark:text-gray-400">
                            <BookOpen size={44} className="mx-auto mb-3 opacity-25" />
                            <p className="font-semibold text-lg mb-1">No resources yet</p>
                            <Link href="/dashboard/add-resource" className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                                Create your first resource →
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100 dark:divide-gray-800">
                            {resources.map(res => (
                                <div key={res._id} className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-3 md:gap-4 items-center px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                                    <div className="min-w-0">
                                        <p className="font-semibold text-gray-900 dark:text-white truncate">{res.title}</p>
                                        <p className="text-xs text-gray-400 md:hidden">{res.category} · {formatDate(res.createdAt)}</p>
                                    </div>
                                    <span className="hidden md:block text-sm text-gray-600 dark:text-gray-400 truncate">{res.category}</span>
                                    <span className={`hidden md:inline-flex w-fit text-xs font-semibold px-2.5 py-1 rounded-full ${LEVEL_COLORS[res.level] ?? LEVEL_COLORS.Beginner}`}>
                                        {res.level}
                                    </span>
                                    <span className="hidden md:block text-sm text-gray-500 dark:text-gray-400">{formatDate(res.createdAt)}</span>
                                    <div className="flex items-center gap-2">
                                        <Link href={`/resources/${res._id}`} target="_blank">
                                            <button className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors" title="Edit">
                                                <Pencil size={16} />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => setToDelete(res)}
                                            className="p-2 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {!isLoading && resources.length > 0 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-800">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                Page {page} of {totalPages}
                            </span>
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="px-3 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 disabled:opacity-40"
                                >
                                    <ChevronLeft size={16} />
                                </Button>
                                <Button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page >= totalPages}
                                    className="px-3 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 disabled:opacity-40"
                                >
                                    <ChevronRight size={16} />
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </>
    );
}
