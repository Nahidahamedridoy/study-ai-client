'use client';

import Link from 'next/link';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950">
            
            {/* Animated Blobs Background */}
            <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-accent-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-secondary-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16 flex flex-col items-center">
                
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-500 dark:text-gray-400 mb-8 shadow-sm"
                >
                    <Sparkles size={14} className="text-red-500" />
                    <span className="font-medium text-sky-500">StudyMate AI 2.0 is now live</span>
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 leading-[1.1] max-w-4xl"
                >
                    Master your studies with <br className="hidden sm:block"/>
                    <span className="text-gradient">Intelligent AI</span>
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-6 text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light"
                >
                    Your premium learning companion. Generate study plans, interact with our advanced AI tutor, and organize resources effortlessly in one beautiful workspace.
                </motion.p>

                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto"
                >
                    <Link href="/register">
                        <Button variant="primary" size="lg" className="w-full sm:w-auto group">
                            Start Learning Now
                            <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                    <Link href="/explore">
                        <Button variant="secondary" size="lg" className="w-full sm:w-auto text-white">
                            Explore Resources
                        </Button>
                    </Link>
                </motion.div>

                {/* Abstract Hero Image/Dashboard Mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="mt-20 relative w-full max-w-5xl mx-auto"
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-950 via-transparent to-transparent z-10 h-full w-full"></div>
                    <div className="glass rounded-t-2xl p-2 md:p-4 border border-gray-200 dark:border-gray-700 shadow-2xl shadow-primary-500/10">
                        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 w-full h-[400px] md:h-[600px] overflow-hidden flex flex-col">
                            {/* Mockup Header */}
                            <div className="h-12 border-b border-gray-200 dark:border-gray-700 flex items-center px-4 gap-2 bg-gray-50/50 dark:bg-gray-900/50">
                                <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                                <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                            </div>
                            {/* Mockup Body (Abstract shapes inside) */}
                            <div className="flex-1 p-8 flex gap-6">
                                <div className="w-1/4 h-full hidden md:flex flex-col gap-4">
                                    <div className="w-full h-8 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                                    <div className="w-3/4 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                                    <div className="w-5/6 h-8 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
                                </div>
                                <div className="flex-1 flex flex-col gap-6">
                                    <div className="w-full h-48 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-2xl border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                                        <div className="w-32 h-32 rounded-full bg-primary-500/20 blur-2xl"></div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-2xl"></div>
                                        <div className="h-32 bg-gray-100 dark:bg-gray-800 rounded-2xl"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
