import Section from '@/components/ui/Section';

const steps = [
    { num: '01', title: 'Create an Account', desc: 'Sign up for free and tell us what subjects you are studying.' },
    { num: '02', title: 'Upload & Generate', desc: 'Upload your notes or let our AI generate custom study plans and flashcards for you.' },
    { num: '03', title: 'Study & Track', desc: 'Engage with interactive materials, track your progress, and master your subjects.' },
];

export default function HowItWorks() {
    return (
        <Section className="bg-gray-50 dark:bg-gray-900/50">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">How It Works</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                {/* Connecting line for desktop */}
                <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-blue-100 dark:bg-gray-800 -z-10"></div>
                
                {steps.map((step, idx) => (
                    <div key={idx} className="relative text-center">
                        <div className="w-24 h-24 mx-auto bg-white dark:bg-gray-900 border-4 border-blue-50 dark:border-gray-800 rounded-full flex items-center justify-center text-3xl font-black text-blue-600 dark:text-blue-400 mb-6 shadow-sm">
                            {step.num}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}
