'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';

export default function MarkdownRenderer({ content }) {
    if (!content) return null;

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className="space-y-3 text-[14px] leading-relaxed text-gray-700 dark:text-gray-300"
            components={{
                code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    const isInline = !match && !String(children).includes('\n');

                    if (!isInline) {
                        return (
                            <CodeBlock 
                                code={String(children).replace(/\n$/, '')} 
                                language={match ? match[1] : ''} 
                            />
                        );
                    }
                    return (
                        <code 
                            className="px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-primary-600 dark:text-primary-400 text-[13px] font-mono border border-gray-200/60 dark:border-white/10" 
                            {...props}
                        >
                            {children}
                        </code>
                    );
                },
                h1({ children, ...props }) {
                    return <h1 className="text-lg font-bold text-gray-900 dark:text-white mt-4 mb-2" {...props}>{children}</h1>;
                },
                h2({ children, ...props }) {
                    return <h2 className="text-base font-bold text-gray-900 dark:text-white mt-4 mb-2" {...props}>{children}</h2>;
                },
                h3({ children, ...props }) {
                    return <h3 className="text-sm font-bold text-gray-900 dark:text-white mt-3 mb-1" {...props}>{children}</h3>;
                },
                ul({ children, ...props }) {
                    return <ul className="list-disc list-inside space-y-1 my-2" {...props}>{children}</ul>;
                },
                ol({ children, ...props }) {
                    return <ol className="list-decimal list-inside space-y-1 my-2" {...props}>{children}</ol>;
                },
                li({ children, ...props }) {
                    return <li className="leading-relaxed" {...props}>{children}</li>;
                },
                a({ children, href, ...props }) {
                    return <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline" {...props}>{children}</a>;
                },
                blockquote({ children, ...props }) {
                    return (
                        <blockquote 
                            className="border-l-3 border-primary-400 dark:border-primary-500 pl-4 py-1 my-3 bg-primary-50/50 dark:bg-primary-500/5 rounded-r-lg text-gray-600 dark:text-gray-400 italic"
                            {...props}
                        >
                            {children}
                        </blockquote>
                    );
                },
                hr({ ...props }) {
                    return <hr className="my-4 border-gray-200 dark:border-white/10" {...props} />;
                },
                p({ children, ...props }) {
                    return <p className="my-2" {...props}>{children}</p>;
                },
                table({ children, ...props }) {
                    return (
                        <div className="overflow-x-auto my-4 rounded-lg border border-gray-200 dark:border-white/10">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-white/10" {...props}>
                                {children}
                            </table>
                        </div>
                    );
                },
                thead({ children, ...props }) {
                    return <thead className="bg-gray-50 dark:bg-white/5" {...props}>{children}</thead>;
                },
                tbody({ children, ...props }) {
                    return <tbody className="divide-y divide-gray-200 dark:divide-white/10 bg-white dark:bg-transparent" {...props}>{children}</tbody>;
                },
                tr({ children, ...props }) {
                    return <tr {...props}>{children}</tr>;
                },
                th({ children, ...props }) {
                    return <th className="px-4 py-3 text-left text-[13px] font-semibold text-gray-900 dark:text-white uppercase tracking-wider" {...props}>{children}</th>;
                },
                td({ children, ...props }) {
                    return <td className="px-4 py-3 text-[13px] text-gray-700 dark:text-gray-300" {...props}>{children}</td>;
                }
            }}
        >
            {content}
        </ReactMarkdown>
    );
}
