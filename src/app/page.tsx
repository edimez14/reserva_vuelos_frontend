'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FlightsExplorer from '@/components/FlightsExplorer';
import { authService } from '@/services/auth';

export default function Home() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.replace('/login');
      return;
    }

    setReady(true);
  }, [router]);

  if (!ready) {
    return <div className="p-8">Cargando...</div>;
  }

  return <FlightsExplorer />;
}
