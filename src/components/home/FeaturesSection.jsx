import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';
import { BookOpen, BrainCircuit, Users, Calendar } from 'lucide-react';

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
        <Section>
            <div className="text-center mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Why StudyMate AI?</h2>
                <p className="mt-4 text-gray-600 dark:text-gray-400 text-lg">
                    Everything you need to accelerate your learning, organized in one intelligent platform.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, idx) => (
                    <Card key={idx} className="p-8 text-center flex flex-col items-center">
                        <div className="h-16 w-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6">
                            <feature.icon size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                            {feature.description}
                        </p>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
