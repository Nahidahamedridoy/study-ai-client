import DashboardShell from '@/components/dashboard/DashboardShell';

export const metadata = { title: 'Dashboard | StudyMate AI' };

export default function DashboardLayout({ children }) {
    return <DashboardShell>{children}</DashboardShell>;
}
