'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import FlightCard from '@/components/FlightCard';
import { Flight, flightsService } from '@/services/flights';

export default function FlightsExplorer() {
  const cacheKey = 'home-flights-cache';
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [visibleCount, setVisibleCount] = useState(9);

  const visibleFlights = useMemo(() => {
    return flights.slice(0, visibleCount);
  }, [flights, visibleCount]);

  const loadFlights = async (params?: { origin?: string; destination?: string; date?: string }) => {
    const isDefaultSearch = !params?.origin && !params?.destination && !params?.date;

    if (isDefaultSearch && typeof window !== 'undefined') {
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
    loadFlights();
  }, []);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();

    await loadFlights({
      origin: origin || undefined,
      destination: destination || undefined,
      date: date || undefined,
    });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Vuelos disponibles</h1>

      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded-md shadow">
        <input
          type="text"
          placeholder="Origen"
          value={origin}
          onChange={(e) => setOrigin(e.target.value.toUpperCase())}
          className="border border-gray-300 rounded-md px-3 py-2"
          maxLength={3}
        />
        <input
          type="text"
          placeholder="Destino"
          value={destination}
          onChange={(e) => setDestination(e.target.value.toUpperCase())}
          className="border border-gray-300 rounded-md px-3 py-2"
          maxLength={3}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2"
        />
        <button
          type="submit"
          className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {loading ? 'Cargando...' : 'Buscar'}
        </button>
      </form>

      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && visibleFlights.length === 0 && (
        <p className="text-gray-600">No hay vuelos para mostrar.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {visibleFlights.map((flight, index) => (
          <FlightCard key={`${flight.flight_number}-${flight.departure_time}-${index}`} flight={flight} />
        ))}
      </div>

      {loading && <p className="text-gray-600">Cargando vuelos...</p>}

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
