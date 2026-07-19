'use client';

import { useMemo } from 'react';
import CodeBlock from './CodeBlock';

function parseInline(text) {
    const parts = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
        // Code inline
        let match = remaining.match(/^`([^`]+)`/);
        if (match) {
            parts.push(
                <code key={key++} className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-primary-600 dark:text-primary-400 text-[13px] font-mono border border-gray-200/60 dark:border-white/10">
                    {match[1]}
                </code>
            );
            remaining = remaining.slice(match[0].length);
            continue;
        }

        // Bold
        match = remaining.match(/^\*\*(.+?)\*\*/);
        if (match) {
            parts.push(<strong key={key++} className="font-semibold text-gray-900 dark:text-white">{match[1]}</strong>);
            remaining = remaining.slice(match[0].length);
            continue;
        }

        // Italic
        match = remaining.match(/^\*(.+?)\*/);
        if (match) {
            parts.push(<em key={key++} className="italic text-gray-700 dark:text-gray-300">{match[1]}</em>);
            remaining = remaining.slice(match[0].length);
            continue;
        }

        // Link
        match = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
            parts.push(
                <a key={key++} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">
                    {match[1]}
                </a>
            );
            remaining = remaining.slice(match[0].length);
            continue;
        }

        // Regular text until next special char
        match = remaining.match(/^[^`*\[]+/);
        if (match) {
            parts.push(<span key={key++}>{match[0]}</span>);
            remaining = remaining.slice(match[0].length);
        } else {
            parts.push(<span key={key++}>{remaining[0]}</span>);
            remaining = remaining.slice(1);
        }
    }

    return parts;
}

export default function MarkdownRenderer({ content }) {
    const elements = useMemo(() => {
        if (!content) return null;

        const lines = content.split('\n');
        const result = [];
        let i = 0;
        let key = 0;

        while (i < lines.length) {
            const line = lines[i];

            // Code block
            if (line.startsWith('```')) {
                const lang = line.slice(3).trim();
                const codeLines = [];
                i++;
                while (i < lines.length && !lines[i].startsWith('```')) {
                    codeLines.push(lines[i]);
                    i++;
                }
                i++; // skip closing ```
                result.push(<CodeBlock key={key++} code={codeLines.join('\n')} language={lang} />);
                continue;
            }

            // Header
            const headerMatch = line.match(/^(#{1,3})\s+(.+)/);
            if (headerMatch) {
                const level = headerMatch[1].length;
                const Tag = `h${level}`;
                const sizes = { 1: 'text-lg', 2: 'text-base', 3: 'text-sm' };
                result.push(
                    <Tag key={key++} className={`${sizes[level]} font-bold text-gray-900 dark:text-white mt-3 mb-1`}>
                        {parseInline(headerMatch[2])}
                    </Tag>
                );
                i++;
                continue;
            }

            // Unordered list
            if (line.match(/^[-*]\s+/)) {
                const items = [];
                while (i < lines.length && lines[i].match(/^[-*]\s+/)) {
                    items.push(lines[i].replace(/^[-*]\s+/, ''));
                    i++;
                }
                result.push(
                    <ul key={key++} className="list-disc list-inside space-y-0.5 my-1 text-gray-700 dark:text-gray-300">
                        {items.map((item, j) => (
                            <li key={j} className="text-[14px] leading-relaxed">{parseInline(item)}</li>
                        ))}
                    </ul>
                );
                continue;
            }

            // Ordered list
            if (line.match(/^\d+\.\s+/)) {
                const items = [];
                while (i < lines.length && lines[i].match(/^\d+\.\s+/)) {
                    items.push(lines[i].replace(/^\d+\.\s+/, ''));
                    i++;
                }
                result.push(
                    <ol key={key++} className="list-decimal list-inside space-y-0.5 my-1 text-gray-700 dark:text-gray-300">
                        {items.map((item, j) => (
                            <li key={j} className="text-[14px] leading-relaxed">{parseInline(item)}</li>
                        ))}
                    </ol>
                );
                continue;
            }

            // Blockquote
            if (line.startsWith('> ')) {
                result.push(
                    <blockquote key={key++} className="border-l-3 border-primary-400 dark:border-primary-500 pl-4 py-1 my-2 bg-primary-50/50 dark:bg-primary-500/5 rounded-r-lg text-gray-600 dark:text-gray-400 text-[14px] italic">
                        {parseInline(line.slice(2))}
                    </blockquote>
                );
                i++;
                continue;
            }

            // Horizontal rule
            if (line.match(/^[-*_]{3,}$/)) {
                result.push(<hr key={key++} className="my-3 border-gray-200 dark:border-white/10" />);
                i++;
                continue;
            }

            // Empty line
            if (line.trim() === '') {
                i++;
                continue;
            }

            // Paragraph
            const paraLines = [];
            while (i < lines.length && lines[i].trim() !== '' && !lines[i].startsWith('```') && !lines[i].match(/^#{1,3}\s/) && !lines[i].match(/^[-*]\s+/) && !lines[i].match(/^\d+\.\s+/) && !lines[i].startsWith('> ') && !lines[i].match(/^[-*_]{3,}$/)) {
                paraLines.push(lines[i]);
                i++;
            }
            if (paraLines.length > 0) {
                result.push(
                    <p key={key++} className="text-[14px] leading-relaxed text-gray-700 dark:text-gray-300 my-1">
                        {parseInline(paraLines.join(' '))}
                    </p>
                );
            }
        }

        return result;
    }, [content]);

    return <div className="space-y-1">{elements}</div>;
}
