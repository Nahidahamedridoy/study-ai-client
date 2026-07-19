'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createResource } from '@/services/resource.service';
import { useAuthGuard } from '@/hooks/useAuthGuard';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const CATEGORIES = ['Computer Science', 'Mathematics', 'Physics & Astronomy', 'Biology', 'Chemistry', 'Literature', 'History', 'Economics', 'Languages', 'Other'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const initialForm = { title: '', description: '', category: '', level: '', tags: '', image: '' };

export default function AddResourcePage() {
    useAuthGuard();
    const [form, setForm] = useState(initialForm);
    const [success, setSuccess] = useState(false);

    const { mutate, isPending, isError, error, reset } = useMutation({
        mutationFn: (data) => createResource(data),
        onSuccess: () => {
            setSuccess(true);
            setForm(initialForm);
            setTimeout(() => setSuccess(false), 4000);
        },
    });

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (isError) reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        };
        mutate(payload);
    };

    return (
        <div className="p-6 md:p-8 max-w-3xl">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mb-2">Add Resource</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Share a study resource with the StudyMate AI community.</p>

            {success && (
                <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 px-4 py-3 rounded-xl mb-6">
                    <CheckCircle size={18} />
                    <span className="text-sm font-medium">Resource created successfully!</span>
                </div>
            )}
            {isError && (
                <div className="flex items-center gap-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 px-4 py-3 rounded-xl mb-6">
                    <AlertCircle size={18} />
                    <span className="text-sm font-medium">{error?.message ?? 'Failed to create resource. Please try again.'}</span>
                </div>
            )}

            <Card className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Title *</label>
                        <Input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="e.g. Advanced Calculus Notes"
                            className="w-full"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Description *</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe what this resource covers..."
                            rows={5}
                            required
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Category *</label>
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            >
                                <option value="">Select category</option>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Level *</label>
                            <select
                                name="level"
                                value={form.level}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 dark:border-gray-700 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                            >
                                <option value="">Select level</option>
                                {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Tags</label>
                        <Input
                            name="tags"
                            value={form.tags}
                            onChange={handleChange}
                            placeholder="calculus, math, derivatives  (comma-separated)"
                            className="w-full"
                        />
                        <p className="text-xs text-gray-400 mt-1">Separate multiple tags with commas.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Cover Image URL</label>
                        <Input
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            placeholder="https://..."
                            className="w-full"
                        />
                    </div>

                    <Button type="submit" disabled={isPending} className="w-full sm:w-auto px-8 flex items-center gap-2">
                        {isPending && <Loader2 size={16} className="animate-spin" />}
                        {isPending ? 'Creating...' : 'Create Resource'}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
