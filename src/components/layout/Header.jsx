import Link from 'next/link';

export default function Header() {
    return (
        <header className='w-full p-4 border-b flex justify-between items-center bg-white shadow-sm'>
            <Link href='/' className='text-xl font-bold text-blue-600'>StudyMate AI</Link>
            <nav className='flex gap-4'>
                <Link href='/dashboard' className='text-gray-600 hover:text-blue-600'>Dashboard</Link>
                <Link href='/login' className='text-gray-600 hover:text-blue-600'>Login</Link>
            </nav>
        </header>
    );
}
