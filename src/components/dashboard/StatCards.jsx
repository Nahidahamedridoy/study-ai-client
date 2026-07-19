'use client';

import { motion } from 'framer-motion';
import { BookOpen, MessageSquare, CalendarCheck, Bookmark } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const CARDS = [
    {
        label: 'Total Resources',
        key: 'totalResources',
        icon: BookOpen,
        gradient: 'from-blue-500 to-blue-600',
        shadow: 'shadow-blue-500/20',
        bgLight: 'bg-blue-50',
        bgDark: 'dark:bg-blue-500/10',
    },
    {
        label: 'AI Chats',
        key: 'aiChats',
        icon: MessageSquare,
        gradient: 'from-emerald-500 to-teal-500',
        shadow: 'shadow-emerald-500/20',
        bgLight: 'bg-emerald-50',
        bgDark: 'dark:bg-emerald-500/10',
    },
    {
        label: 'Study Plans',
        key: 'studyPlans',
        icon: CalendarCheck,
        gradient: 'from-violet-500 to-purple-500',
        shadow: 'shadow-violet-500/20',
        bgLight: 'bg-violet-50',
        bgDark: 'dark:bg-violet-500/10',
    },
    {
        label: 'Saved Resources',
        key: 'savedCount',
        icon: Bookmark,
        gradient: 'from-amber-500 to-orange-500',
        shadow: 'shadow-amber-500/20',
        bgLight: 'bg-amber-50',
        bgDark: 'dark:bg-amber-500/10',
    },
];

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function StatCards({ stats, loading }) {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4"
        >
            {CARDS.map((card) => {
                const Icon = card.icon;
                const value = stats?.[card.key] ?? 0;
                return (
                    <motion.div
                        key={card.key}
                        variants={item}
                        whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
                        className="relative bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-2xl p-5 overflow-hidden transition-all duration-300 group"
                    >
                        {/* Subtle gradient glow on hover */}
                        <div className={`absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gradient-to-br ${card.gradient} opacity-[0.07] group-hover:opacity-[0.12] transition-opacity blur-2xl`} />

                        <div className="flex items-start justify-between relative">
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg ${card.shadow}`}>
                                <Icon size={20} className="text-white" strokeWidth={2} />
                            </div>
                        </div>

                        <div className="mt-4 relative">
                            <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
                                {loading ? (
                                    <span className="inline-block w-12 h-7 bg-gray-200 dark:bg-white/10 rounded-lg animate-pulse" />
                                ) : (
                                    <AnimatedCounter value={value} />
                                )}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{card.label}</p>
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
}
