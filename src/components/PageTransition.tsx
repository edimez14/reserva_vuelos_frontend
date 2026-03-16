'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const onStart = () => setIsLoading(true);
    window.addEventListener('app:navigate:start', onStart);

    return () => {
      window.removeEventListener('app:navigate:start', onStart);
    };
  }, []);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 220);

    return () => clearTimeout(timer);
  }, [pathname, isLoading]);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] bg-white/80 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Cargando...</p>
      </div>
    </div>
  );
}
