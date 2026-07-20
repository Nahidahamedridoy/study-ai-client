'use client';

import { motion } from 'framer-motion';
import { Clock, BookOpen, MessageSquare, Brain, ArrowUpRight } from 'lucide-react';
import { formatDate } from '@/utils/formatters';
import Skeleton from '@/components/ui/Skeleton';

const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

function timeAgo(dateString) {
    if (!dateString) return '';
    const diff = Date.now() - new Date(dateString).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 1) return 'Just now';
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    return `${d}d ago`;
}

export default function ActivityTimeline({ resources = [], chats = [], loading = false }) {
    // Merge and sort the two streams by date, take latest 6
    const activities = [
        ...resources.map(r => ({
            id: r._id,
            type: 'resource',
            title: `Added "${r.title}"`,
            sub: r.category,
            date: r.createdAt,
            icon: BookOpen,
            color: 'bg-blue-500',
        })),
        ...chats.map(c => ({
            id: c._id,
            type: 'ai',
            title: `AI Chat: "${c.prompt?.length > 40 ? c.prompt.slice(0, 40) + '…' : c.prompt}"`,
            sub: 'AI Assistant',
            date: c.createdAt,
            icon: MessageSquare,
            color: 'bg-accent-500',
        })),
    ]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 6);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-2xl p-5 overflow-hidden"
        >
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">Recent Activity</h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Your latest actions</p>
                </div>
                <Clock size={16} className="text-gray-400 dark:text-gray-500" />
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Skeleton className="w-[30px] h-[30px] rounded-lg flex-shrink-0" />
                            <div className="flex-1 space-y-1.5">
                                <Skeleton className="h-3 w-full rounded" />
                                <Skeleton className="h-3 w-1/3 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : activities.length === 0 ? (
                <div className="py-10 text-center text-gray-400 dark:text-gray-500">
                    <Brain size={32} className="mx-auto mb-2 opacity-20" />
                    <p className="text-xs">No activity yet. Start exploring!</p>
                </div>
            ) : (
                <motion.div
                    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="space-y-0"
                >
                    {activities.map((activity, index) => {
                        const Icon = activity.icon;
                        return (
                            <motion.div
                                key={`${activity.type}-${activity.id}`}
                                variants={itemVariants}
                                className="flex items-start gap-3 py-3 relative group"
                            >
                                {/* Timeline connector line */}
                                {index < activities.length - 1 && (
                                    <div className="absolute left-[15px] top-[36px] w-[1px] h-[calc(100%-20px)] bg-gray-100 dark:bg-white/5" />
                                )}

                                <div className={`w-[30px] h-[30px] rounded-lg ${activity.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                    <Icon size={14} className="text-white" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className="text-[13px] font-medium text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {activity.title}
                                    </p>
                                    <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">
                                        {activity.sub && <span>{activity.sub} · </span>}
                                        {timeAgo(activity.date)}
                                    </p>
                                </div>

                                <ArrowUpRight size={14} className="text-gray-300 dark:text-gray-600 group-hover:text-primary-500 transition-colors flex-shrink-0 mt-1" />
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}
        </motion.div>
    );
}
