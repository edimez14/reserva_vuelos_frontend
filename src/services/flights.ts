import api from './api';

export interface Flight {
  flight_number: string;
  airline: string;
  origin: string;
  origin_iata: string;
  destination: string;
  destination_iata: string;
  departure_time: string;
  arrival_time: string;
  status: string;
  price: number;
  seats_available: number;
}

export interface FlightSearchParams {
  origin?: string;
  destination?: string;
  date?: string;
}

export const flightsService = {
  async searchFlights(params?: FlightSearchParams): Promise<Flight[]> {
    const response = await api.get('/flights/search', { params });
    return response.data.results;
  },
};
