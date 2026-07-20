'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';
import { Loader2, Mail, ArrowLeft } from 'lucide-react';

export default function ForgotPasswordView() {
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const { register, handleSubmit, formState: { errors }, getValues } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        const { error } = await authClient.forgetPassword({
            email: data.email,
            redirectTo: '/reset-password',
        });

        setIsLoading(false);
        if (error) {
            toast.error(error.message || 'Failed to send reset email');
        } else {
            setEmailSent(true);
            toast.success('Reset email sent!');
        }
    };

    if (emailSent) {
        return (
            <div className="relative flex items-center justify-center min-h-[calc(100vh-64px)] bg-white dark:bg-gray-950 p-4 overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
                <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-accent-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-md p-8 space-y-6 glass rounded-2xl shadow-xl text-center"
                >
                    <div className="mx-auto w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
                        <Mail size={32} className="text-primary-600 dark:text-primary-400" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Check Your Email</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                        We sent a password reset link to <span className="font-semibold text-gray-700 dark:text-gray-300">{getValues('email')}</span>
                    </p>
                    <p className="text-gray-400 dark:text-gray-500 text-xs">
                        Didn't receive the email? Check your spam folder or try again.
                    </p>
                    <Button variant="secondary" onClick={() => setEmailSent(false)} className="w-full">
                        Try Again
                    </Button>
                    <Link href="/login" className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                        <ArrowLeft size={16} />
                        Back to Sign In
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="relative flex items-center justify-center min-h-[calc(100vh-64px)] bg-white dark:bg-gray-950 p-4 overflow-hidden">
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-accent-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-md p-8 space-y-6 glass rounded-2xl shadow-xl"
            >
                <div className="text-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Forgot Password?</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
                        Enter your email and we'll send you a reset link
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-1.5">Email</label>
                        <Input
                            type="email"
                            className={`w-full ${errors.email ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : ''}`}
                            placeholder="you@example.com"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
                    </div>

                    <Button type="submit" disabled={isLoading} className="w-full text-base py-2.5 flex items-center justify-center gap-2">
                        {isLoading && <Loader2 size={18} className="animate-spin" />}
                        {isLoading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                </form>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    <Link href="/login" className="inline-flex items-center gap-1 font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                        <ArrowLeft size={16} />
                        Back to Sign In
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
