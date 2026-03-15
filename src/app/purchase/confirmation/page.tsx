'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="p-8 text-gray-800 dark:text-gray-100">Cargando...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}

function ConfirmationContent() {
  const searchParams = useSearchParams();

  const ticketId = searchParams.get('ticketId') || '';
  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';
  const price = searchParams.get('price') || '';
  const airline = searchParams.get('airline') || '';

  return (
    <AuthGuard>
      <div className="p-6 max-w-2xl mx-auto space-y-6 text-center">
        {/* Ícono de éxito */}
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
            <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">¡Compra confirmada!</h1>
          <p className="text-gray-500 dark:text-gray-300 mt-1">Te enviamos un correo con tu tiquete.</p>
        </div>

        {/* Detalle del ticket */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-left space-y-3">
          <div className="flex items-center justify-between border-b border-dashed border-gray-200 dark:border-gray-700 pb-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">Ticket</p>
            <p className="font-bold text-gray-900 dark:text-gray-100">#{ticketId}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">Aerolínea</p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">{airline}</p>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">Ruta</p>
            <p className="font-semibold text-gray-900 dark:text-gray-100">{origin} → {destination}</p>
          </div>

          <div className="flex items-center justify-between border-t border-dashed border-gray-200 dark:border-gray-700 pt-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total pagado</p>
            <p className="text-xl font-bold text-green-600 dark:text-green-400">${price}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="py-2 px-6 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
          >
            Ir al inicio
          </Link>
          <Link
            href="/flights"
            className="py-2 px-6 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 font-semibold rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Buscar otro vuelo
          </Link>
        </div>
      </div>
    </AuthGuard>
  );
}
