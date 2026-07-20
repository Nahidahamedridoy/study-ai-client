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
import { Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginView() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    // Where to send the user after a successful login.
    // Falls back to /dashboard if no callbackUrl is present.
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const { register, handleSubmit, formState: { errors }, setValue } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        const { data: res, error } = await authClient.signIn.email({
            email: data.email,
            password: data.password,
        });
        
        setIsLoading(false);
        if (error) {
            toast.error(error.message || 'Failed to sign in');
        } else {
            toast.success('Successfully logged in!');
            router.push(callbackUrl);
        }
    };

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({ provider: 'google', callbackURL: callbackUrl });
    };

    const loadDemoCredentials = () => {
        setValue('email', 'demo@studymate.ai');
        setValue('password', 'demo12345');
        toast('Demo credentials loaded!', { icon: '✨' });
    };

    return (
        <div className='relative flex items-center justify-center min-h-[calc(100vh-64px)] bg-white dark:bg-gray-950 p-4 overflow-hidden'>
            {/* Animated Background Orbs */}
            <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-accent-500/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className='w-full max-w-md p-8 space-y-6 glass rounded-2xl shadow-xl'
            >
                <div className="text-center">
                    <h1 className='text-3xl font-extrabold text-gray-900 dark:text-white'>Welcome Back</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">Sign in to continue to StudyMate AI</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    <div>
                        <label className='block text-sm font-semibold text-gray-900 dark:text-white mb-1.5'>Email</label>
                        <Input 
                            type='email' 
                            className={`w-full ${errors.email ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : ''}`}
                            placeholder='you@example.com' 
                            {...register('email', { 
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })} 
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className='block text-sm font-semibold text-gray-900 dark:text-white mb-1.5'>Password</label>
                        <div className="relative">
                            <Input 
                                type={showPassword ? 'text' : 'password'} 
                                className={`w-full pr-10 ${errors.password ? 'border-red-500 focus:ring-red-200 focus:border-red-500' : ''}`}
                                placeholder='••••••••' 
                                {...register('password', { required: 'Password is required' })} 
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

                    <div className="flex justify-end">
                        <Link href="/forgot-password" className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                            Forgot password?
                        </Link>
                    </div>

                    <Button type="submit" disabled={isLoading} className='w-full text-base py-2.5 flex items-center justify-center gap-2'>
                        {isLoading && <Loader2 size={18} className="animate-spin" />}
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>

                <div className="relative flex items-center py-2">
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                    <span className="flex-shrink-0 mx-4 text-xs font-medium text-gray-500 dark:text-gray-400">OR</span>
                    <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                </div>

                <div className="space-y-3">
                    <Button variant="secondary" type="button" onClick={handleGoogleLogin} className="w-full flex justify-center items-center gap-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            <path d="M1 1h22v22H1z" fill="none" />
                        </svg>
                        Continue with Google
                    </Button>
                    <button onClick={loadDemoCredentials} className="w-full py-2.5 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        Use Demo Account
                    </button>
                </div>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                    Don't have an account? <Link href="/register" className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">Sign up</Link>
                </p>
            </motion.div>
        </div>
    );
}
