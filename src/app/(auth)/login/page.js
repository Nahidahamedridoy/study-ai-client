import { Suspense } from 'react';
import LoginView from './LoginView';

export const metadata = { title: 'Login | StudyMate AI' };

export default function LoginPage() {
    return (
        <Suspense>
            <LoginView />
        </Suspense>
    );
}
