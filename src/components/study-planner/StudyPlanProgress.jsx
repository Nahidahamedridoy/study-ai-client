'use client';

import { motion } from 'framer-motion';
import { TrendingUp, Target, Clock, BookOpen } from 'lucide-react';

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function StudyPlanProgress({ plan }) {
    const progressMetrics = [
        {
            label: 'Concept Understanding',
            target: 80,
            icon: BookOpen,
            color: 'from-blue-500 to-indigo-500',
        },
        {
            label: 'Problem Solving',
            target: 75,
            icon: Target,
            color: 'from-emerald-500 to-teal-500',
        },
        {
            label: 'Time Management',
            target: 90,
            icon: Clock,
            color: 'from-purple-500 to-pink-500',
        },
        {
            label: 'Overall Readiness',
            target: plan.difficulty === 'advanced' ? 85 : plan.difficulty === 'intermediate' ? 75 : 70,
            icon: TrendingUp,
            color: 'from-amber-500 to-orange-500',
        },
    ];

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-2xl p-6"
        >
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Progress Tracker</h3>
            <div className="grid gap-4 sm:grid-cols-2">
                {progressMetrics.map((metric) => {
                    const Icon = metric.icon;
                    return (
                        <motion.div
                            key={metric.label}
                            variants={item}
                            className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center`}>
                                        <Icon size={14} className="text-white" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{metric.label}</span>
                                </div>
                                <span className="text-sm font-bold text-gray-900 dark:text-white">{metric.target}%</span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${metric.target}%` }}
                                    transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                                    className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}
