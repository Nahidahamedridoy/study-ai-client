import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function HeroSection() {
    return (
        <section className="relative min-h-[65vh] flex items-center justify-center overflow-hidden bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-900">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-50 via-white to-white dark:from-blue-900/10 dark:via-gray-950 dark:to-gray-950"></div>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-16">
                <div className="transition-all duration-1000 transform translate-y-0 opacity-100">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6 leading-tight">
                        Master Your Studies with <br className="hidden sm:block"/>
                        <span className="text-blue-600 dark:text-blue-400">StudyMate AI</span>
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
                        Your intelligent learning companion. Generate study plans, interact with our AI tutor, and organize resources effortlessly.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register">
                            <Button className="w-full sm:w-auto text-lg px-8 py-4 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                Start Learning Now
                            </Button>
                        </Link>
                        <Link href="/explore">
                            <Button className="w-full sm:w-auto text-lg px-8 py-4 bg-white text-gray-900 border-2 border-gray-200 hover:border-blue-200 hover:bg-blue-50 dark:bg-gray-900 dark:text-white dark:border-gray-700 dark:hover:border-blue-900 dark:hover:bg-gray-800 transition-all duration-300 shadow-sm">
                                Explore Resources
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
