'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, BookOpen, Target, Clock, Calendar, BarChart3, Loader2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

const STEPS = [
    { id: 'subject', label: 'Subject', icon: BookOpen },
    { id: 'goal', label: 'Goal', icon: Target },
    { id: 'schedule', label: 'Schedule', icon: Clock },
    { id: 'review', label: 'Review', icon: BarChart3 },
];

const SUBJECTS = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science',
    'Literature', 'History', 'Economics', 'Languages', 'Psychology',
    'Philosophy', 'Art History', 'Political Science', 'Sociology',
];

const DIFFICULTIES = [
    { value: 'beginner', label: 'Beginner', description: 'New to this subject', color: 'from-emerald-500 to-teal-500' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some prior knowledge', color: 'from-blue-500 to-indigo-500' },
    { value: 'advanced', label: 'Advanced', description: 'Deep dive required', color: 'from-purple-500 to-pink-500' },
];

const slideVariants = {
    enter: (direction) => ({ x: direction > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction) => ({ x: direction < 0 ? 300 : -300, opacity: 0 }),
};

export default function StudyPlannerForm({ onGenerate, isLoading }) {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const [formData, setFormData] = useState({
        subject: '',
        customSubject: '',
        goal: '',
        hoursPerDay: 3,
        deadline: '',
        difficulty: 'intermediate',
    });

    const updateForm = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    const canProceed = () => {
        switch (step) {
            case 0: return formData.subject || formData.customSubject;
            case 1: return formData.goal.trim().length > 0;
            case 2: return formData.hoursPerDay > 0 && formData.deadline;
            default: return true;
        }
    };

    const handleNext = () => {
        if (step < STEPS.length - 1) {
            setDirection(1);
            setStep(s => s + 1);
        }
    };

    const handleBack = () => {
        if (step > 0) {
            setDirection(-1);
            setStep(s => s - 1);
        }
    };

    const handleSubmit = () => {
        const subject = formData.subject === 'Other' ? formData.customSubject : formData.subject;
        onGenerate({
            subject,
            goal: formData.goal,
            hoursPerDay: formData.hoursPerDay,
            deadline: formData.deadline,
            difficulty: formData.difficulty,
        });
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-8 px-4">
                {STEPS.map((s, i) => {
                    const Icon = s.icon;
                    const isActive = i === step;
                    const isCompleted = i < step;
                    return (
                        <div key={s.id} className="flex items-center">
                            <motion.div
                                animate={{
                                    scale: isActive ? 1.1 : 1,
                                    backgroundColor: isCompleted ? '#6366f1' : isActive ? '#6366f1' : 'transparent',
                                }}
                                className={`relative flex items-center justify-center w-10 h-10 rounded-xl border-2 transition-colors ${
                                    isCompleted || isActive
                                        ? 'border-primary-500 text-white'
                                        : 'border-gray-200 dark:border-gray-700 text-gray-400 dark:text-gray-500'
                                }`}
                            >
                                {isCompleted ? (
                                    <motion.svg
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        className="w-5 h-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={3}
                                    >
                                        <motion.path
                                            d="M5 13l4 4L19 7"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </motion.svg>
                                ) : (
                                    <Icon size={18} />
                                )}
                                {isActive && (
                                    <motion.div
                                        layoutId="step-indicator"
                                        className="absolute inset-0 rounded-xl bg-primary-500/10"
                                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                    />
                                )}
                            </motion.div>
                            {i < STEPS.length - 1 && (
                                <div className={`w-12 sm:w-20 h-0.5 mx-2 rounded-full transition-colors ${
                                    i < step ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'
                                }`} />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Step Content */}
            <div className="relative overflow-hidden min-h-[320px]">
                <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                        key={step}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="w-full"
                    >
                        {step === 0 && (
                            <div className="space-y-4">
                                <div className="text-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">What subject are you studying?</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Choose from common subjects or enter your own</p>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                    {SUBJECTS.map(s => (
                                        <motion.button
                                            key={s}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => updateForm('subject', s)}
                                            className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                                formData.subject === s
                                                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                                                    : 'bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-primary-300 dark:hover:border-primary-500/30'
                                            }`}
                                        >
                                            {s}
                                        </motion.button>
                                    ))}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => updateForm('subject', 'Other')}
                                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                            formData.subject === 'Other'
                                                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                                                : 'bg-white dark:bg-white/[0.03] border border-dashed border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:border-primary-300'
                                        }`}
                                    >
                                        Other...
                                    </motion.button>
                                </div>
                                {formData.subject === 'Other' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <Input
                                            placeholder="Enter your subject"
                                            value={formData.customSubject}
                                            onChange={(e) => updateForm('customSubject', e.target.value)}
                                            className="mt-2"
                                        />
                                    </motion.div>
                                )}
                            </div>
                        )}

                        {step === 1 && (
                            <div className="space-y-4">
                                <div className="text-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">What's your study goal?</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Be specific about what you want to achieve</p>
                                </div>
                                <textarea
                                    value={formData.goal}
                                    onChange={(e) => updateForm('goal', e.target.value)}
                                    placeholder="e.g., Pass the final exam with an A, master calculus fundamentals, prepare for the GRE..."
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 resize-none transition-all"
                                />
                                <div className="flex flex-wrap gap-2">
                                    {['Ace the final exam', 'Build strong foundations', 'Prepare for certification', 'Improve grades'].map(suggestion => (
                                        <button
                                            key={suggestion}
                                            onClick={() => updateForm('goal', suggestion)}
                                            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6">
                                <div className="text-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Set your schedule</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">How much time can you dedicate?</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Hours per day</label>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min={1}
                                            max={10}
                                            value={formData.hoursPerDay}
                                            onChange={(e) => updateForm('hoursPerDay', Number(e.target.value))}
                                            className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary-500"
                                        />
                                        <div className="w-16 px-3 py-2 rounded-lg bg-primary-50 dark:bg-primary-500/10 text-center">
                                            <span className="text-lg font-bold text-primary-600 dark:text-primary-400">{formData.hoursPerDay}</span>
                                            <span className="text-xs text-primary-500 ml-1">hrs</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Deadline</label>
                                    <Input
                                        type="date"
                                        min={today}
                                        value={formData.deadline}
                                        onChange={(e) => updateForm('deadline', e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Difficulty level</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        {DIFFICULTIES.map(d => (
                                            <motion.button
                                                key={d.value}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => updateForm('difficulty', d.value)}
                                                className={`relative px-4 py-3 rounded-xl text-sm font-medium transition-all overflow-hidden ${
                                                    formData.difficulty === d.value
                                                        ? 'text-white shadow-lg'
                                                        : 'bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:border-primary-300'
                                                }`}
                                            >
                                                {formData.difficulty === d.value && (
                                                    <motion.div
                                                        layoutId="difficulty-bg"
                                                        className={`absolute inset-0 bg-gradient-to-r ${d.color}`}
                                                        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                                    />
                                                )}
                                                <span className="relative z-10">{d.label}</span>
                                            </motion.button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-4">
                                <div className="text-center mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Review your plan</h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Make sure everything looks right</p>
                                </div>

                                <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl p-5 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-500/10 flex items-center justify-center">
                                            <BookOpen size={20} className="text-primary-600 dark:text-primary-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Subject</p>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {formData.subject === 'Other' ? formData.customSubject : formData.subject}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-accent-100 dark:bg-accent-500/10 flex items-center justify-center">
                                            <Target size={20} className="text-accent-600 dark:text-accent-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Goal</p>
                                            <p className="font-semibold text-gray-900 dark:text-white">{formData.goal || 'Not specified'}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-secondary-100 dark:bg-secondary-500/10 flex items-center justify-center">
                                            <Clock size={20} className="text-secondary-600 dark:text-secondary-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Schedule</p>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {formData.hoursPerDay} hrs/day until {formData.deadline ? new Date(formData.deadline).toLocaleDateString() : 'TBD'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-secondary-100 dark:bg-secondary-500/10 flex items-center justify-center">
                                            <BarChart3 size={20} className="text-secondary-600 dark:text-secondary-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">Difficulty</p>
                                            <p className="font-semibold text-gray-900 dark:text-white capitalize">{formData.difficulty}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
                <Button
                    variant="ghost"
                    onClick={handleBack}
                    disabled={step === 0}
                    className="gap-2"
                >
                    <ChevronLeft size={16} />
                    Back
                </Button>

                {step < STEPS.length - 1 ? (
                    <Button
                        onClick={handleNext}
                        disabled={!canProceed()}
                        className="gap-2"
                    >
                        Continue
                        <ChevronRight size={16} />
                    </Button>
                ) : (
                    <Button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                Generate Plan
                                <ChevronRight size={16} />
                            </>
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
}
