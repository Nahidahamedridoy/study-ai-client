'use client';

import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, Clock } from 'lucide-react';

const data = [
  { name: 'Mon', hours: 2, efficiency: 75 },
  { name: 'Tue', hours: 3.5, efficiency: 82 },
  { name: 'Wed', hours: 4, efficiency: 88 },
  { name: 'Thu', hours: 3, efficiency: 85 },
  { name: 'Fri', hours: 5, efficiency: 92 },
  { name: 'Sat', hours: 6, efficiency: 95 },
  { name: 'Sun', hours: 4.5, efficiency: 90 },
];

export default function StatsSection() {
    return (
        <Section className="bg-white dark:bg-gray-900 border-y border-gray-200 dark:border-gray-700 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-50/50 dark:from-primary-900/10 to-transparent pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">
                        Visualize your <span className="text-gradient">Progress</span>
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg mb-10 leading-relaxed max-w-lg">
                        Track your study hours, measure efficiency, and identify peak learning times. Our powerful analytics help you optimize your routine for maximum retention.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <Card variant="default" className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 group hover:border-primary-500/50 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg">
                                    <TrendingUp size={20} />
                                </div>
                            </div>
                            <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">92%</div>
                            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Average Retention Rate</div>
                        </Card>
                        
                        <Card variant="default" className="p-6 bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 group hover:border-accent-500/50 transition-colors">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 rounded-lg">
                                    <Clock size={20} />
                                </div>
                            </div>
                            <div className="text-4xl font-extrabold text-gray-900 dark:text-white mb-1 group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">3x</div>
                            <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">Faster Learning Pace</div>
                        </Card>
                    </div>
                </motion.div>
                
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, x: 30 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <Card variant="glass" className="p-6 md:p-8 shadow-xl shadow-primary-900/5 border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50">
                        <div className="mb-6 flex justify-between items-end">
                            <div>
                                <h3 className="text-lg font-bold text-foreground">Study Hours</h3>
                                <p className="text-sm text-text-muted">Past 7 Days</p>
                            </div>
                            <div className="text-sm font-semibold text-success bg-success/10 px-2.5 py-1 rounded-md">
                                +15% vs last week
                            </div>
                        </div>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-surface-border opacity-50" />
                                    <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} dy={10} />
                                    <YAxis tick={{fill: '#64748b', fontSize: 12}} axisLine={false} tickLine={false} dx={-10} />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '12px', border: '1px solid var(--surface-border)', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: 'var(--surface)' }}
                                        itemStyle={{ color: 'var(--foreground)' }}
                                    />
                                    <Area type="monotone" dataKey="hours" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </Section>
    );
}
