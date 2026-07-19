'use client';

import { motion } from 'framer-motion';
import { BrainCircuit, Lightbulb, BookOpen, Calculator, Beaker, Globe } from 'lucide-react';

const SUGGESTIONS = [
    {
        icon: Lightbulb,
        title: 'Explain a concept',
        prompt: 'Explain the concept of quantum entanglement in simple terms',
        gradient: 'from-amber-500 to-orange-500',
    },
    {
        icon: BookOpen,
        title: 'Summarize a topic',
        prompt: 'Summarize the key principles of thermodynamics',
        gradient: 'from-blue-500 to-indigo-500',
    },
    {
        icon: Calculator,
        title: 'Solve a problem',
        prompt: 'Help me solve this integral: ∫ x² eˣ dx',
        gradient: 'from-emerald-500 to-teal-500',
    },
    {
        icon: Beaker,
        title: 'Study strategy',
        prompt: 'Create a study plan for my upcoming chemistry exam',
        gradient: 'from-violet-500 to-purple-500',
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

export default function ChatEmpty({ onSuggestion }) {
    return (
        <div className="flex-1 flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="text-center max-w-lg"
            >
                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mb-6"
                >
                    <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-2xl shadow-primary-500/30">
                        <BrainCircuit size={32} className="text-white" />
                    </div>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2"
                >
                    How can I help you <span className="text-gradient">study</span>?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="text-sm text-gray-500 dark:text-gray-400 mb-8"
                >
                    Ask me anything — from explaining concepts to creating study plans.
                </motion.p>

                {/* Suggestion Cards */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                >
                    {SUGGESTIONS.map((s) => {
                        const Icon = s.icon;
                        return (
                            <motion.button
                                key={s.title}
                                variants={item}
                                whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => onSuggestion(s.prompt)}
                                className="flex items-start gap-3 p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 text-left hover:border-gray-200 dark:hover:border-white/10 transition-all duration-200 group"
                            >
                                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center flex-shrink-0 shadow-md group-hover:shadow-lg transition-shadow`}>
                                    <Icon size={16} className="text-white" />
                                </div>
                                <div>
                                    <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{s.title}</p>
                                    <p className="text-[12px] text-gray-400 dark:text-gray-500 mt-0.5 line-clamp-2">{s.prompt}</p>
                                </div>
                            </motion.button>
                        );
                    })}
                </motion.div>
            </motion.div>
        </div>
    );
}
