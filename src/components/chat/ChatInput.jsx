'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SendHorizonal, Square, Paperclip } from 'lucide-react';

export default function ChatInput({ onSend, isLoading, disabled }) {
    const [input, setInput] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
        }
    }, [input]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading || disabled) return;
        onSend(input.trim());
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="border-t border-gray-100/80 dark:border-white/5 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 md:px-6 py-4">
                <div className="relative flex items-end gap-2 bg-white dark:bg-white/[0.03] border border-gray-200/60 dark:border-white/10 rounded-2xl shadow-lg shadow-gray-200/20 dark:shadow-none focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-300 dark:focus-within:border-primary-500/30 transition-all duration-200">
                    <textarea
                        ref={textareaRef}
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask me anything about your studies..."
                        rows={1}
                        disabled={disabled}
                        className="flex-1 bg-transparent px-4 py-3.5 text-[14px] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none resize-none max-h-[200px] disabled:opacity-50"
                    />
                    <div className="flex items-center gap-1 pr-2 pb-2">
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            disabled={!input.trim() || isLoading || disabled}
                            className={`p-2 rounded-xl transition-all duration-200 ${
                                input.trim() && !isLoading
                                    ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/30'
                                    : 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                            }`}
                        >
                            {isLoading ? (
                                <Square size={16} fill="currentColor" />
                            ) : (
                                <SendHorizonal size={16} />
                            )}
                        </motion.button>
                    </div>
                </div>
                <p className="text-center text-[11px] text-gray-400 dark:text-gray-500 mt-2">
                    AI can make mistakes. Consider checking important information.
                </p>
            </form>
        </div>
    );
}
