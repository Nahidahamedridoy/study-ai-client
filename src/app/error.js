'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className='flex flex-col items-center justify-center min-h-[50vh] space-y-4'>
            <h2 className='text-2xl font-bold text-red-600'>Something went wrong!</h2>
            <p className='text-gray-600'>An unexpected error occurred while loading this page.</p>
            <Button onClick={() => reset()}>Try again</Button>
        </div>
    );
}
