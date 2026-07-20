'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
    Mail, Phone, MapPin, Clock,
    MessageSquareHeart, Send, ChevronDown, BrainCircuit,
    CheckCircle2, Sparkles, BookOpen, HeadphonesIcon,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import toast from 'react-hot-toast';

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
    }),
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07 } },
};

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const faqs = [
    {
        q: 'How do I get started with StudyMate AI?',
        a: 'Simply create a free account, set up your profile, and start exploring resources or chatting with the AI assistant. No credit card required.',
    },
    {
        q: 'Is StudyMate AI free to use?',
        a: 'StudyMate AI offers a generous free tier that includes access to the AI chat, resource library, and study planner. Premium plans with advanced features are coming soon.',
    },
    {
        q: 'Can I use StudyMate AI for any subject?',
        a: 'Absolutely. StudyMate AI is subject-agnostic. Whether you are studying mathematics, history, programming, or literature, the AI adapts to your needs.',
    },
    {
        q: 'How does the AI study plan generator work?',
        a: 'You provide your subject, exam date, and daily study hours. The AI then creates a day-by-day personalised schedule with topics and durations tailored to your timeline.',
    },
    {
        q: 'Is my data safe on StudyMate AI?',
        a: 'Yes. We take privacy seriously. All conversations and personal data are securely stored and never shared with third parties. You can delete your data at any time.',
    },
    {
        q: 'How do I report a bug or request a new feature?',
        a: 'Use the contact form on this page or open an issue on our GitHub repository. We review every submission and prioritise fixes and features based on user feedback.',
    },
];

// ─── Contact Info Items ───────────────────────────────────────────────────────
const contactInfo = [
    {
        icon: Mail,
        label: 'Email Us',
        value: 'nahidahamedridoy@gmail.com',
        href: 'mailto:nahidahamedridoy@gmail.com',
        color: 'from-primary-500 to-primary-600',
        shadow: 'shadow-primary-500/20',
    },
    {
        icon: Phone,
        label: 'Call Us',
        value: '+880 1555 123 4567',
        href: 'tel:+88015551234567',
        color: 'from-emerald-500 to-teal-500',
        shadow: 'shadow-emerald-500/20',
    },
    {
        icon: MapPin,
        label: 'Office',
        value: '123 Learning Lane, San Francisco, CA 94107',
        href: 'https://maps.google.com',
        color: 'from-rose-500 to-pink-500',
        shadow: 'shadow-rose-500/20',
    },
    {
        icon: Clock,
        label: 'Working Hours',
        value: 'Mon – Fri, 9 AM – 6 PM PST',
        color: 'from-amber-500 to-orange-500',
        shadow: 'shadow-amber-500/20',
    },
];

// Inline SVG social icons (Github / Linkedin removed from lucide-react v1+)
function GithubIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
    );
}

function LinkedinIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
    );
}

const socialLinks = [
    {
        icon: GithubIcon,
        label: 'GitHub',
        href: 'https://github.com/Nahidahamedridoy',
        color: 'hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10',
    },
    {
        icon: LinkedinIcon,
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/your-linkedin',
        color: 'hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10',
    },
];

// ─── FAQ Accordion Item ───────────────────────────────────────────────────────
function FAQItem({ q, a, index }) {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            variants={fadeUp}
            custom={index}
            className="border border-gray-200 dark:border-white/8 rounded-2xl overflow-hidden bg-white dark:bg-white/[0.02] shadow-sm hover:shadow-md dark:hover:shadow-none transition-shadow"
        >
            <button
                onClick={() => setOpen(o => !o)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 focus:outline-none"
            >
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{q}</span>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="flex-shrink-0 text-gray-400"
                >
                    <ChevronDown size={18} />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="px-6 pb-5 text-sm text-gray-500 dark:text-gray-400 leading-relaxed border-t border-gray-100 dark:border-white/5 pt-4">
                            {a}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = 'Name is required.';
        if (!form.email.trim()) {
            e.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            e.email = 'Please enter a valid email address.';
        }
        if (!form.subject.trim()) e.subject = 'Subject is required.';
        if (!form.message.trim()) {
            e.message = 'Message is required.';
        } else if (form.message.trim().length < 20) {
            e.message = 'Message must be at least 20 characters.';
        }
        return e;
    };

    const handleChange = (field) => (e) => {
        setForm(f => ({ ...f, [field]: e.target.value }));
        if (errors[field]) setErrors(err => ({ ...err, [field]: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
        }

        setLoading(true);
        // Simulate network request
        await new Promise(r => setTimeout(r, 1400));
        setLoading(false);
        setSubmitted(true);
        toast.success('Message sent! We will get back to you within 24 hours.');
        setForm({ name: '', email: '', subject: '', message: '' });
        setErrors({});
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <main className="min-h-screen bg-background">

            {/* ── Hero ──────────────────────────────────────────────────────── */}
            <section className="relative overflow-hidden pt-24 pb-16">
                {/* Background blobs */}
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary-500/10 blur-3xl" />
                    <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] rounded-full bg-accent-500/10 blur-3xl" />
                </div>

                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                    >
                        <motion.div variants={fadeUp} className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 shadow-xl shadow-primary-500/30 mb-6">
                            <MessageSquareHeart size={28} className="text-white" />
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4"
                        >
                            Get in{' '}
                            <span className="text-gradient">Touch</span>
                        </motion.h1>

                        <motion.p variants={fadeUp} className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                            Have a question, found a bug, or just want to share your feedback? We love hearing from our students. Our team typically responds within 24 hours.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* ── Contact Info ──────────────────────────────────────────────── */}
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        variants={stagger}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
                    >
                        {contactInfo.map((item, i) => {
                            const Icon = item.icon;
                            const content = (
                                <motion.div
                                    key={item.label}
                                    variants={fadeUp}
                                    custom={i}
                                    className="group relative flex flex-col items-start gap-4 p-5 rounded-2xl border border-gray-200/80 dark:border-white/8 bg-white dark:bg-white/[0.02] shadow-sm hover:shadow-lg dark:hover:shadow-none hover:-translate-y-0.5 transition-all duration-200"
                                >
                                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg ${item.shadow} flex-shrink-0`}>
                                        <Icon size={20} className="text-white" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">{item.label}</p>
                                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-snug">{item.value}</p>
                                    </div>
                                </motion.div>
                            );
                            return item.href ? <a href={item.href} key={item.label} target="_blank" rel="noopener noreferrer" className="block">{content}</a> : <div key={item.label}>{content}</div>;
                        })}
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        variants={fadeUp}
                        className="flex items-center gap-3 mt-6"
                    >
                        <span className="text-sm text-gray-400 dark:text-gray-500 font-medium">Find us on:</span>
                        {socialLinks.map(s => {
                            const Icon = s.icon;
                            return (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className={`inline-flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/8 transition-all duration-200 ${s.color}`}
                                >
                                    <Icon size={16} />
                                    {s.label}
                                </a>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* ── Contact Form ──────────────────────────────────────────────── */}
            <section className="py-12">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">

                        {/* Left callout */}
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-80px' }}
                            variants={stagger}
                            className="lg:col-span-2 space-y-6"
                        >
                            <motion.div variants={fadeUp}>
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">Send us a message</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                                    Fill in the form and we will reach out to you. Whether it is a feature request, a bug report, or just a hello — we read every message.
                                </p>
                            </motion.div>

                            {[
                                { icon: HeadphonesIcon, title: 'Dedicated Support', desc: 'Real humans, real help. No bots.' },
                                { icon: BookOpen, title: 'Knowledge Base', desc: 'Browse our guides for instant answers.' },
                                { icon: Sparkles, title: 'Feature Requests', desc: 'Shape the future of StudyMate AI.' },
                            ].map((item, i) => {
                                const Icon = item.icon;
                                return (
                                    <motion.div key={item.title} variants={fadeUp} custom={i + 1} className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-500/10 border border-primary-200/60 dark:border-primary-400/20 flex items-center justify-center flex-shrink-0">
                                            <Icon size={18} className="text-primary-600 dark:text-primary-400" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>

                        {/* Form */}
                        <motion.form
                            onSubmit={handleSubmit}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, margin: '-80px' }}
                            variants={fadeUp}
                            className="lg:col-span-3 bg-white dark:bg-white/[0.02] border border-gray-200/80 dark:border-white/8 rounded-3xl p-8 shadow-xl shadow-gray-200/40 dark:shadow-none space-y-5"
                        >
                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex flex-col items-center justify-center py-12 text-center gap-4"
                                    >
                                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
                                            <CheckCircle2 size={32} className="text-emerald-500" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Message Sent!</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Thanks for reaching out. We will reply within 24 hours.</p>
                                    </motion.div>
                                ) : (
                                    <motion.div key="form" className="space-y-5">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                                    Full Name <span className="text-rose-500">*</span>
                                                </label>
                                                <Input
                                                    id="contact-name"
                                                    placeholder="Nahid Ahmed"
                                                    value={form.name}
                                                    onChange={handleChange('name')}
                                                    error={errors.name}
                                                    disabled={loading}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                                    Email Address <span className="text-rose-500">*</span>
                                                </label>
                                                <Input
                                                    id="contact-email"
                                                    type="email"
                                                    placeholder="you@example.com"
                                                    value={form.email}
                                                    onChange={handleChange('email')}
                                                    error={errors.email}
                                                    disabled={loading}
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                                Subject <span className="text-rose-500">*</span>
                                            </label>
                                            <Input
                                                id="contact-subject"
                                                placeholder="e.g. Bug report, Feature request, General question"
                                                value={form.subject}
                                                onChange={handleChange('subject')}
                                                error={errors.subject}
                                                disabled={loading}
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                                Message <span className="text-rose-500">*</span>
                                            </label>
                                            <Textarea
                                                id="contact-message"
                                                placeholder="Tell us how we can help you..."
                                                rows={6}
                                                value={form.message}
                                                onChange={handleChange('message')}
                                                error={errors.message}
                                                disabled={loading}
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            variant="primary"
                                            size="lg"
                                            className="w-full"
                                            isLoading={loading}
                                            disabled={loading}
                                        >
                                            {!loading && <Send size={16} className="mr-2" />}
                                            {loading ? 'Sending...' : 'Send Message'}
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.form>
                    </div>
                </div>
            </section>

            {/* ── FAQ ───────────────────────────────────────────────────────── */}
            <section className="py-16">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        variants={stagger}
                    >
                        <motion.div variants={fadeUp} className="text-center mb-10">
                            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                                Frequently Asked Questions
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Quick answers to questions we hear most often.
                            </p>
                        </motion.div>

                        <div className="space-y-3">
                            {faqs.map((faq, i) => (
                                <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── CTA ───────────────────────────────────────────────────────── */}
            <section className="py-16 pb-24">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: '-80px' }}
                        variants={fadeUp}
                        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 via-primary-500 to-accent-500 p-10 text-center shadow-2xl shadow-primary-500/30"
                    >
                        {/* Decorative glows */}
                        <div className="pointer-events-none absolute -top-10 -left-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
                        <div className="pointer-events-none absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm mb-5">
                                <BrainCircuit size={26} className="text-white" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                                Ready to supercharge your studies?
                            </h2>
                            <p className="text-primary-100 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
                                Join thousands of students using StudyMate AI to learn smarter — with AI-powered chat, personalised study plans, and a curated resource library.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                                <Link href="/register">
                                    <Button variant="secondary" size="lg" className="min-w-[160px]">
                                        Get Started Free
                                    </Button>
                                </Link>
                                <Link href="/dashboard/chat">
                                    <Button
                                        size="lg"
                                        className="min-w-[160px] bg-white/20 hover:bg-white/30 text-white border-white/30 shadow-none focus:ring-white/40"
                                    >
                                        Try AI Chat
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

        </main>
    );
}
