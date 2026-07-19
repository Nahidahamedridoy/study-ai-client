'use client';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
        <Section className="bg-blue-600 text-white dark:bg-gray-900 border-y border-blue-700 dark:border-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-6">Visualize Your Progress</h2>
                    <p className="text-blue-100 dark:text-gray-300 text-lg mb-8 leading-relaxed">
                        Track your study hours, measure efficiency, and identify peak learning times. Our powerful analytics help you optimize your routine for maximum retention.
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-blue-700 dark:bg-gray-800 p-6 rounded-2xl">
                            <div className="text-4xl font-extrabold mb-2">92%</div>
                            <div className="text-blue-200 dark:text-gray-400 text-sm font-medium">Average Retention Rate</div>
                        </div>
                        <div className="bg-blue-700 dark:bg-gray-800 p-6 rounded-2xl">
                            <div className="text-4xl font-extrabold mb-2">3x</div>
                            <div className="text-blue-200 dark:text-gray-400 text-sm font-medium">Faster Learning</div>
                        </div>
                    </div>
                </div>
                
                <Card className="p-4 bg-white dark:bg-gray-950">
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-gray-800" />
                                <XAxis dataKey="name" tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                                <YAxis tick={{fill: '#6b7280'}} axisLine={false} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="hours" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>
            </div>
        </Section>
    );
}
