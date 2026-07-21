'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
    const { theme, setTheme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-transparent">
                <span className="w-5 h-5 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
            </div>
        );
    }

    const currentTheme = theme === 'system' ? systemTheme : theme;

    return (
        <button
            onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
            className="relative p-2 rounded-full text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-colors"
            aria-label="Toggle theme"
        >
            <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                    {currentTheme === 'dark' ? (
                        <motion.div
                            key="dark"
                            initial={{ y: -20, opacity: 0, rotate: -90 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: 20, opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute"
                        >
                            <Moon size={20} className="text-amber-300" fill="currentColor" fillOpacity={0.2} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="light"
                            initial={{ y: -20, opacity: 0, rotate: 90 }}
                            animate={{ y: 0, opacity: 1, rotate: 0 }}
                            exit={{ y: 20, opacity: 0, rotate: -90 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute"
                        >
                            <Sun size={20} className="text-amber-500" fill="currentColor" fillOpacity={0.2} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </button>
    );
}
