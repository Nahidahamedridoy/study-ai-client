'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Calendar, Clock, Target, BookOpen, TrendingUp, Lightbulb,
    ChevronDown, ChevronUp, CheckCircle2, Circle, Download, ArrowLeft,
    Brain, Repeat, Flame, Users, Coffee, Heart, Sparkles, Zap
} from 'lucide-react';
import Button from '@/components/ui/Button';
import StudyPlanTimeline from './StudyPlanTimeline';
import StudyPlanProgress from './StudyPlanProgress';

const ICON_MAP = {
    clock: Clock, brain: Brain, repeat: Repeat, lightbulb: Lightbulb,
    target: Target, book: BookOpen, zap: Zap, users: Users,
    flame: Flame, sparkles: Sparkles, coffee: Coffee, heart: Heart,
};

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.06 } },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function StudyPlanResult({ plan, onReset }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [expandedWeek, setExpandedWeek] = useState(null);

    const tabs = [
        { id: 'overview', label: 'Overview', icon: Target },
        { id: 'timeline', label: 'Timeline', icon: Calendar },
        { id: 'topics', label: 'Topics', icon: BookOpen },
        { id: 'revision', label: 'Revision', icon: Repeat },
        { id: 'tips', label: 'Tips', icon: Lightbulb },
    ];

    const handleDownloadPDF = () => {
        const content = generatePDFContent(plan);
        const blob = new Blob([content], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `study-plan-${plan.subject.toLowerCase().replace(/\s+/g, '-')}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-5xl mx-auto"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-bold text-gray-900 dark:text-white"
                    >
                        Your <span className="text-gradient">{plan.subject}</span> Study Plan
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-sm text-gray-500 dark:text-gray-400 mt-1"
                    >
                        Generated {new Date(plan.generatedAt).toLocaleDateString()} · {plan.totalWeeks} weeks · {plan.totalHours} total hours
                    </motion.p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" onClick={onReset} className="gap-2">
                        <ArrowLeft size={16} />
                        New Plan
                    </Button>
                    <Button onClick={handleDownloadPDF} className="gap-2">
                        <Download size={16} />
                        Download PDF
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6"
            >
                {[
                    { label: 'Total Days', value: plan.totalDays, icon: Calendar, color: 'from-blue-500 to-indigo-500' },
                    { label: 'Hours/Day', value: plan.hoursPerDay, icon: Clock, color: 'from-emerald-500 to-teal-500' },
                    { label: 'Topics', value: plan.topics.length, icon: BookOpen, color: 'from-purple-500 to-pink-500' },
                    { label: 'Total Hours', value: plan.totalHours, icon: TrendingUp, color: 'from-amber-500 to-orange-500' },
                ].map(stat => (
                    <motion.div
                        key={stat.label}
                        variants={item}
                        className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-xl p-4"
                    >
                        <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2`}>
                            <stat.icon size={16} className="text-white" />
                        </div>
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{stat.label}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Tabs */}
            <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-white/5 rounded-xl mb-6 overflow-x-auto">
                {tabs.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                                activeTab === tab.id
                                    ? 'text-primary-700 dark:text-primary-300'
                                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                            }`}
                        >
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="tab-bg"
                                    className="absolute inset-0 bg-white dark:bg-white/[0.06] rounded-lg shadow-sm"
                                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                />
                            )}
                            <Icon size={16} className="relative z-10" />
                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                    >
                        <StudyPlanProgress plan={plan} />

                        <div className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-2xl p-6">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Weekly Roadmap</h3>
                            <div className="space-y-3">
                                {plan.weeklyRoadmap.map((week, i) => (
                                    <motion.div
                                        key={week.week}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setExpandedWeek(expandedWeek === i ? null : i)}
                                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center">
                                                    <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{week.week}</span>
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-medium text-gray-900 dark:text-white">{week.title}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">{week.focus}</p>
                                                </div>
                                            </div>
                                            {expandedWeek === i ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                                        </button>
                                        <AnimatePresence>
                                            {expandedWeek === i && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="border-t border-gray-100 dark:border-white/5"
                                                >
                                                    <div className="p-4 space-y-2">
                                                        {week.topics.map(topic => (
                                                            <div key={topic.id} className="flex items-center gap-2 text-sm">
                                                                <Circle size={8} className="text-primary-400" />
                                                                <span className="text-gray-700 dark:text-gray-300">{topic.name}</span>
                                                                <span className="text-xs text-gray-400 ml-auto">{topic.estimatedHours}h</span>
                                                            </div>
                                                        ))}
                                                        {week.milestones.length > 0 && (
                                                            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
                                                                {week.milestones.map((m, j) => (
                                                                    <div key={j} className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
                                                                        <Target size={12} />
                                                                        <span>{m}</span>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'timeline' && (
                    <motion.div
                        key="timeline"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <StudyPlanTimeline plan={plan} />
                    </motion.div>
                )}

                {activeTab === 'topics' && (
                    <motion.div
                        key="topics"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-2xl p-6"
                    >
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Topics to Master</h3>
                        <div className="grid gap-3">
                            {plan.topics.map((topic, i) => (
                                <motion.div
                                    key={topic.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm font-bold text-white">{topic.id}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 dark:text-white">{topic.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{topic.complexity} · {topic.estimatedHours}h estimated</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                            topic.complexity === 'advanced'
                                                ? 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400'
                                                : topic.complexity === 'intermediate'
                                                ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                                : 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                        }`}>
                                            {topic.complexity}
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'revision' && (
                    <motion.div
                        key="revision"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-2xl p-6"
                    >
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Revision Schedule</h3>
                        <div className="space-y-4">
                            {plan.revisionSchedule.map((rev, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/5"
                                >
                                    <div className="w-10 h-10 rounded-xl bg-secondary-100 dark:bg-secondary-500/10 flex items-center justify-center flex-shrink-0">
                                        <Repeat size={18} className="text-secondary-600 dark:text-secondary-400" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="font-medium text-gray-900 dark:text-white">{rev.title}</p>
                                            <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-secondary-100 dark:bg-secondary-500/10 text-secondary-600 dark:text-secondary-400">
                                                Day {rev.day}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{rev.date} · {rev.estimatedHours}h</p>
                                        <div className="flex flex-wrap gap-1">
                                            {rev.topics.map((t, j) => (
                                                <span key={j} className="px-2 py-0.5 rounded-md text-xs bg-gray-200 dark:bg-white/5 text-gray-600 dark:text-gray-400">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'tips' && (
                    <motion.div
                        key="tips"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="grid gap-3 sm:grid-cols-2"
                    >
                        {plan.tips.map((tip, i) => {
                            const Icon = ICON_MAP[tip.icon] || Lightbulb;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-2xl p-5 hover:shadow-lg hover:shadow-gray-200/20 dark:hover:shadow-none transition-shadow"
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
                                            <Icon size={18} className="text-white" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">{tip.title}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{tip.description}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

function generatePDFContent(plan) {
    return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Study Plan - ${plan.subject}</title>
<style>
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; color: #1f2937; }
h1 { color: #4f46e5; border-bottom: 2px solid #e5e7eb; padding-bottom: 12px; }
h2 { color: #6366f1; margin-top: 32px; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 24px 0; }
.stat { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; text-align: center; }
.stat-value { font-size: 24px; font-weight: bold; color: #4f46e5; }
.stat-label { font-size: 12px; color: #6b7280; margin-top: 4px; }
.topic { display: flex; align-items: center; gap: 12px; padding: 12px; background: #f9fafb; border-radius: 8px; margin-bottom: 8px; }
.topic-num { width: 32px; height: 32px; background: #4f46e5; color: white; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: bold; }
.day { padding: 12px; border-left: 3px solid #4f46e5; margin-bottom: 16px; }
.day-header { font-weight: bold; color: #1f2937; }
.day-session { color: #6b7280; font-size: 14px; margin-top: 4px; }
.tip { display: flex; gap: 12px; padding: 12px; background: #f0fdf4; border-radius: 8px; margin-bottom: 8px; }
@media print { body { padding: 20px; } }
</style>
</head>
<body>
<h1>📚 Study Plan: ${plan.subject}</h1>
<p><strong>Goal:</strong> ${plan.goal}</p>
<p><strong>Generated:</strong> ${new Date(plan.generatedAt).toLocaleDateString()}</p>
<div class="stats">
<div class="stat"><div class="stat-value">${plan.totalDays}</div><div class="stat-label">Total Days</div></div>
<div class="stat"><div class="stat-value">${plan.hoursPerDay}h</div><div class="stat-label">Per Day</div></div>
<div class="stat"><div class="stat-value">${plan.topics.length}</div><div class="stat-label">Topics</div></div>
<div class="stat"><div class="stat-value">${plan.totalHours}h</div><div class="stat-label">Total Hours</div></div>
</div>
<h2>📖 Topics</h2>
${plan.topics.map(t => `<div class="topic"><div class="topic-num">${t.id}</div><div><strong>${t.name}</strong><br><small>${t.complexity} · ${t.estimatedHours}h</small></div></div>`).join('')}
<h2>📅 Weekly Roadmap</h2>
${plan.weeklyRoadmap.map(w => `<div class="day"><div class="day-header">Week ${w.week}: ${w.title}</div><div class="day-session">${w.topics.map(t => t.name).join(', ')}</div><div class="day-session">Focus: ${w.focus}</div></div>`).join('')}
<h2>🔄 Revision Schedule</h2>
${plan.revisionSchedule.map(r => `<div class="day"><div class="day-header">${r.title} (Day ${r.day})</div><div class="day-session">${r.date} · ${r.estimatedHours}h · ${r.topics.join(', ')}</div></div>`).join('')}
<h2>💡 Tips</h2>
${plan.tips.map(t => `<div class="tip"><div><strong>${t.title}</strong><br><small>${t.description}</small></div></div>`).join('')}
</body>
</html>`;
}
