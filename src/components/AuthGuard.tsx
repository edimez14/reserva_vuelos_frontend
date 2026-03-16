'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Si no hay sesión, no dejamos entrar a esta pantalla.
    if (!authService.isAuthenticated()) {
      router.push('/login');
    }
  }, [router]);

  // Mientras valida, mostramos el contenido; si no hay sesión, el redirect actúa rápido.
  return <>{children}</>;
}