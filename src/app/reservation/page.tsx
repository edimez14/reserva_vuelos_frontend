'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';

export default function ReservationPage() {
  return (
    <Suspense fallback={<div className="p-8">Cargando...</div>}>
      <ReservationContent />
    </Suspense>
  );
}

function ReservationContent() {
  const searchParams = useSearchParams();
  const flightNumber = searchParams.get('flightNumber');
  const airline = searchParams.get('airline');
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const price = searchParams.get('price');

  return (
    <AuthGuard>
      <div className="p-8 max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">Reserva de Vuelo</h1>
        {flightNumber ? (
          <div className="bg-white p-4 rounded-md shadow border border-gray-200">
            <p><span className="font-semibold">Número de vuelo:</span> {flightNumber}</p>
            <p><span className="font-semibold">Aerolínea:</span> {airline}</p>
            <p><span className="font-semibold">Ruta:</span> {origin} → {destination}</p>
            <p><span className="font-semibold">Precio:</span> ${price}</p>
          </div>
        ) : (
          <p className="text-gray-700">No seleccionaste un vuelo.</p>
        )}

        <Link href="/purchase" className="inline-block py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Continuar a compra
        </Link>
      </div>
    </AuthGuard>
  );
}