'use client';

import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PanelLeftOpen, BrainCircuit } from 'lucide-react';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatInput from '@/components/chat/ChatInput';
import ChatEmpty from '@/components/chat/ChatEmpty';

function generateId() {
    return Math.random().toString(36).substring(2, 15);
}

function getConversationsFromStorage() {
    if (typeof window === 'undefined') return [];
    try {
        return JSON.parse(localStorage.getItem('chat-conversations') || '[]');
    } catch {
        return [];
    }
}

function saveConversationsToStorage(conversations) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('chat-conversations', JSON.stringify(conversations));
}

function getMessagesFromStorage(conversationId) {
    if (typeof window === 'undefined') return [];
    try {
        const all = JSON.parse(localStorage.getItem('chat-messages') || '{}');
        return all[conversationId] || [];
    } catch {
        return [];
    }
}

function saveMessagesToStorage(conversationId, messages) {
    if (typeof window === 'undefined') return;
    try {
        const all = JSON.parse(localStorage.getItem('chat-messages') || '{}');
        all[conversationId] = messages;
        localStorage.setItem('chat-messages', JSON.stringify(all));
    } catch {
        // storage full or unavailable
    }
}

export default function ChatPage() {
    const [conversations, setConversations] = useState(() => getConversationsFromStorage());
    const [activeConversationId, setActiveConversationId] = useState(null);
    const [messagesMap, setMessagesMap] = useState({});
    const [isStreaming, setIsStreaming] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const abortRef = useRef(null);

    const messages = activeConversationId ? (messagesMap[activeConversationId] || getMessagesFromStorage(activeConversationId)) : [];

    const createConversation = useCallback((firstMessage) => {
        const id = generateId();
        const title = firstMessage.length > 40 ? firstMessage.slice(0, 40) + '...' : firstMessage;
        const now = new Date().toISOString();
        const conv = { id, title, createdAt: now, updatedAt: now };

        setConversations(prev => {
            const next = [conv, ...prev];
            saveConversationsToStorage(next);
            return next;
        });

        setActiveConversationId(id);
        return id;
    }, []);

    const updateConversationTitle = useCallback((convId, messages) => {
        if (messages.length >= 2) {
            const firstUserMsg = messages.find(m => m.role === 'user');
            if (firstUserMsg) {
                const title = firstUserMsg.content.length > 40
                    ? firstUserMsg.content.slice(0, 40) + '...'
                    : firstUserMsg.content;
                setConversations(prev => {
                    const next = prev.map(c => c.id === convId ? { ...c, title, updatedAt: new Date().toISOString() } : c);
                    saveConversationsToStorage(next);
                    return next;
                });
            }
        }
    }, []);

    const streamResponse = useCallback(async (conversationId, currentMessages) => {
        setIsStreaming(true);
        abortRef.current = new AbortController();

        const apiMessages = currentMessages.map(m => ({ role: m.role, content: m.content }));

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: apiMessages }),
                signal: abortRef.current.signal,
            });

            if (!response.ok) throw new Error('Failed to get response');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let assistantContent = '';

            const assistantMsg = {
                id: generateId(),
                role: 'assistant',
                content: '',
                createdAt: new Date().toISOString(),
            };

            // Add empty assistant message
            setMessagesMap(prev => {
                const msgs = [...(prev[conversationId] || []), assistantMsg];
                saveMessagesToStorage(conversationId, msgs);
                return { ...prev, [conversationId]: msgs };
            });

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                assistantContent += decoder.decode(value, { stream: true });

                setMessagesMap(prev => {
                    const msgs = (prev[conversationId] || []).map(m =>
                        m.id === assistantMsg.id ? { ...m, content: assistantContent } : m
                    );
                    saveMessagesToStorage(conversationId, msgs);
                    return { ...prev, [conversationId]: msgs };
                });
            }
        } catch (error) {
            if (error.name === 'AbortError') return;

            // Add error message
            const errorMsg = {
                id: generateId(),
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                createdAt: new Date().toISOString(),
            };

            setMessagesMap(prev => {
                const msgs = [...(prev[conversationId] || []), errorMsg];
                saveMessagesToStorage(conversationId, msgs);
                return { ...prev, [conversationId]: msgs };
            });
        } finally {
            setIsStreaming(false);
            abortRef.current = null;
        }
    }, []);

    const handleSend = useCallback(async (content) => {
        let convId = activeConversationId;

        const userMsg = {
            id: generateId(),
            role: 'user',
            content,
            createdAt: new Date().toISOString(),
        };

        if (!convId) {
            convId = createConversation(content);
            setMessagesMap(prev => {
                const msgs = [userMsg];
                saveMessagesToStorage(convId, msgs);
                return { ...prev, [convId]: msgs };
            });
        } else {
            setMessagesMap(prev => {
                const msgs = [...(prev[convId] || []), userMsg];
                saveMessagesToStorage(convId, msgs);
                return { ...prev, [convId]: msgs };
            });
            updateConversationTitle(convId, [...(messagesMap[convId] || []), userMsg]);
        }

        const currentMessages = [...(messagesMap[convId] || []), userMsg];
        await streamResponse(convId, currentMessages);
    }, [activeConversationId, messagesMap, createConversation, updateConversationTitle, streamResponse]);

    const handleRegenerate = useCallback(async () => {
        if (!activeConversationId || isStreaming) return;

        const currentMessages = messagesMap[activeConversationId] || [];
        // Remove last assistant message
        const filtered = currentMessages.filter(m => m.role !== 'assistant' || m !== currentMessages[currentMessages.length - 1]);

        setMessagesMap(prev => {
            saveMessagesToStorage(activeConversationId, filtered);
            return { ...prev, [activeConversationId]: filtered };
        });

        await streamResponse(activeConversationId, filtered);
    }, [activeConversationId, messagesMap, isStreaming, streamResponse]);

    const handleSelectConversation = useCallback((id) => {
        setActiveConversationId(id);
        setMessagesMap(prev => ({
            ...prev,
            [id]: prev[id] || getMessagesFromStorage(id),
        }));
    }, []);

    const handleNewChat = useCallback(() => {
        setActiveConversationId(null);
    }, []);

    const handleDeleteConversation = useCallback((id) => {
        setConversations(prev => {
            const next = prev.filter(c => c.id !== id);
            saveConversationsToStorage(next);
            return next;
        });

        setMessagesMap(prev => {
            const next = { ...prev };
            delete next[id];
            return next;
        });

        if (activeConversationId === id) {
            setActiveConversationId(null);
        }
    }, [activeConversationId]);

    return (
        <div className="flex h-screen bg-background overflow-hidden">
            {/* Chat Sidebar */}
            <ChatSidebar
                conversations={conversations}
                activeId={activeConversationId}
                onSelect={handleSelectConversation}
                onNew={handleNewChat}
                onDelete={handleDeleteConversation}
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
                        <ChatEmpty key="empty" onSuggestion={handleSend} />
                    ) : (
                        <ChatMessages
                            key="messages"
                            messages={messages}
                            isStreaming={isStreaming}
                            onRegenerate={handleRegenerate}
                        />
                    )}
                </AnimatePresence>

                {/* Input */}
                <ChatInput
                    onSend={handleSend}
                    isLoading={isStreaming}
                    disabled={false}
                />
            </div>
        </div>
    );
}
