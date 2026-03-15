import AuthGuard from '@/components/AuthGuard';
import FlightsExplorer from '@/components/FlightsExplorer';

export default function FlightsPage() {
  return (
    <AuthGuard>
      <FlightsExplorer />
    </AuthGuard>
  );
}