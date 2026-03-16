import axios from 'axios';

// Cliente base para todas las llamadas al backend.
// Así evitamos repetir la URL y cabeceras en cada archivo.
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token a cada petición
api.interceptors.request.use((config) => {
  // En render del servidor no existe localStorage, por eso salimos temprano.
  if (typeof window === 'undefined') {
    return config;
  }

  // Si hay token guardado, lo enviamos para que el backend reconozca al usuario.
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;