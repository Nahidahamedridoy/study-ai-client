'use client';

import { useSession } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Returns the current session and redirects to /login if unauthenticated.
 * Usage: const { session, isPending } = useAuthGuard();
 */
export function useAuthGuard() {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isPending && !session) {
            router.replace('/login');
        }
    }, [session, isPending, router]);

    return { session, isPending };
}
