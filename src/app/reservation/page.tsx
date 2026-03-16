'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';
import { reservationsService, Passenger } from '@/services/reservations';

export default function ReservationPage() {
  return (
    // useSearchParams necesita Suspense en este tipo de página cliente.
    <Suspense fallback={<div className="p-8 text-gray-800 dark:text-gray-100">Cargando...</div>}>
      <ReservationContent />
    </Suspense>
  );
}

// Pasajero en blanco
const emptyPassenger = (): Passenger => ({ name: '', document: '', seat: '' });

function ReservationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const flightNumber = searchParams.get('flightNumber') || '';
  const airline = searchParams.get('airline') || '';
  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';
  const price = searchParams.get('price') || '';
  const departureTime = searchParams.get('departureTime') || '';
  const arrivalTime = searchParams.get('arrivalTime') || '';

  const [passengers, setPassengers] = useState<Passenger[]>([emptyPassenger()]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cambia la cantidad de pasajeros
  function handlePassengerCount(count: number) {
    const newList = Array.from({ length: count }, (_, i) => passengers[i] || emptyPassenger());
    setPassengers(newList);
  }

  // Actualiza un campo de un pasajero
  function handlePassengerChange(index: number, field: keyof Passenger, value: string) {
    const updated = [...passengers];
    updated[index] = { ...updated[index], [field]: value };
    setPassengers(updated);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    // Validación básica
    for (const p of passengers) {
      if (!p.name.trim() || !p.document.trim()) {
        setError('Completa nombre y documento de todos los pasajeros.');
        return;
      }
    }

    setLoading(true);
    try {
      // En backend se guarda como texto separado por coma (ej: "12A,12B").
      const seatSelection = passengers
        .map((p) => (p.seat || '').trim())
        .filter((seat) => seat.length > 0)
        .join(',');

      const reservation = await reservationsService.createReservation({
        flight_data: {
          flight_number: flightNumber,
          airline,
          origin,
          destination,
          departure_time: departureTime,
          arrival_time: arrivalTime,
          price: Number(price),
        },
        passengers,
        seat_selection: seatSelection,
      });
      // Pasamos datos por query para prellenar la pantalla de pago.
      router.push(`/purchase?reservationId=${reservation.id}&origin=${origin}&destination=${destination}&price=${price}&airline=${airline}`);
    } catch {
      setError('No se pudo crear la reserva. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  }

  if (!flightNumber) {
    return (
      <AuthGuard>
        <div className="p-8 max-w-3xl mx-auto">
          <p className="text-gray-700 dark:text-gray-200">No seleccionaste un vuelo. <a href="/flights" className="text-blue-600 dark:text-blue-400 underline">Buscar vuelos</a></p>
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="p-6 max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Reserva de Vuelo</h1>

        {/* Resumen del vuelo */}
        <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 rounded-lg p-4 space-y-1">
          <p className="font-semibold text-blue-800 dark:text-blue-300">{airline} — Vuelo {flightNumber}</p>
          <p className="text-gray-700 dark:text-gray-200">{origin} → {destination}</p>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">${price} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">por pasajero</span></p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cantidad de pasajeros */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Cantidad de pasajeros</label>
            <select
              value={passengers.length}
              onChange={(e) => handlePassengerCount(Number(e.target.value))}
              className="border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-md px-3 py-2 text-gray-900 dark:text-gray-100 w-32"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* Formulario por pasajero */}
          {passengers.map((p, i) => (
            <div key={i} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3 bg-white dark:bg-gray-900">
              <p className="font-semibold text-gray-800 dark:text-gray-100">Pasajero {i + 1}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Nombre completo *</label>
                  <input
                    type="text"
                    value={p.name}
                    onChange={(e) => handlePassengerChange(i, 'name', e.target.value)}
                    placeholder="Ej: Juan Pérez"
                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-md px-3 py-2 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Documento *</label>
                  <input
                    type="text"
                    value={p.document}
                    onChange={(e) => handlePassengerChange(i, 'document', e.target.value)}
                    placeholder="Ej: 123456789"
                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-md px-3 py-2 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Asiento (opcional)</label>
                  <input
                    type="text"
                    value={p.seat || ''}
                    onChange={(e) => handlePassengerChange(i, 'seat', e.target.value)}
                    placeholder="Ej: 12A"
                    className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 rounded-md px-3 py-2 text-gray-900 dark:text-gray-100"
                  />
                </div>
              </div>
            </div>
          ))}

          {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}

          {/* Total */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 flex items-center justify-between">
            <p className="text-gray-700 dark:text-gray-200">Total estimado</p>
            <p className="text-xl font-bold text-blue-700 dark:text-blue-300">
              ${(parseFloat(price) * passengers.length).toFixed(2)}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? 'Creando reserva...' : 'Continuar al pago'}
          </button>
        </form>
      </div>
    </AuthGuard>
  );
}