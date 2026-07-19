'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Sparkles } from 'lucide-react';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import PageTransition from '@/components/dashboard/PageTransition';
import StudyPlannerForm from '@/components/study-planner/StudyPlannerForm';
import StudyPlanResult from '@/components/study-planner/StudyPlanResult';

export default function StudyPlannerPage() {
    const { session } = useAuthGuard();
    const [plan, setPlan] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGenerate = useCallback(async (formData) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/study-planner', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to generate study plan');
            }

            const data = await response.json();
            setPlan(data);
        } catch (err) {
            setError(err.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleReset = useCallback(() => {
        setPlan(null);
        setError(null);
    }, []);

    return (
        <PageTransition>
            <div className="p-6 md:p-8 max-w-[1400px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/25">
                            <CalendarDays size={20} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                                AI Study Planner
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Generate a personalized study plan tailored to your goals
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Error State */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {!plan ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-2xl p-6 md:p-8"
                        >
                            <StudyPlannerForm onGenerate={handleGenerate} isLoading={isLoading} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <StudyPlanResult plan={plan} onReset={handleReset} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* AI Badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex items-center justify-center gap-2 mt-8 text-xs text-gray-400 dark:text-gray-500"
                >
                    <Sparkles size={12} />
                    <span>Powered by AI · Plans are suggestions — adjust based on your needs</span>
                </motion.div>
            </div>
        </PageTransition>
    );
}
