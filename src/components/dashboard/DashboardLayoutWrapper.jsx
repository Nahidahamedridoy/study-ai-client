'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import AppFooter from '@/components/layout/AppFooter';

const DASHBOARD_PREFIX = '/dashboard';

export default function DashboardLayoutWrapper({ children }) {
    const pathname = usePathname();
    const isDashboard = pathname.startsWith(DASHBOARD_PREFIX);

    if (isDashboard) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar />
            <main className="flex-grow flex flex-col">{children}</main>
            <AppFooter />
        </>
    );
}
