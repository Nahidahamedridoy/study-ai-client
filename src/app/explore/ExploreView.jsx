'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchResources } from '@/services/resource.service';
import ResourceCard from '@/components/resources/ResourceCard';
import ResourceSkeleton from '@/components/resources/ResourceSkeleton';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import { Search, Filter, AlertCircle, BookOpen, ChevronLeft, ChevronRight } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import { motion, AnimatePresence } from 'framer-motion';

const CATEGORIES = ['All', 'Computer Science', 'Mathematics', 'Physics & Astronomy', 'Biology', 'Chemistry', 'Literature', 'History', 'Economics', 'Languages', 'Other'];
const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const SORTS = [
    { label: 'Newest First', value: 'newest' },
    { label: 'Oldest First', value: 'oldest' },
];

function ErrorState({ message, onRetry }) {
    return (
        <div className="py-20 flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center mb-6">
                <AlertCircle className="text-rose-500" size={40} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Failed to load resources</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">{message || 'An error occurred while communicating with the server.'}</p>
            <Button onClick={onRetry}>Try Again</Button>
        </div>
    );
}

function EmptyState({ hasFilters, onClear }) {
    return (
        <div className="py-24 flex flex-col items-center justify-center text-center px-4">
            <BookOpen className="text-gray-300 dark:text-gray-700 mb-6" size={64} />
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No resources found</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
                {hasFilters ? "We couldn't find any resources matching your current filters." : "There are no resources available at the moment."}
            </p>
            {hasFilters && (
                <Button onClick={onClear} className="bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200">
                    Clear Filters
                </Button>
            )}
        </div>
    );
}

export default function ExploreView() {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const [level, setLevel] = useState('All');
    const [sort, setSort] = useState('newest');
    const [page, setPage] = useState(1);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    
    const debouncedSearch = useDebounce(search, 500);
    const LIMIT = 12;

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['resources', { search: debouncedSearch, category, level, sort, page }],
        queryFn: () => fetchResources({
            search: debouncedSearch,
            category: category === 'All' ? '' : category,
            level: level === 'All' ? '' : level,
            sort,
            page,
            limit: LIMIT
        }),
        keepPreviousData: true,
    });

    const resources = data?.resources ?? data ?? [];
    const total = data?.total ?? resources.length;
    const totalPages = Math.ceil(total / LIMIT) || 1;

    // Reset page when filters change
    const handleFilterChange = (setter, value) => {
        setter(value);
        setPage(1);
    };

    const handleClearFilters = () => {
        setSearch('');
        setCategory('All');
        setLevel('All');
        setSort('newest');
        setPage(1);
    };

    const hasActiveFilters = search || category !== 'All' || level !== 'All';

    const FilterSidebar = () => (
        <div className="space-y-8">
            <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Categories</h3>
                <div className="space-y-2">
                    {CATEGORIES.map(c => (
                        <label key={c} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="radio"
                                name="category"
                                value={c}
                                checked={category === c}
                                onChange={(e) => handleFilterChange(setCategory, e.target.value)}
                                className="w-4 h-4 text-primary-600 border-surface-border focus:ring-primary-500 dark:bg-gray-800"
                            />
                            <span className={`text-sm transition-colors ${category === c ? 'font-semibold text-primary-600 dark:text-primary-400' : 'text-text-muted group-hover:text-foreground'}`}>
                                {c}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider mb-4">Level</h3>
                <div className="space-y-2">
                    {LEVELS.map(l => (
                        <label key={l} className="flex items-center gap-3 cursor-pointer group">
                            <input
                                type="radio"
                                name="level"
                                value={l}
                                checked={level === l}
                                onChange={(e) => handleFilterChange(setLevel, e.target.value)}
                                className="w-4 h-4 text-primary-600 border-surface-border focus:ring-primary-500 dark:bg-gray-800"
                            />
                            <span className={`text-sm transition-colors ${level === l ? 'font-semibold text-primary-600 dark:text-primary-400' : 'text-text-muted group-hover:text-foreground'}`}>
                                {l}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {/* Page Header */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-10 text-center md:text-left"
            >
                <h1 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-3">Explore Resources</h1>
                <p className="text-text-muted text-lg max-w-2xl">Discover a wide range of study materials, notes, and guides shared by the community.</p>
            </motion.div>

            {/* Top Bar (Search & Sort) */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <Input
                        type="text"
                        placeholder="Search resources by title or description..."
                        value={search}
                        onChange={(e) => handleFilterChange(setSearch, e.target.value)}
                        className="pl-11 w-full bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-xl"
                    />
                </div>
                
                <div className="flex gap-3">
                    <button 
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        className="md:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300 font-medium"
                    >
                        <Filter size={18} />
                        Filters
                    </button>
                    
                    <select
                        value={sort}
                        onChange={(e) => handleFilterChange(setSort, e.target.value)}
                        className="flex-1 sm:flex-none border border-gray-200 dark:border-gray-800 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium bg-white dark:bg-gray-950 text-gray-700 dark:text-gray-300"
                    >
                        {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
                {/* Desktop Sidebar */}
                <aside className="hidden md:block col-span-1 border-r border-gray-100 dark:border-gray-800/50 pr-6">
                    <FilterSidebar />
                </aside>

                {/* Mobile Filters Dropdown */}
                <AnimatePresence>
                    {showMobileFilters && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="md:hidden col-span-1 overflow-hidden"
                        >
                            <Card className="p-5 shadow-none border-gray-200 dark:border-gray-800">
                                <FilterSidebar />
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Main Content Grid */}
                <div className="md:col-span-3 lg:col-span-4">
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => <ResourceSkeleton key={i} />)}
                        </div>
                    ) : isError ? (
                        <ErrorState message={error?.message} onRetry={refetch} />
                    ) : resources.length === 0 ? (
                        <EmptyState hasFilters={hasActiveFilters} onClear={handleClearFilters} />
                    ) : (
                        <>
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                            >
                                {resources.map((res, idx) => (
                                    <motion.div
                                        key={res._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                                    >
                                        <ResourceCard resource={res} />
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-12 flex items-center justify-center gap-3">
                                    <Button
                                        onClick={() => setPage(p => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
                                    >
                                        <ChevronLeft size={20} />
                                    </Button>
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Page {page} of {totalPages}
                                    </span>
                                    <Button
                                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                        disabled={page >= totalPages}
                                        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-50"
                                    >
                                        <ChevronRight size={20} />
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
