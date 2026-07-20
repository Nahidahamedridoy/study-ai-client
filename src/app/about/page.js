'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    BrainCircuit, BookOpen, MessageSquare, CalendarDays,
    Sparkles, ShieldCheck, Zap, Globe, Users,
    Mail, ArrowRight, Check, Star
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

/* ── Animation helpers ── */
const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.6, ease: 'easeOut', delay },
});

const stagger = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 280, damping: 24 } },
};

/* ── Data ── */
const FEATURES = [
    {
        icon: BrainCircuit,
        title: 'AI-Powered Assistant',
        desc: 'Ask any academic question and get detailed, intelligent answers from Gemini AI — your personal tutor available 24/7.',
        gradient: 'from-primary-500 to-primary-600',
    },
    {
        icon: BookOpen,
        title: 'Resource Library',
        desc: 'Browse and discover thousands of curated study materials across every subject, level, and category.',
        gradient: 'from-secondary-500 to-secondary-600',
    },
    {
        icon: CalendarDays,
        title: 'Smart Study Planner',
        desc: 'Generate personalised day-by-day study plans based on your exam date, subject, and daily availability.',
        gradient: 'from-accent-500 to-cyan-600',
    },
    {
        icon: MessageSquare,
        title: 'Chat History',
        desc: 'Every AI conversation is saved so you can revisit explanations, build on past sessions, and track your progress.',
        gradient: 'from-emerald-500 to-teal-600',
    },
    {
        icon: Globe,
        title: 'Explore & Discover',
        desc: 'Filter resources by category, level, and keyword. Find exactly what you need in seconds.',
        gradient: 'from-amber-500 to-orange-500',
    },
    {
        icon: ShieldCheck,
        title: 'Secure Authentication',
        desc: 'Your account and data are protected with Better Auth, a modern, developer-first authentication solution.',
        gradient: 'from-rose-500 to-pink-500',
    },
];

const STEPS = [
    {
        step: '01',
        title: 'Create Your Account',
        desc: 'Sign up in seconds with your email. No credit card, no friction — just instant access.',
    },
    {
        step: '02',
        title: 'Explore Resources',
        desc: 'Browse the community library or upload your own study materials to share with others.',
    },
    {
        step: '03',
        title: 'Chat with AI',
        desc: 'Ask StudyMate AI any academic question. Get clear, detailed answers powered by Gemini 2.5 Flash.',
    },
    {
        step: '04',
        title: 'Plan & Achieve',
        desc: 'Generate a personalised study plan and track your progress towards your goals.',
    },
];

const TECHS = [
    { name: 'Next.js 15', color: 'bg-gray-900 dark:bg-white text-white dark:text-gray-900', desc: 'App Router, RSC, SSR' },
    { name: 'Express.js', color: 'bg-green-600 text-white', desc: 'REST API backend' },
    { name: 'MongoDB', color: 'bg-emerald-600 text-white', desc: 'Document database' },
    { name: 'Better Auth', color: 'bg-violet-600 text-white', desc: 'Authentication' },
    { name: 'Gemini AI', color: 'bg-blue-600 text-white', desc: 'AI conversations & planning' },
    { name: 'TanStack Query', color: 'bg-red-600 text-white', desc: 'Server state & caching' },
    { name: 'Framer Motion', color: 'bg-pink-600 text-white', desc: 'Animations & transitions' },
    { name: 'Tailwind CSS', color: 'bg-cyan-600 text-white', desc: 'Utility-first styling' },
];

const WHY = [
    'Free to use — no hidden fees',
    'Powered by Gemini 2.5 Flash AI',
    'Community-driven resource library',
    'Personalised study plans in seconds',
    'Secure, privacy-first authentication',
    'Fully responsive for any device',
];

export default function AboutPage() {
    return (
        <div className="overflow-hidden">

            {/* ══ Hero ════════════════════════════════════════════════ */}
            <section className="relative py-24 md:py-36 px-4 text-center overflow-hidden">
                {/* Background blobs */}
                <div className="absolute inset-0 -z-10 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-primary-500/10 blur-[120px] animate-blob" />
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-500/10 blur-[120px] animate-blob animation-delay-2000" />
                </div>

                <motion.div {...fadeUp(0)} className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 dark:bg-primary-900/30 border border-primary-200/60 dark:border-primary-700/40 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-8 shadow-sm">
                        <Sparkles size={15} />
                        Built for students, by a student
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-none tracking-tight mb-6">
                        Study Smarter with{' '}
                        <span className="text-gradient">StudyMate AI</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto mb-10">
                        StudyMate AI is an all-in-one academic platform that combines a curated study resource library,
                        a Gemini-powered AI tutor, and an intelligent study planner — so you can focus on learning,
                        not searching.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link href="/explore">
                            <Button variant="primary" size="lg" className="shadow-xl shadow-primary-500/25">
                                Explore Resources <ArrowRight size={18} className="ml-2" />
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button variant="secondary" size="lg">
                                Get Started Free
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* ══ Mission & Vision ════════════════════════════════════ */}
            <section className="py-20 px-4 bg-gray-50/60 dark:bg-white/[0.02]">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div {...fadeUp(0)}>
                        <Card variant="default" className="p-8 h-full border-gray-200/60 dark:border-white/5 shadow-lg shadow-gray-200/30 dark:shadow-none relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-primary-500/5 blur-2xl" />
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25 mb-6">
                                <BrainCircuit size={24} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">Our Mission</h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                To democratise access to high-quality study resources and intelligent academic support
                                for every student, regardless of background. We believe great education tools should
                                be open, intuitive, and powered by the best AI technology available.
                            </p>
                        </Card>
                    </motion.div>

                    <motion.div {...fadeUp(0.1)}>
                        <Card variant="default" className="p-8 h-full border-gray-200/60 dark:border-white/5 shadow-lg shadow-gray-200/30 dark:shadow-none relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-accent-500/5 blur-2xl" />
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-accent-500/25 mb-6">
                                <Star size={24} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-4">Our Vision</h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                A world where every student has a personalised AI tutor, an infinite library of
                                peer-created study materials, and a smart planner — all in one place. We want
                                StudyMate AI to become the go-to platform for the next generation of learners.
                            </p>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* ══ Why Choose Us ══════════════════════════════════════ */}
            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp()} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                            Why Choose <span className="text-gradient">StudyMate AI</span>?
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                            Everything you need to study more effectively — in one beautifully designed platform.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <motion.div {...fadeUp(0.1)} className="space-y-4">
                            {WHY.map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.07, duration: 0.4 }}
                                    className="flex items-center gap-4 p-4 bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-2xl shadow-sm hover:shadow-md hover:border-primary-200 dark:hover:border-primary-800/40 transition-all duration-200 group"
                                >
                                    <div className="w-8 h-8 rounded-xl bg-primary-50 dark:bg-primary-900/30 border border-primary-100 dark:border-primary-800/40 flex items-center justify-center flex-shrink-0">
                                        <Check size={16} className="text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{item}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div {...fadeUp(0.2)} className="relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-3xl blur-3xl" />
                            <div className="relative bg-gradient-to-br from-primary-600 to-accent-600 rounded-3xl p-8 text-white shadow-2xl shadow-primary-500/20">
                                <div className="text-6xl font-black mb-2">∞</div>
                                <h3 className="text-2xl font-extrabold mb-3">Limitless Learning</h3>
                                <p className="text-white/80 leading-relaxed text-sm">
                                    With AI-powered tools and a growing community of contributors, StudyMate AI gets
                                    more powerful every day. Your study sessions are always backed by the latest
                                    knowledge and the smartest technology.
                                </p>
                                <div className="flex items-center gap-2 mt-6 text-sm text-white/70">
                                    <Zap size={16} className="text-yellow-300" />
                                    Powered by Gemini 2.5 Flash
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══ Key Features ════════════════════════════════════════ */}
            <section className="py-20 px-4 bg-gray-50/60 dark:bg-white/[0.02]">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp()} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                            Everything You Need to <span className="text-gradient">Excel</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                            Six powerful features designed around how students actually study.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-60px' }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    >
                        {FEATURES.map(({ icon: Icon, title, desc, gradient }) => (
                            <motion.div key={title} variants={staggerItem}>
                                <Card
                                    variant="default"
                                    className="p-6 h-full border-gray-200/60 dark:border-white/5 shadow-md shadow-gray-200/20 dark:shadow-none hover:shadow-xl hover:shadow-gray-200/30 dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 group gradient-border"
                                >
                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg mb-5 group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon size={22} className="text-white" />
                                    </div>
                                    <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-2">{title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ══ How It Works ════════════════════════════════════════ */}
            <section className="py-20 px-4">
                <div className="max-w-5xl mx-auto">
                    <motion.div {...fadeUp()} className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                            How It <span className="text-gradient">Works</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                            Get started in minutes. No complex setup required.
                        </p>
                    </motion.div>

                    <div className="relative">
                        {/* Connecting line (desktop) */}
                        <div className="hidden md:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-200 dark:via-primary-800/40 to-transparent z-0" />

                        <motion.div
                            variants={stagger}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-60px' }}
                            className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10"
                        >
                            {STEPS.map(({ step, title, desc }) => (
                                <motion.div key={step} variants={staggerItem} className="text-center">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-600 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-primary-500/20 relative">
                                        <span className="text-2xl font-black text-white">{step}</span>
                                    </div>
                                    <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-2">{title}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══ Technologies ════════════════════════════════════════ */}
            <section className="py-20 px-4 bg-gray-50/60 dark:bg-white/[0.02]">
                <div className="max-w-5xl mx-auto">
                    <motion.div {...fadeUp()} className="text-center mb-14">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                            Built with Modern <span className="text-gradient">Technology</span>
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
                            A carefully chosen stack that balances performance, developer experience, and scalability.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={stagger}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                    >
                        {TECHS.map(({ name, color, desc }) => (
                            <motion.div
                                key={name}
                                variants={staggerItem}
                                whileHover={{ y: -4 }}
                                className="bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-2xl p-5 text-center shadow-sm hover:shadow-md transition-all duration-200"
                            >
                                <span className={`inline-block text-xs font-extrabold px-3 py-1.5 rounded-lg mb-3 ${color}`}>
                                    {name}
                                </span>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ══ Meet the Developer ══════════════════════════════════ */}
            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <motion.div {...fadeUp()} className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
                            Meet the <span className="text-gradient">Developer</span>
                        </h2>
                    </motion.div>

                    <motion.div {...fadeUp(0.1)}>
                        <Card
                            variant="default"
                            className="p-8 md:p-10 border-gray-200/60 dark:border-white/5 shadow-xl shadow-gray-200/30 dark:shadow-none relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-full blur-3xl pointer-events-none" />

                            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 relative">
                                {/* Avatar */}
                                <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-primary-500/25 flex-shrink-0">
                                    NA
                                </div>

                                <div className="flex-1 text-center sm:text-left">
                                    <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-1">Nahid Ahamedridoy</h3>
                                    <p className="text-primary-600 dark:text-primary-400 font-bold text-sm mb-4">Full-Stack Developer · AI Enthusiast</p>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm mb-6">
                                        StudyMate AI was built as a passion project to solve a real problem — students spend more
                                        time searching for good study material than actually studying. As a developer who loves
                                        both education and AI, I wanted to build something that genuinely helps learners focus
                                        on what matters most: understanding and growth.
                                    </p>

                                    <div className="flex items-center justify-center sm:justify-start gap-3">
                                        <a
                                            href="https://github.com/Nahidahamedridoy"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                            </svg>
                                            GitHub
                                        </a>
                                        <a
                                            href="mailto:contact@studymateai.dev"
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-semibold hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
                                        >
                                            <Mail size={16} />
                                            Contact
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </section>

            {/* ══ CTA ═════════════════════════════════════════════════ */}
            <section className="py-24 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        {...fadeUp()}
                        className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 p-12 md:p-16 text-center shadow-2xl shadow-primary-500/25"
                    >
                        {/* Decorative dots */}
                        <div
                            className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{
                                backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                                backgroundSize: '30px 30px',
                            }}
                        />

                        <div className="relative">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold mb-6 backdrop-blur-sm">
                                <Sparkles size={13} />
                                Free forever for students
                            </div>

                            <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
                                Ready to Study Smarter?
                            </h2>
                            <p className="text-white/80 max-w-xl mx-auto mb-10 leading-relaxed">
                                Join thousands of students using StudyMate AI to discover resources,
                                get instant AI answers, and build better study habits.
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-4">
                                <Link href="/explore">
                                    <Button
                                        variant="secondary"
                                        size="lg"
                                        className="bg-white text-primary-700 hover:bg-white/90 shadow-xl border-0 font-bold"
                                    >
                                        Explore Resources <ArrowRight size={18} className="ml-2" />
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <Button
                                        size="lg"
                                        className="bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm shadow-lg font-bold"
                                    >
                                        Create Free Account
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
