import Section from '@/components/ui/Section';
import Button from '@/components/ui/Button';
import Link from 'next/link';

export default function CTASection() {
    return (
        <Section className="py-24">
            <div className="bg-blue-600 dark:bg-blue-900 rounded-3xl p-8 md:p-16 text-center text-white shadow-xl relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 dark:bg-blue-800 rounded-full mix-blend-multiply filter blur-3xl opacity-70 transform -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500 dark:bg-emerald-800 rounded-full mix-blend-multiply filter blur-3xl opacity-50 transform translate-x-1/2 translate-y-1/2"></div>
                
                <div className="relative z-10 max-w-2xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Ready to Ace Your Exams?</h2>
                    <p className="text-blue-100 text-lg mb-10">
                        Join thousands of students who are already learning faster and smarter with StudyMate AI.
                    </p>
                    <Link href="/register">
                        <Button className="bg-white text-blue-700 hover:bg-gray-50 text-lg px-10 py-4 shadow-lg hover:shadow-xl transition-all">
                            Create Your Free Account
                        </Button>
                    </Link>
                </div>
            </div>
        </Section>
    );
}
