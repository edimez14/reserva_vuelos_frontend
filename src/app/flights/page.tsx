import AuthGuard from '@/components/AuthGuard';
import FlightsExplorer from '@/components/FlightsExplorer';

export default function FlightsPage() {
  return (
    // Pantalla privada: solo usuarios autenticados.
    <AuthGuard>
      <FlightsExplorer />
    </AuthGuard>
  );
}