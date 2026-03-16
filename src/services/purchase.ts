import api from './api';

// Datos necesarios para ejecutar el pago.
export interface PurchaseData {
  reservation_id: number;
  payment_method: string;
}

export interface Ticket {
  id: number;
  reservation_id: number;
  payment_method: string;
  status: string;
  created_at: string;
}

export const purchaseService = {
  async createPurchase(data: PurchaseData): Promise<Ticket> {
    // Convierte una reserva en ticket pagado.
    const response = await api.post('/purchase', data);
    return response.data;
  },
};
