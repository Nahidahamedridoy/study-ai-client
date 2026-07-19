'use client';

import { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import ChatMessage from './ChatMessage';
import TypingIndicator from './TypingIndicator';

export default function ChatMessages({ messages, isStreaming, onRegenerate }) {
    const bottomRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isStreaming]);

    return (
        <div
            ref={containerRef}
            className="flex-1 overflow-y-auto dashboard-scroll"
        >
            <div className="max-w-3xl mx-auto py-6 space-y-6">
                <AnimatePresence mode="popLayout">
                    {messages.map((msg, i) => (
                        <ChatMessage
                            key={msg.id}
                            message={msg}
                            isLast={i === messages.length - 1 && msg.role === 'assistant'}
                            onRegenerate={msg.role === 'assistant' ? onRegenerate : undefined}
                        />
                    ))}
                    {isStreaming && <TypingIndicator key="typing" />}
                </AnimatePresence>
                <div ref={bottomRef} />
            </div>
        </div>
    );
}
