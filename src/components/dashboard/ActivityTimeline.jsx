'use client';

import { motion } from 'framer-motion';
import { Clock, BookOpen, MessageSquare, Brain, Sparkles, Upload, ArrowUpRight } from 'lucide-react';

const ACTIVITIES = [
    {
        id: 1,
        type: 'upload',
        title: 'Uploaded "Advanced Calculus Notes"',
        time: '2 minutes ago',
        icon: Upload,
        color: 'bg-blue-500',
    },
    {
        id: 2,
        type: 'ai',
        title: 'AI Chat: "Explain derivatives"',
        time: '15 minutes ago',
        icon: MessageSquare,
        color: 'bg-accent-500',
    },
    {
        id: 3,
        type: 'plan',
        title: 'Generated study plan for Physics',
        time: '1 hour ago',
        icon: Brain,
        color: 'bg-secondary-500',
    },
    {
        id: 4,
        type: 'resource',
        title: 'Saved "Linear Algebra Fundamentals"',
        time: '3 hours ago',
        icon: BookOpen,
        color: 'bg-emerald-500',
    },
    {
        id: 5,
        type: 'ai',
        title: 'AI Chat: "Summarize chapter 5"',
        time: '5 hours ago',
        icon: Sparkles,
        color: 'bg-amber-500',
    },
];

const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
};

export default function ActivityTimeline() {
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

            <motion.div
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="space-y-0"
            >
                {ACTIVITIES.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                        <motion.div
                            key={activity.id}
                            variants={itemVariants}
                            className="flex items-start gap-3 py-3 relative group"
                        >
                            {/* Timeline line */}
                            {index < ACTIVITIES.length - 1 && (
                                <div className="absolute left-[15px] top-[36px] w-[1px] h-[calc(100%-20px)] bg-gray-100 dark:bg-white/5" />
                            )}

                            {/* Icon */}
                            <div className={`w-[30px] h-[30px] rounded-lg ${activity.color} flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                <Icon size={14} className="text-white" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <p className="text-[13px] font-medium text-gray-900 dark:text-white truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                    {activity.title}
                                </p>
                                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">{activity.time}</p>
                            </div>

                            {/* Arrow */}
                            <ArrowUpRight size={14} className="text-gray-300 dark:text-gray-600 group-hover:text-primary-500 transition-colors flex-shrink-0 mt-1" />
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
    );
}
