'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import FlightCard from '@/components/FlightCard';
import { Flight, flightsService } from '@/services/flights';

export default function FlightsExplorer() {
  // Clave para guardar resultado inicial en sesión del navegador.
  const cacheKey = 'home-flights-cache';
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);

  const visibleFlights = useMemo(() => {
    // Solo mostramos una parte de la lista para no recargar la pantalla al inicio.
    return flights.slice(0, visibleCount);
  }, [flights, visibleCount]);

  const loadFlights = async (params?: { origin?: string; destination?: string; date?: string }) => {
    // Si no hay filtros, esto es la búsqueda "por defecto".
    const isDefaultSearch = !params?.origin && !params?.destination && !params?.date;

    if (isDefaultSearch && typeof window !== 'undefined') {
      // Intentamos leer cache para no volver a pedir los mismos vuelos.
      const cachedFlights = sessionStorage.getItem(cacheKey);
      if (cachedFlights) {
        setFlights(JSON.parse(cachedFlights));
        setVisibleCount(9);
        setLoading(false);
        return;
      }
    }

    setLoading(true);
    setError('');

    try {
      const data = await flightsService.searchFlights(params);
      setFlights(data);
      setVisibleCount(9);
      if (isDefaultSearch && typeof window !== 'undefined') {
        // Guardamos cache solo para búsqueda por defecto.
        sessionStorage.setItem(cacheKey, JSON.stringify(data));
      }
    } catch {
      setFlights([]);
      setError('No se pudieron cargar los vuelos.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Primera carga al entrar a la pantalla.
    loadFlights();
  }, []);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    // Enviamos undefined cuando el campo va vacío para no forzar filtros vacíos.
    await loadFlights({
      origin: origin || undefined,
      destination: destination || undefined,
      date: date || undefined,
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 text-gray-100">
      <h1 className="text-3xl font-bold text-white">Vuelos disponibles</h1>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-md shadow">
        <input
          type="text"
          placeholder="Origen"
          value={origin}
          onChange={(e) => setOrigin(e.target.value.toUpperCase())}
          className="border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder:text-gray-500"
          maxLength={3}
        />
        <input
          type="text"
          placeholder="Destino"
          value={destination}
          onChange={(e) => setDestination(e.target.value.toUpperCase())}
          className="border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder:text-gray-500"
          maxLength={3}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-gray-900"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {loading ? 'Cargando...' : 'Buscar'}
        </button>
      </form>

      {error && <p className="text-red-300">{error}</p>}

      {!loading && !error && visibleFlights.length === 0 && (
        <p className="text-gray-300">No hay vuelos para mostrar.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {visibleFlights.map((flight, index) => (
          <FlightCard key={`${flight.flight_number}-${flight.departure_time}-${index}`} flight={flight} />
        ))}
      </div>

      {loading && <p className="text-gray-300">Cargando vuelos...</p>}

      {!loading && visibleCount < flights.length && (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((prev) => prev + 9)}
            className="py-2 px-6 bg-gray-900 text-white rounded-md hover:bg-gray-700"
          >
            Mostrar más
          </button>
        </div>
      )}
    </div>
  );
}
