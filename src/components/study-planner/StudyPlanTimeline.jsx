'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, BookOpen, Repeat, CheckCircle2 } from 'lucide-react';

const sessionTypeColors = {
    learn: { bg: 'bg-blue-50 dark:bg-blue-500/10', border: 'border-blue-200 dark:border-blue-500/20', text: 'text-blue-600 dark:text-blue-400', dot: 'bg-blue-500' },
    practice: { bg: 'bg-emerald-50 dark:bg-emerald-500/10', border: 'border-emerald-200 dark:border-emerald-500/20', text: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
    apply: { bg: 'bg-purple-50 dark:bg-purple-500/10', border: 'border-purple-200 dark:border-purple-500/20', text: 'text-purple-600 dark:text-purple-400', dot: 'bg-purple-500' },
    review: { bg: 'bg-amber-50 dark:bg-amber-500/10', border: 'border-amber-200 dark:border-amber-500/20', text: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' },
};

export default function StudyPlanTimeline({ plan }) {
    const daysToShow = plan.dailyPlan.slice(0, 14);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">Daily Schedule</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                    Showing first {daysToShow.length} of {plan.dailyPlan.length} days
                </span>
            </div>

            <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-white/10" />

                <div className="space-y-4">
                    {daysToShow.map((day, dayIndex) => (
                        <motion.div
                            key={day.day}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: dayIndex * 0.05 }}
                            className="relative pl-12"
                        >
                            {/* Day marker */}
                            <div className="absolute left-0 w-10 h-10 rounded-xl bg-white dark:bg-gray-900 border-2 border-primary-500 flex items-center justify-center z-10">
                                <span className="text-xs font-bold text-primary-600 dark:text-primary-400">D{day.day}</span>
                            </div>

                            {/* Day card */}
                            <div className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden">
                                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-gray-400" />
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                            {day.dayName}
                                        </span>
                                        <span className="text-xs text-gray-400 dark:text-gray-500">
                                            {day.date}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                        <Clock size={12} />
                                        {day.totalHours.toFixed(1)}h
                                    </div>
                                </div>

                                <div className="p-3 space-y-2">
                                    {day.sessions.map((session, sIndex) => {
                                        const colors = sessionTypeColors[session.type] || sessionTypeColors.learn;
                                        return (
                                            <div
                                                key={sIndex}
                                                className={`flex items-start gap-3 p-2.5 rounded-lg ${colors.bg} border ${colors.border}`}
                                            >
                                                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${colors.dot}`} />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-xs font-medium ${colors.text} capitalize`}>
                                                            {session.type}
                                                        </span>
                                                        <span className="text-xs text-gray-400 dark:text-gray-500">
                                                            {session.time}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white mt-0.5">
                                                        {session.activity}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                        {session.description}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
