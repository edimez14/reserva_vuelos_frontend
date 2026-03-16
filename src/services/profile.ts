import api from './api';

// Datos del perfil que usa la pantalla de perfil.
export interface Profile {
  id: number;
  email: string;
  name: string;
  phone: string;
  created_at: string;
}

export interface UpdateProfileData {
  name: string;
  phone: string;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
  new_password2: string;
}

export const profileService = {
  async getProfile(): Promise<Profile> {
    // Trae la información actual del usuario autenticado.
    const response = await api.get('/auth/profile');
    return response.data;
  },

  async updateProfile(data: UpdateProfileData): Promise<Profile> {
    // Guarda cambios de nombre y teléfono.
    const response = await api.put('/auth/profile', data);
    return response.data;
  },

  async changePassword(data: ChangePasswordData): Promise<{ detail?: string }> {
    // Cambia contraseña validando la actual en backend.
    const response = await api.post('/auth/change-password', data);
    return response.data;
  },
};