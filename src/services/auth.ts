import api from './api';

export interface RegisterData {
  email: string;
  name: string;
  phone: string;
  password: string;
  password2: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  uid: string;
  token: string;
  new_password: string;
  new_password2: string;
}

export interface User {
  id?: number;
  email: string;
  name?: string;
  phone?: string;
  // add other user fields returned by the API as needed
}

export const authService = {
  async register(data: RegisterData) {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  async login(data: LoginData) {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  async forgotPassword(data: ForgotPasswordData) {
    const response = await api.post('/auth/forgot-password', data);
    return response.data;
  },

  async resetPassword(data: ResetPasswordData) {
    const response = await api.post('/auth/reset-password', data);
    return response.data;
  },

  logout() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('auth-changed'));
  },

  // Guardar tokens y usuario después de login/register
  saveSession(data: { access: string; refresh: string; user: User }) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('access_token', data.access);
    localStorage.setItem('refresh_token', data.refresh);
    localStorage.setItem('user', JSON.stringify(data.user));
    window.dispatchEvent(new Event('auth-changed'));
  },

  getCurrentUser(): User | null {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('user');
    return user ? (JSON.parse(user) as User) : null;
  },

  isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    return !!localStorage.getItem('access_token');
  },
};