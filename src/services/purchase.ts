import api from './api';

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
    const response = await api.post('/purchase', data);
    return response.data;
  },
};
