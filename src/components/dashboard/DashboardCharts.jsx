'use client';

import { motion } from 'framer-motion';
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';

const WEEKLY_DATA = [
    { day: 'Mon', resources: 4, aiChats: 12 },
    { day: 'Tue', resources: 7, aiChats: 18 },
    { day: 'Wed', resources: 3, aiChats: 9 },
    { day: 'Thu', resources: 10, aiChats: 24 },
    { day: 'Fri', resources: 6, aiChats: 15 },
    { day: 'Sat', resources: 2, aiChats: 8 },
    { day: 'Sun', resources: 5, aiChats: 11 },
];

const CATEGORY_DATA = [
    { name: 'Computer Science', value: 34, color: '#6366f1' },
    { name: 'Mathematics', value: 22, color: '#8b5cf6' },
    { name: 'Physics', value: 16, color: '#06b6d4' },
    { name: 'Biology', value: 12, color: '#22c55e' },
    { name: 'Literature', value: 9, color: '#f59e0b' },
    { name: 'Other', value: 7, color: '#94a3b8' },
];

const PROGRESS_DATA = [
    { week: 'W1', completed: 3, inProgress: 5 },
    { week: 'W2', completed: 6, inProgress: 4 },
    { week: 'W3', completed: 8, inProgress: 6 },
    { week: 'W4', completed: 11, inProgress: 3 },
    { week: 'W5', completed: 9, inProgress: 7 },
    { week: 'W6', completed: 14, inProgress: 5 },
];

function ChartTooltip({ active, payload, label }) {
    if (!active || !payload?.length) return null;
    return (
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-3 py-2 shadow-xl text-xs">
            <p className="font-semibold text-gray-900 dark:text-white mb-1">{label}</p>
            {payload.map((entry, i) => (
                <p key={i} className="text-gray-500 dark:text-gray-400">
                    <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ backgroundColor: entry.color }} />
                    {entry.name}: <span className="font-semibold text-gray-900 dark:text-white">{entry.value}</span>
                </p>
            ))}
        </div>
    );
}

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function WeeklyActivityChart() {
    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-2xl p-5 overflow-hidden"
        >
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">Weekly Activity</h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Resources & AI chats this week</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-primary-500" /> Resources
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-accent-400" /> AI Chats
                    </span>
                </div>
            </div>
            <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={WEEKLY_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="gradResources" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="gradChats" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" vertical={false} />
                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                        <Tooltip content={<ChartTooltip />} />
                        <Area type="monotone" dataKey="resources" name="Resources" stroke="#6366f1" strokeWidth={2} fill="url(#gradResources)" />
                        <Area type="monotone" dataKey="aiChats" name="AI Chats" stroke="#06b6d4" strokeWidth={2} fill="url(#gradChats)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}

export function ResourceCategoriesChart() {
    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-2xl p-5 overflow-hidden"
        >
            <div className="mb-5">
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Resource Categories</h3>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Distribution by subject area</p>
            </div>
            <div className="h-[220px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={CATEGORY_DATA}
                            cx="50%"
                            cy="50%"
                            innerRadius={55}
                            outerRadius={85}
                            paddingAngle={3}
                            dataKey="value"
                            stroke="none"
                        >
                            {CATEGORY_DATA.map((entry, index) => (
                                <Cell key={index} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip content={<ChartTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
                {CATEGORY_DATA.map((cat) => (
                    <div key={cat.name} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                        <span className="truncate">{cat.name}</span>
                        <span className="ml-auto font-semibold text-gray-700 dark:text-gray-300">{cat.value}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export function LearningProgressChart() {
    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-2xl p-5 overflow-hidden"
        >
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">Learning Progress</h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Completed vs in-progress</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-success" /> Completed
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                        <span className="w-2.5 h-2.5 rounded-full bg-secondary-400" /> In Progress
                    </span>
                </div>
            </div>
            <div className="h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={PROGRESS_DATA} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" vertical={false} />
                        <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                        <Tooltip content={<ChartTooltip />} />
                        <Bar dataKey="completed" name="Completed" fill="#22c55e" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="inProgress" name="In Progress" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}
