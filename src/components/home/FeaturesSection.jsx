'use client';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { BookOpen, BrainCircuit, Users, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        title: 'AI Study Assistant',
        description: 'Get instant answers, summaries, and explanations for complex topics using our advanced AI tutor.',
        icon: BrainCircuit,
    },
    {
        title: 'Smart Study Planner',
        description: 'Automatically generate personalized study schedules based on your goals and upcoming exams.',
        icon: Calendar,
    },
    {
        title: 'Resource Library',
        description: 'Access and organize thousands of community-shared flashcards, notes, and practice quizzes.',
        icon: BookOpen,
    },
    {
        title: 'Collaborative Groups',
        description: 'Form study groups, share resources in real-time, and learn together with peers globally.',
        icon: Users,
    }
];

export default function FeaturesSection() {
    return (
        <Section className="bg-background relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="text-center mb-16 max-w-3xl mx-auto relative z-10">
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-extrabold text-foreground"
                >
                    Designed for <span className="text-gradient">Peak Performance</span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="mt-4 text-text-muted text-lg"
                >
                    Everything you need to accelerate your learning, beautifully organized in one intelligent platform.
                </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative z-10">
                {features.map((feature, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="h-full"
                    >
                        <Card variant="gradient" className="p-8 h-full flex flex-col group">
                            <div className="h-14 w-14 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <feature.icon size={28} />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-3">{feature.title}</h3>
                            <p className="text-sm text-text-muted leading-relaxed flex-1">
                                {feature.description}
                            </p>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </Section>
    );
}
