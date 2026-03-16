import AppLink from '@/components/AppLink';
import { Flight } from '@/services/flights';

interface FlightCardProps {
  flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
  const formatDate = (value: string) => {
    // Si no viene fecha, mostramos un texto claro.
    if (!value) return 'No disponible';
    const date = new Date(value);
    // Si la fecha no se puede leer, mostramos el valor original para no romper la tarjeta.
    if (Number.isNaN(date.getTime())) return value;
    // Formato amigable para usuario final.
    return date.toLocaleString('es-CO', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  };

  return (
    <div className="border border-gray-300 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-900 shadow-sm h-full text-gray-900 dark:text-gray-100">
      <div className="flex flex-col justify-between gap-4 h-full">
        <div className="space-y-3">
          <div>
            <p className="font-bold text-lg leading-6">{flight.airline}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Vuelo {flight.flight_number}</p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3 space-y-2">
            <p className="text-sm font-semibold">Ruta: {flight.origin_iata} → {flight.destination_iata}</p>
            <p className="text-sm text-gray-800 dark:text-gray-200">Salida: {formatDate(flight.departure_time)}</p>
            <p className="text-sm text-gray-800 dark:text-gray-200">Llegada: {formatDate(flight.arrival_time)}</p>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-800 dark:text-gray-200">
            <p>Estado: <span className="font-semibold capitalize">{flight.status}</span></p>
            <p>Sillas: <span className="font-semibold">{flight.seats_available}</span></p>
          </div>
        </div>
        <div>
          <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 mb-2">${flight.price}</p>
          <AppLink
            // Mandamos los datos en la URL para prellenar la pantalla de reserva.
            href={`/reservation?flightNumber=${encodeURIComponent(flight.flight_number)}&airline=${encodeURIComponent(flight.airline)}&origin=${encodeURIComponent(flight.origin_iata)}&destination=${encodeURIComponent(flight.destination_iata)}&price=${encodeURIComponent(String(flight.price))}&departureTime=${encodeURIComponent(flight.departure_time)}&arrivalTime=${encodeURIComponent(flight.arrival_time)}`}
            className="inline-block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Reservar
          </AppLink>
        </div>
      </div>
    </div>
  );
}
