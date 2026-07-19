import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';

const testimonials = [
    {
        quote: "StudyMate AI completely changed how I prepare for my finals. The AI study plans are incredibly accurate and saved me hours of scheduling.",
        author: "Alex Johnson",
        role: "Computer Science Student"
    },
    {
        quote: "The ability to generate flashcards instantly from my lecture notes is a game-changer. My grades have never been better.",
        author: "Samantha Lee",
        role: "Medical Student"
    },
    {
        quote: "I love the collaborative groups. Being able to share resources and chat with classmates in one place keeps us all motivated.",
        author: "David Chen",
        role: "High School Senior"
    }
];

export default function Testimonials() {
    return (
        <Section>
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">What Students Say</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((test, idx) => (
                    <Card key={idx} className="p-8">
                        <div className="flex text-emerald-500 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 italic mb-6">"{test.quote}"</p>
                        <div>
                            <div className="font-bold text-gray-900 dark:text-white">{test.author}</div>
                            <div className="text-sm text-gray-500">{test.role}</div>
                        </div>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
