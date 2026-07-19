'use client';
import { useState } from 'react';
import Section from '@/components/ui/Section';

const faqs = [
    { q: 'Is StudyMate AI free to use?', a: 'Yes! We offer a generous free tier that includes basic AI features and access to the resource library. Premium plans are available for advanced usage.' },
    { q: 'How does the AI Study Assistant work?', a: 'Our AI analyzes your provided notes, syllabi, or prompts to generate personalized summaries, flashcards, and quizzes designed specifically for your curriculum.' },
    { q: 'Can I collaborate with my classmates?', a: 'Absolutely. You can create public or private study groups, share resources, and discuss topics in real-time within the platform.' },
    { q: 'What subjects are supported?', a: 'StudyMate AI supports all major academic disciplines, from STEM fields to Humanities and Languages. If you have the notes, our AI can help you study them.' }
];

export default function FAQSection() {
    const [openIdx, setOpenIdx] = useState(0);

    return (
        <Section className="bg-gray-50 dark:bg-gray-900/50">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h2>
                </div>
                
                <div className="space-y-4">
                    {faqs.map((faq, idx) => (
                        <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                            <button 
                                className="w-full px-6 py-4 text-left font-bold text-gray-900 dark:text-white flex justify-between items-center focus:outline-none"
                                onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                            >
                                {faq.q}
                                <span className={`transform transition-transform ${openIdx === idx ? 'rotate-180' : ''}`}>
                                    ▼
                                </span>
                            </button>
                            {openIdx === idx && (
                                <div className="px-6 pb-4 text-gray-600 dark:text-gray-400">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
