'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FlightsExplorer from '@/components/FlightsExplorer';
import { authService } from '@/services/auth';

export default function Home() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // La pantalla principal solo se muestra con sesión iniciada.
    if (!authService.isAuthenticated()) {
      router.replace('/login');
      return;
    }

    // Si hay sesión, recién aquí dejamos renderizar el explorador.
    setReady(true);
  }, [router]);

  if (!ready) {
    // Evita parpadeos mientras validamos autenticación.
    return <div className="p-8">Cargando...</div>;
  }

  return <FlightsExplorer />;
}
