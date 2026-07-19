'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PlusCircle, MessageSquare, CalendarCheck, Compass } from 'lucide-react';

const ACTIONS = [
    {
        label: 'Add Resource',
        description: 'Upload a new study resource',
        href: '/dashboard/add-resource',
        icon: PlusCircle,
        gradient: 'from-blue-500 to-blue-600',
        shadow: 'shadow-blue-500/20',
    },
    {
        label: 'AI Chat',
        description: 'Ask AI anything',
        href: '/dashboard/chat',
        icon: MessageSquare,
        gradient: 'from-emerald-500 to-teal-500',
        shadow: 'shadow-emerald-500/20',
    },
    {
        label: 'Study Plan',
        description: 'Generate a study plan',
        href: '/dashboard/study-planner',
        icon: CalendarCheck,
        gradient: 'from-violet-500 to-purple-500',
        shadow: 'shadow-violet-500/20',
    },
    {
        label: 'Explore',
        description: 'Browse resources',
        href: '/explore',
        icon: Compass,
        gradient: 'from-amber-500 to-orange-500',
        shadow: 'shadow-amber-500/20',
    },
];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
};

const item = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function QuickActions() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Quick Actions</h3>
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="grid grid-cols-2 lg:grid-cols-4 gap-3"
            >
                {ACTIONS.map((action) => {
                    const Icon = action.icon;
                    return (
                        <motion.div key={action.label} variants={item}>
                            <Link
                                href={action.href}
                                className="block bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-2xl p-4 hover:border-gray-200 dark:hover:border-white/10 transition-all duration-200 group hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-none hover:-translate-y-0.5"
                            >
                                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center shadow-lg ${action.shadow} mb-3 group-hover:scale-105 transition-transform duration-200`}>
                                    <Icon size={18} className="text-white" />
                                </div>
                                <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{action.label}</p>
                                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">{action.description}</p>
                            </Link>
                        </motion.div>
                    );
                })}
            </motion.div>
        </motion.div>
    );
}
