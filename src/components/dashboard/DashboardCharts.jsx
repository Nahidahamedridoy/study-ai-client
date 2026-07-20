'use client';

import { motion } from 'framer-motion';
import {
    AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import Skeleton from '@/components/ui/Skeleton';

const PIE_COLORS = [
    '#6366f1', '#8b5cf6', '#06b6d4', '#22c55e',
    '#f59e0b', '#ec4899', '#94a3b8', '#f97316',
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

/* ── Weekly Activity: uses real resources (by created day) + real chat history ── */
export function WeeklyActivityChart({ resources = [], chats = [], loading = false }) {
    const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const weeklyData = DAYS.map(day => ({ day, resources: 0, aiChats: 0 }));

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    resources.forEach(r => {
        const d = new Date(r.createdAt);
        if (d >= weekAgo) {
            weeklyData[d.getDay()].resources += 1;
        }
    });
    chats.forEach(c => {
        const d = new Date(c.createdAt);
        if (d >= weekAgo) {
            weeklyData[d.getDay()].aiChats += 1;
        }
    });

    // Rotate array so today is last
    const todayIdx = now.getDay();
    const ordered = [...weeklyData.slice(todayIdx + 1), ...weeklyData.slice(0, todayIdx + 1)];

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
            {loading ? (
                <Skeleton className="h-[220px] w-full rounded-xl" />
            ) : (
                <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={ordered} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
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
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} allowDecimals={false} />
                            <Tooltip content={<ChartTooltip />} />
                            <Area type="monotone" dataKey="resources" name="Resources" stroke="#6366f1" strokeWidth={2} fill="url(#gradResources)" />
                            <Area type="monotone" dataKey="aiChats" name="AI Chats" stroke="#06b6d4" strokeWidth={2} fill="url(#gradChats)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            )}
        </motion.div>
    );
}

/* ── Resource Categories: built from real resource list ── */
export function ResourceCategoriesChart({ resources = [], loading = false }) {
    // Aggregate category counts from real resources
    const categoryMap = {};
    resources.forEach(r => {
        if (r.category) categoryMap[r.category] = (categoryMap[r.category] || 0) + 1;
    });
    const categoryData = Object.entries(categoryMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 8)
        .map(([name, value], i) => ({ name, value, color: PIE_COLORS[i % PIE_COLORS.length] }));

    const isEmpty = categoryData.length === 0;

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

            {loading ? (
                <Skeleton className="h-[220px] w-full rounded-xl" />
            ) : isEmpty ? (
                <div className="h-[220px] flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 text-xs">
                    <span className="text-4xl mb-2 opacity-30">📊</span>
                    No resources yet
                </div>
            ) : (
                <>
                    <div className="h-[180px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={80}
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={index} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip content={<ChartTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                        {categoryData.map((cat) => (
                            <div key={cat.name} className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
                                <span className="truncate">{cat.name}</span>
                                <span className="ml-auto font-semibold text-gray-700 dark:text-gray-300">{cat.value}</span>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </motion.div>
    );
}

/* ── Learning Progress: study plans created per month ── */
export function LearningProgressChart({ studyPlans = [], loading = false }) {
    const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const now = new Date();

    // Build last 6 months
    const months = Array.from({ length: 6 }, (_, i) => {
        const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
        return { month: MONTHS[d.getMonth()], year: d.getFullYear(), mIdx: d.getMonth(), plans: 0 };
    });

    studyPlans.forEach(p => {
        const d = new Date(p.createdAt);
        const slot = months.find(m => m.mIdx === d.getMonth() && m.year === d.getFullYear());
        if (slot) slot.plans += 1;
    });

    const isEmpty = studyPlans.length === 0;

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
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">Study Plans</h3>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Plans generated per month</p>
                </div>
            </div>

            {loading ? (
                <Skeleton className="h-[220px] w-full rounded-xl" />
            ) : isEmpty ? (
                <div className="h-[220px] flex flex-col items-center justify-center text-gray-400 dark:text-gray-500 text-xs">
                    <span className="text-4xl mb-2 opacity-30">📅</span>
                    No study plans yet
                </div>
            ) : (
                <div className="h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={months} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" vertical={false} />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} allowDecimals={false} />
                            <Tooltip content={<ChartTooltip />} />
                            <Bar dataKey="plans" name="Study Plans" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </motion.div>
    );
}
