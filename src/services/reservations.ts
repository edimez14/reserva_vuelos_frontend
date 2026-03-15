import api from './api';

export interface Passenger {
  name: string;
  document: string;
  seat?: string;
}

export interface ReservationFlightData {
  flight_number: string;
  airline: string;
  origin: string;
  destination: string;
  departure_time: string;
  arrival_time: string;
  price: number;
}

export interface CreateReservationData {
  flight_data: ReservationFlightData;
  passengers: Passenger[];
  seat_selection?: string;
}

export interface Reservation {
  id: number;
  flight_number: string;
  passengers_count: number;
  seat_selection: string;
  status: string;
  created_at: string;
}

export const reservationsService = {
  async createReservation(data: CreateReservationData): Promise<Reservation> {
    const response = await api.post('/reservations', data);
    return response.data;
  },

  async getUserReservations(): Promise<Reservation[]> {
    const response = await api.get('/reservations/user');
    return response.data;
  },
};
