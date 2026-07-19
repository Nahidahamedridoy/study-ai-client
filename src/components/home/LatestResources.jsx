'use client';
import { useState, useEffect } from 'react';
import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import Skeleton from '@/components/ui/Skeleton';
import Button from '@/components/ui/Button';

export default function LatestResources() {
    const [resources, setResources] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulated API call for latest resources
        const fetchResources = async () => {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setResources([
                { id: 1, title: 'Advanced Calculus Notes', category: 'Mathematics', author: 'Dr. Smith' },
                { id: 2, title: 'Machine Learning Basics', category: 'Computer Science', author: 'AI Labs' },
                { id: 3, title: 'Organic Chemistry Flashcards', category: 'Chemistry', author: 'Sarah J.' },
                { id: 4, title: 'World History Timeline', category: 'History', author: 'Prof. Miller' },
                { id: 5, title: 'Macroeconomics Summary', category: 'Economics', author: 'Econ101' },
                { id: 6, title: 'Data Structures Guide', category: 'Computer Science', author: 'CodeMaster' },
                { id: 7, title: 'Physics Formula Sheet', category: 'Physics', author: 'Newton Fans' },
                { id: 8, title: 'Spanish Verb Conjugations', category: 'Languages', author: 'Maria G.' }
            ]);
            setLoading(false);
        };
        fetchResources();
    }, []);

    return (
        <Section className="bg-gray-50 dark:bg-gray-900/50">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Latest Resources</h2>
                <p className="mt-4 text-gray-600 dark:text-gray-400">Discover study materials recently added by our community.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {loading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                        <Card key={i} className="p-6">
                            <Skeleton className="h-4 w-1/4 mb-4" />
                            <Skeleton className="h-6 w-3/4 mb-4" />
                            <Skeleton className="h-4 w-1/2 mb-6" />
                            <Skeleton className="h-10 w-full" />
                        </Card>
                    ))
                ) : (
                    resources.map(resource => (
                        <Card key={resource.id} className="p-6 flex flex-col">
                            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                                {resource.category}
                            </span>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                {resource.title}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 mt-auto">
                                By {resource.author}
                            </p>
                            <Button className="w-full bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700">
                                View Resource
                            </Button>
                        </Card>
                    ))
                )}
            </div>
        </Section>
    );
}
