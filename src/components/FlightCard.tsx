import Link from 'next/link';
import { Flight } from '@/services/flights';

interface FlightCardProps {
  flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
  const formatDate = (value: string) => {
    if (!value) return 'No disponible';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString('es-CO', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm h-full text-gray-900">
      <div className="flex flex-col justify-between gap-4 h-full">
        <div className="space-y-3">
          <div>
            <p className="font-bold text-lg leading-6">{flight.airline}</p>
            <p className="text-sm text-gray-700 font-medium">Vuelo {flight.flight_number}</p>
          </div>

          <div className="bg-gray-50 rounded-md p-3 space-y-2">
            <p className="text-sm font-semibold">Ruta: {flight.origin_iata} → {flight.destination_iata}</p>
            <p className="text-sm text-gray-800">Salida: {formatDate(flight.departure_time)}</p>
            <p className="text-sm text-gray-800">Llegada: {formatDate(flight.arrival_time)}</p>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-800">
            <p>Estado: <span className="font-semibold capitalize">{flight.status}</span></p>
            <p>Sillas: <span className="font-semibold">{flight.seats_available}</span></p>
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-blue-700 mb-2">${flight.price}</p>
          <Link
            href={`/reservation?flightNumber=${flight.flight_number}&airline=${flight.airline}&origin=${flight.origin_iata}&destination=${flight.destination_iata}&price=${flight.price}`}
            className="inline-block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Reservar
          </Link>
        </div>
      </div>
    </div>
  );
}
