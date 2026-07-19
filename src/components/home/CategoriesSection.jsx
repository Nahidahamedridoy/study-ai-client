import Section from '@/components/ui/Section';
import Card from '@/components/ui/Card';

const categories = [
    { name: 'Computer Science', count: '1,200+ Resources' },
    { name: 'Mathematics', count: '850+ Resources' },
    { name: 'Physics & Astronomy', count: '640+ Resources' },
    { name: 'Biology', count: '920+ Resources' },
    { name: 'Literature', count: '430+ Resources' },
    { name: 'History', count: '550+ Resources' },
    { name: 'Economics', count: '780+ Resources' },
    { name: 'Languages', count: '1,100+ Resources' },
];

export default function CategoriesSection() {
    return (
        <Section>
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Explore Subjects</h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">Find study materials across every major discipline.</p>
                </div>
                <a href="/explore" className="hidden sm:block text-blue-600 hover:text-blue-700 dark:text-blue-400 font-medium">
                    View all categories &rarr;
                </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((cat, idx) => (
                    <Card key={idx} className="p-6 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 group">
                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{cat.name}</h3>
                        <p className="text-sm text-gray-500 mt-2">{cat.count}</p>
                    </Card>
                ))}
            </div>
        </Section>
    );
}
