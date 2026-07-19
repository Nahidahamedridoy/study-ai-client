import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/utils/formatters';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Calendar, Tag, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LEVEL_COLORS = {
    Beginner:     'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    Intermediate: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    Advanced:     'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
};

export default function ResourceCard({ resource }) {
    const { _id, title, description, category, level, createdAt, image } = resource;

    return (
        <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="h-full"
        >
            <Card className="flex flex-col h-full group">
                {/* Image */}
                <div className="relative h-44 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0">
                    {image ? (
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-700">
                            <span className="text-4xl">📚</span>
                        </div>
                    )}
                    {/* Category badge */}
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                        {category}
                    </span>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5">
                    {/* Level */}
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full w-fit mb-3 ${LEVEL_COLORS[level] ?? LEVEL_COLORS.Beginner}`}>
                        <BarChart2 size={11} />
                        {level}
                    </span>

                    {/* Title */}
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-snug">
                        {title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 leading-relaxed flex-1">
                        {description}
                    </p>

                    {/* Date */}
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500 mb-4">
                        <Calendar size={12} />
                        {formatDate(createdAt)}
                    </div>

                    {/* CTA */}
                    <Link href={`/resources/${_id}`}>
                        <Button className="w-full text-sm py-2.5">
                            View Details
                        </Button>
                    </Link>
                </div>
            </Card>
        </motion.div>
    );
}
