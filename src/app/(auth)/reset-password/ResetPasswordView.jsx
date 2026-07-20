'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Link from 'next/link';
import { Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react';
import { Suspense } from 'react';

function ResetPasswordForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        if (!token) {
            toast.error('Invalid or missing reset token');
            return;
        }

        setIsLoading(true);
        const { error } = await authClient.resetPassword({
            newPassword: data.password,
            token,
        });

        setIsLoading(false);
        if (error) {
            toast.error(error.message || 'Failed to reset password');
        } else {
            setSuccess(true);
            toast.success('Password reset successfully!');
            setTimeout(() => router.push('/login'), 2000);
        }
    };

    if (success) {
        return (
            <div className="relative flex items-center justify-center min-h-[calc(100vh-64px)] bg-white dark:bg-gray-950 p-4 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-md p-8 space-y-6 glass rounded-2xl shadow-xl text-center"
                >
                    <CheckCircle size={48} className="mx-auto text-green-500" />
                    <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">Password Reset!</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Redirecting to sign in...</p>
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
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Reset Password</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Enter your new password below</p>
                </div>

                {!token ? (
                    <div className="text-center space-y-4">
                        <p className="text-red-500 text-sm">Invalid or missing reset token.</p>
                        <Link href="/forgot-password" className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                            Request a new reset link
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-1.5">New Password</label>
                            <div className="relative">
                                <Input
                                    type={showPassword ? 'text' : 'password'}
                                    className={`w-full pr-10 ${errors.password ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : ''}`}
                                    placeholder="••••••••"
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: { value: 8, message: 'Password must be at least 8 characters' },
                                    })}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>}
                        </div>

                        <Button type="submit" disabled={isLoading} className="w-full text-base py-2.5 flex items-center justify-center gap-2">
                            {isLoading && <Loader2 size={18} className="animate-spin" />}
                            {isLoading ? 'Resetting...' : 'Reset Password'}
                        </Button>
                    </form>
                )}

                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    <Link href="/login" className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                        Back to Sign In
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense>
            <ResetPasswordForm />
        </Suspense>
    );
}
