import ResourceDetailView from '@/components/resources/ResourceDetailView';

export async function generateMetadata({ params }) {
    return {
        title: 'Resource Details | StudyMate AI',
        description: 'View the full details of this study resource on StudyMate AI.',
    };
}

export default async function ResourceDetailPage({ params }) {
    const { id } = await params;
    return <ResourceDetailView id={id} />;
}
