'use client';

import { useSession } from '@/lib/auth-client';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Client-side auth guard — secondary layer behind Next.js middleware.
 *
 * Redirects unauthenticated users to /login, preserving the current path
 * as ?callbackUrl= so LoginView can send them back after a successful sign-in.
 *
 * Usage: const { session, isPending } = useAuthGuard();
 */
export function useAuthGuard() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isPending && !session) {
            router.replace(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
        }
    }, [session, isPending, router, pathname]);

    return { session, isPending };
}
