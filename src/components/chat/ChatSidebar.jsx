'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    PanelLeftClose, PanelLeftOpen, Plus, MessageSquare, Trash2, Clock,
    Search, BrainCircuit, Sparkles
} from 'lucide-react';

const GROUP_TODAY = 'Today';
const GROUP_YESTERDAY = 'Yesterday';
const GROUP_OLDER = 'Previous 7 days';

function groupConversations(conversations) {
    const now = new Date();
    const today = now.toDateString();
    const yesterday = new Date(now - 86400000).toDateString();
    const weekAgo = new Date(now - 7 * 86400000).toDateString();

    const groups = { [GROUP_TODAY]: [], [GROUP_YESTERDAY]: [], [GROUP_OLDER]: [] };

    conversations.forEach(c => {
        const d = new Date(c.updatedAt).toDateString();
        if (d === today) groups[GROUP_TODAY].push(c);
        else if (d === yesterday) groups[GROUP_YESTERDAY].push(c);
        else groups[GROUP_OLDER].push(c);
    });

    return Object.entries(groups).filter(([, items]) => items.length > 0);
}

export default function ChatSidebar({
    conversations,
    activeId,
    onSelect,
    onNew,
    onDelete,
    collapsed,
    onToggle,
}) {
    const [search, setSearch] = useState('');
    const inputRef = useRef(null);

    const filtered = conversations.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase())
    );

    const grouped = groupConversations(filtered);

    return (
        <>
            {/* Mobile overlay */}
            <AnimatePresence>
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        onClick={onToggle}
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    width: collapsed ? 0 : 280,
                    opacity: collapsed ? 0 : 1,
                }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className={`flex-shrink-0 overflow-hidden border-r border-gray-200/60 dark:border-white/5 bg-white/60 dark:bg-gray-950/60 backdrop-blur-xl
                    ${collapsed ? 'lg:w-0' : 'w-[280px]'}
                    fixed lg:relative inset-y-0 left-0 z-50 lg:z-auto
                    flex flex-col h-full`}
            >
                <div className="flex flex-col h-full min-w-[280px]">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100/80 dark:border-white/5">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-md shadow-primary-500/20">
                                <BrainCircuit className="text-white" size={16} />
                            </div>
                            <span className="text-sm font-bold text-gray-900 dark:text-white">Chats</span>
                        </div>
                        <button
                            onClick={onToggle}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors lg:flex hidden"
                        >
                            <PanelLeftClose size={16} />
                        </button>
                    </div>

                    {/* New Chat Button */}
                    <div className="px-3 pt-3">
                        <motion.button
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={onNew}
                            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white text-sm font-semibold shadow-lg shadow-primary-500/25 border border-primary-500/50 transition-all duration-200"
                        >
                            <Plus size={16} strokeWidth={2.5} />
                            New Chat
                        </motion.button>
                    </div>

                    {/* Search */}
                    <div className="px-3 pt-3">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100/60 dark:bg-white/[0.04] border border-gray-200/60 dark:border-white/5 text-gray-400 dark:text-gray-500 transition-all duration-200 focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:border-primary-300 dark:focus-within:border-primary-500/30">
                            <Search size={14} />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search conversations..."
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                className="bg-transparent text-sm outline-none w-full text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                            />
                        </div>
                    </div>

                    {/* Conversations List */}
                    <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
                        {grouped.length === 0 ? (
                            <div className="text-center py-8">
                                <MessageSquare size={32} className="mx-auto mb-2 text-gray-300 dark:text-gray-600" />
                                <p className="text-xs text-gray-400 dark:text-gray-500">
                                    {search ? 'No matching conversations' : 'No conversations yet'}
                                </p>
                            </div>
                        ) : (
                            grouped.map(([group, items]) => (
                                <div key={group}>
                                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1.5 px-1">
                                        {group}
                                    </p>
                                    <div className="space-y-0.5">
                                        {items.map(conv => (
                                            <motion.div
                                                key={conv.id}
                                                layout
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -10 }}
                                                className={`group flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all duration-150 ${
                                                    activeId === conv.id
                                                        ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-700 dark:text-primary-300 border border-primary-200/60 dark:border-primary-400/20'
                                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100/60 dark:hover:bg-white/5'
                                                }`}
                                                onClick={() => onSelect(conv.id)}
                                            >
                                                <MessageSquare size={14} className="flex-shrink-0 opacity-50" />
                                                <span className="text-[13px] truncate flex-1">{conv.title}</span>
                                                <button
                                                    onClick={e => { e.stopPropagation(); onDelete(conv.id); }}
                                                    className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-rose-100 dark:hover:bg-rose-500/10 text-gray-400 hover:text-rose-500 transition-all"
                                                >
                                                    <Trash2 size={12} />
                                                </button>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </motion.aside>
        </>
    );
}
