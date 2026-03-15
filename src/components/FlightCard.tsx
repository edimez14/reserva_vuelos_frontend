import Link from 'next/link';
import { Flight } from '@/services/flights';

interface FlightCardProps {
  flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
  return (
    <div className="border border-gray-200 rounded-md p-4 bg-white shadow-sm h-full">
      <div className="flex flex-col justify-between gap-3 h-full">
        <div>
          <p className="font-bold text-lg">{flight.airline} - {flight.flight_number}</p>
          <p className="text-sm text-gray-600">{flight.origin_iata} → {flight.destination_iata}</p>
          <p className="text-sm text-gray-600">Salida: {flight.departure_time || 'No disponible'}</p>
          <p className="text-sm text-gray-600">Llegada: {flight.arrival_time || 'No disponible'}</p>
          <p className="text-sm text-gray-600">Estado: {flight.status}</p>
          <p className="text-sm text-gray-600">Sillas: {flight.seats_available}</p>
        </div>
        <div>
          <p className="text-xl font-bold text-blue-700 mb-2">${flight.price}</p>
          <Link
            href={`/reservation?flightNumber=${flight.flight_number}&airline=${flight.airline}&origin=${flight.origin_iata}&destination=${flight.destination_iata}&price=${flight.price}`}
            className="inline-block py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Reservar
          </Link>
        </div>
      </div>
    </div>
  );
}
