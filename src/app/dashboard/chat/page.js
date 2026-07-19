'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelLeftOpen, BrainCircuit, SendHorizonal, Square } from 'lucide-react';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatEmpty from '@/components/chat/ChatEmpty';
import { useMutation } from '@tanstack/react-query';
import { apiFetch } from '@/services/api';

function generateId() {
    return Math.random().toString(36).substring(2, 15);
}

export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    
    // Inline input state
    const [input, setInput] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
        }
    }, [input]);

    const chatMutation = useMutation({
        mutationFn: async (prompt) => {
            return apiFetch('/api/ai/chat', {
                method: 'POST',
                body: JSON.stringify({ prompt }),
            });
        },
        onSuccess: (data) => {
            // Append AI response
            if (data.chat && data.chat.response) {
                setMessages(prev => [
                    ...prev,
                    {
                        id: generateId(),
                        role: 'assistant',
                        content: data.chat.response,
                        createdAt: new Date().toISOString()
                    }
                ]);
            }
        },
        onError: () => {
            setMessages(prev => [
                ...prev,
                {
                    id: generateId(),
                    role: 'assistant',
                    content: 'Sorry, I encountered an error processing your request.',
                    createdAt: new Date().toISOString()
                }
            ]);
        }
    });

    const handleSend = useCallback((content) => {
        // Show user message immediately
        setMessages(prev => [
            ...prev,
            {
                id: generateId(),
                role: 'user',
                content,
                createdAt: new Date().toISOString()
            }
        ]);

        // Trigger mutation
        chatMutation.mutate(content);
    }, [chatMutation]);

    const handleRegenerate = useCallback(() => {
        if (chatMutation.isPending || messages.length < 2) return;
        
        // Find the last user message
        const lastUserMsg = [...messages].reverse().find(m => m.role === 'user');
        if (lastUserMsg) {
            // Remove the last assistant message if it exists at the end
            setMessages(prev => {
                const newMsgs = [...prev];
                if (newMsgs[newMsgs.length - 1].role === 'assistant') {
                    newMsgs.pop();
                }
                return newMsgs;
            });
            chatMutation.mutate(lastUserMsg.content);
        }
    }, [messages, chatMutation]);

    const handleNewChat = useCallback(() => {
        setMessages([]);
    }, []);

    // Form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim() || chatMutation.isPending) return;
        handleSend(input.trim());
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Chat Sidebar */}
            <ChatSidebar
                conversations={[]} // Empty for Step 1
                activeId={null}
                onSelect={() => {}}
                onNew={handleNewChat}
                onDelete={() => {}}
                collapsed={!sidebarOpen}
                onToggle={() => setSidebarOpen(s => !s)}
            />

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100/80 dark:border-white/5 bg-white/60 dark:bg-gray-950/60 backdrop-blur-xl">
                    {!sidebarOpen && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-white/5 transition-colors"
                        >
                            <PanelLeftOpen size={18} />
                        </motion.button>
                    )}
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-md shadow-primary-500/20">
                            <BrainCircuit size={14} className="text-white" />
                        </div>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">StudyMate AI</span>
                    </div>
                </div>

                {/* Messages or Empty State */}
                <AnimatePresence mode="wait">
                    {messages.length === 0 ? (
                        <ChatEmpty key="empty" onSuggestion={(s) => {
                            setInput(s);
                            handleSend(s);
                            setInput('');
                        }} />
                    ) : (
                        <ChatMessages
                            key="messages"
                            messages={messages}
                            isStreaming={chatMutation.isPending}
                            onRegenerate={handleRegenerate}
                        />
                    )}
                </AnimatePresence>

                {/* Input Area Inlined */}
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
                                disabled={chatMutation.isPending}
                                className="flex-1 bg-transparent px-4 py-3.5 text-[14px] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none resize-none max-h-[200px] disabled:opacity-50"
                            />
                            <div className="flex items-center gap-1 pr-2 pb-2">
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    disabled={!input.trim() || chatMutation.isPending}
                                    className={`p-2 rounded-xl transition-all duration-200 ${
                                        input.trim() && !chatMutation.isPending
                                            ? 'bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md shadow-primary-500/25 hover:shadow-lg hover:shadow-primary-500/30'
                                            : 'bg-gray-100 dark:bg-white/5 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    {chatMutation.isPending ? (
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
            </div>
        </div>
    );
}
