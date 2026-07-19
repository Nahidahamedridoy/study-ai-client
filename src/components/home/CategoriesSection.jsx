'use client';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const categories = [
    { name: 'Computer Science', count: '1,200+ Resources' },
    { name: 'Mathematics', count: '850+ Resources' },
    { name: 'Physics & Astronomy', count: '640+ Resources' },
    { name: 'Biology', count: '920+ Resources' },
    { name: 'Literature', count: '430+ Resources' },
    { name: 'History', count: '550+ Resources' },
    { name: 'Economics', count: '780+ Resources' },
    { name: 'Languages', count: '1,100+ Resources' },
];

export default function CategoriesSection() {
    return (
        <Section className="bg-background">
            <div className="flex justify-between items-end mb-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Explore Subjects</h2>
                    <p className="mt-2 text-text-muted">Find study materials across every major discipline.</p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <Link href="/explore" className="hidden sm:flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 font-semibold transition-colors group">
                        View all categories <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((cat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                    >
                        <Card className="p-6 cursor-pointer hover:border-primary-500/50 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300 group bg-surface">
                            <h3 className="font-bold text-foreground group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{cat.name}</h3>
                            <p className="text-sm text-text-muted mt-2">{cat.count}</p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}
