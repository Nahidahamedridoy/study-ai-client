import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';

export const metadata = { title: 'Register' };

export default function RegisterPage() {
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-50 p-4'>
            <div className='w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md'>
                <h1 className='text-2xl font-bold text-center'>Register</h1>
                <form className='space-y-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Name</label>
                        <Input type='text' className='w-full mt-1' placeholder='Enter Your Name' />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Email</label>
                        <Input type='email' className='w-full mt-1' placeholder='Enter Your Email' />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700'>Password</label>
                        <Input type='password' className='w-full mt-1' placeholder='Enter Your Password' />
                    </div>
                    <Button className='w-full bg-blue-600 text-white'>Sign Up</Button>
                </form>
            </div>
        </div>
    );
}
