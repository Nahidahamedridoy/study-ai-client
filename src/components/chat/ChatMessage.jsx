'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, RefreshCw, BrainCircuit, User, ThumbsUp, ThumbsDown } from 'lucide-react';
import MarkdownRenderer from './MarkdownRenderer';

export default function ChatMessage({ message, isLast, onRegenerate, onReact }) {
    const [copied, setCopied] = useState(false);
    const isUser = message.role === 'user';

    const handleCopy = async () => {
        await navigator.clipboard.writeText(message.content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`flex items-start gap-3 px-4 md:px-0 group ${isUser ? 'flex-row-reverse' : ''}`}
        >
            {/* Avatar */}
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md ${
                isUser
                    ? 'bg-gradient-to-br from-gray-700 to-gray-800 dark:from-gray-600 dark:to-gray-700 shadow-gray-500/20'
                    : 'bg-gradient-to-br from-primary-500 to-accent-500 shadow-primary-500/20'
            }`}>
                {isUser ? (
                    <User size={16} className="text-white" />
                ) : (
                    <BrainCircuit size={16} className="text-white" />
                )}
            </div>

            {/* Message Bubble */}
            <div className={`max-w-[80%] min-w-0 ${isUser ? 'text-right' : ''}`}>
                <div className={`inline-block text-left rounded-2xl px-4 py-3 ${
                    isUser
                        ? 'bg-gradient-to-br from-primary-600 to-primary-500 text-white rounded-tr-md shadow-lg shadow-primary-500/20'
                        : 'bg-white dark:bg-white/[0.03] border border-gray-100 dark:border-white/5 rounded-tl-md shadow-sm'
                }`}>
                    {isUser ? (
                        <p className="text-[14px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
                    ) : (
                        <MarkdownRenderer content={message.content} />
                    )}
                </div>

                {/* Actions */}
                {!isUser && (
                    <div className="flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleCopy}
                            className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                        >
                            {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                            {copied ? 'Copied' : 'Copy'}
                        </motion.button>
                        
                        {message.id && onReact && (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => onReact(message.id, message.reaction === 'like' ? null : 'like')}
                                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                                        message.reaction === 'like' 
                                            ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10' 
                                            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                                    }`}
                                >
                                    <ThumbsUp size={12} className={message.reaction === 'like' ? "fill-current" : ""} />
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => onReact(message.id, message.reaction === 'dislike' ? null : 'dislike')}
                                    className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium transition-colors ${
                                        message.reaction === 'dislike' 
                                            ? 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10' 
                                            : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5'
                                    }`}
                                >
                                    <ThumbsDown size={12} className={message.reaction === 'dislike' ? "fill-current" : ""} />
                                </motion.button>
                            </>
                        )}

                        {isLast && onRegenerate && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onRegenerate}
                                className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                            >
                                <RefreshCw size={12} />
                                Regenerate
                            </motion.button>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
