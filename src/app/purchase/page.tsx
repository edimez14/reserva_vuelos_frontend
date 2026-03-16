'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import { purchaseService } from '@/services/purchase';

export default function PurchasePage() {
  return (
    // useSearchParams necesita Suspense para hidratarse sin errores.
    <Suspense fallback={<div className="p-8 text-gray-800 dark:text-gray-100">Cargando...</div>}>
      <PurchaseContent />
    </Suspense>
  );
}

function PurchaseContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const reservationId = searchParams.get('reservationId') || '';
  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';
  const price = searchParams.get('price') || '';
  const airline = searchParams.get('airline') || '';

  const [cardHolder, setCardHolder] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Formatea número de tarjeta con espacios cada 4 dígitos
  function formatCardNumber(value: string) {
    return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
  }

  // Formatea expiración MM/AA
  function formatExpiry(value: string) {
    const clean = value.replace(/\D/g, '').slice(0, 4);
    if (clean.length >= 3) return clean.slice(0, 2) + '/' + clean.slice(2);
    return clean;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!reservationId) {
      setError('No hay reserva activa.');
      return;
    }

    setLoading(true);
    try {
      // En este proyecto el pago es simulado, por eso el método va fijo en "card".
      const ticket = await purchaseService.createPurchase({
        reservation_id: Number(reservationId),
        payment_method: 'card',
      });
      // Llevamos al usuario a la pantalla de confirmación con resumen del ticket.
      router.push(`/purchase/confirmation?ticketId=${ticket.id}&origin=${origin}&destination=${destination}&price=${price}&airline=${airline}`);
    } catch {
      setError('No se pudo completar el pago. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  if (!reservationId) {
    return (
      <AuthGuard>
        <div className="p-8 max-w-3xl mx-auto">
          <p className="text-gray-700 dark:text-gray-200">No hay una reserva activa. <a href="/flights" className="text-blue-600 dark:text-blue-400 underline">Buscar vuelos</a></p>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="p-6 max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Pago</h1>

        {/* Resumen de la reserva */}
        <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-1">
          <p className="font-semibold text-blue-800 dark:text-blue-300">{airline}</p>
          <p className="text-gray-700 dark:text-gray-200">{origin} → {destination}</p>
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">Reserva #{reservationId}</p>
            <p className="text-xl font-bold text-blue-700 dark:text-blue-300">${price}</p>
          </div>
        </div>

        {/* Formulario de pago (simulado) */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-5 space-y-4">
            <p className="font-semibold text-gray-800 dark:text-gray-100">Datos de la tarjeta</p>

            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Titular de la tarjeta</label>
              <input
                type="text"
                value={cardHolder}
                onChange={(e) => setCardHolder(e.target.value)}
                placeholder="Como aparece en la tarjeta"
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-md px-3 py-2 text-gray-900 dark:text-gray-100"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Número de tarjeta</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-md px-3 py-2 text-gray-900 dark:text-gray-100 tracking-widest"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Vencimiento</label>
                <input
                  type="text"
                  value={expiry}
                  onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/AA"
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-md px-3 py-2 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">CVV</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="123"
                  className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-md px-3 py-2 text-gray-900 dark:text-gray-100"
                  required
                />
              </div>
            </div>
          </div>

          <p className="text-xs text-gray-400 dark:text-gray-500 text-center">Pago simulado — no se realizarán cargos reales</p>

          {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 disabled:opacity-60"
          >
            {loading ? 'Procesando pago...' : `Pagar $${price}`}
          </button>
        </form>
      </div>
    </AuthGuard>
  );
}
