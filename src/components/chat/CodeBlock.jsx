'use client';

import { useState } from 'react';
import { Check, Copy, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CodeBlock({ code, language }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-3 rounded-xl overflow-hidden border border-gray-200/60 dark:border-white/10 bg-gray-900 dark:bg-gray-950">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 dark:bg-white/[0.03] border-b border-gray-700/50 dark:border-white/5">
                <div className="flex items-center gap-2">
                    <Terminal size={12} className="text-gray-400" />
                    <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">
                        {language || 'code'}
                    </span>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                    <AnimatePresence mode="wait">
                        {copied ? (
                            <motion.span
                                key="check"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-1 text-emerald-400"
                            >
                                <Check size={12} /> Copied
                            </motion.span>
                        ) : (
                            <motion.span
                                key="copy"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex items-center gap-1"
                            >
                                <Copy size={12} /> Copy
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* Code */}
            <pre className="p-4 overflow-x-auto text-[13px] leading-relaxed">
                <code className="font-mono text-gray-300 dark:text-gray-200">
                    {code}
                </code>
            </pre>
        </div>
    );
}
