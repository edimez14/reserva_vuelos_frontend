import { useEffect, useState } from 'react';
import { authService, LoginData, RegisterData, ForgotPasswordData, ResetPasswordData } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { startNavigation } from '@/utils/navigation';

type AuthResult = { success: true } | { success: false; error: string };
type MessageResult = { success: true; message: string } | { success: false; error: string };

export const useAuth = () => {
  // Al iniciar, leemos el usuario guardado en navegador para no perder sesión visualmente.
  const currentUser = authService.getCurrentUser();
  const [user, setUser] = useState(currentUser);
  const [loading] = useState<boolean>(currentUser === null);
  const router = useRouter();

  useEffect(() => {
    // Este método vuelve a leer sesión cuando cambia en otra pestaña o en cualquier login/logout.
    const syncAuth = () => {
      setUser(authService.getCurrentUser());
    };

    window.addEventListener('auth-changed', syncAuth);
    window.addEventListener('storage', syncAuth);

    return () => {
      window.removeEventListener('auth-changed', syncAuth);
      window.removeEventListener('storage', syncAuth);
    };
  }, []);

  const login = async (data: LoginData): Promise<AuthResult> => {
    try {
      // 1) pedimos login al backend
      const response = await authService.login(data);
      // 2) guardamos tokens y usuario
      authService.saveSession(response);
      setUser(response.user);
      // 3) mostramos transición y redirigimos
      startNavigation();
      router.push('/');
      return { success: true };
    } catch (error: unknown) {
      const err = error as AxiosError<{ detail?: string }>;
      return { success: false, error: err.response?.data?.detail ?? 'Error al iniciar sesión' };
    }
  };

  const register = async (data: RegisterData): Promise<AuthResult> => {
    try {
      // Mismo flujo del login, pero creando cuenta primero.
      const response = await authService.register(data);
      authService.saveSession(response);
      setUser(response.user);
      startNavigation();
      router.push('/');
      return { success: true };
    } catch (error: unknown) {
      const err = error as AxiosError<{ detail?: string }>;
      return { success: false, error: err.response?.data?.detail ?? 'Error al registrarse' };
    }
  };

  const forgotPassword = async (data: ForgotPasswordData): Promise<MessageResult> => {
    try {
      // Solo devuelve mensaje para mostrar al usuario en pantalla.
      const response = await authService.forgotPassword(data);
      return { success: true, message: response.detail };
    } catch (error: unknown) {
      const err = error as AxiosError<{ detail?: string }>;
      return { success: false, error: err.response?.data?.detail ?? 'Error al enviar correo' };
    }
  };

  const resetPassword = async (data: ResetPasswordData): Promise<MessageResult> => {
    try {
      // El backend valida uid/token del enlace antes de permitir el cambio.
      const response = await authService.resetPassword(data);
      return { success: true, message: response.detail };
    } catch (error: unknown) {
      const err = error as AxiosError<{ detail?: string }>;
      return { success: false, error: err.response?.data?.detail ?? 'Error al restablecer contraseña' };
    }
  };

  const logout = () => {
    // Cierra sesión local y envía a login.
    authService.logout();
    setUser(null);
    startNavigation();
    router.push('/login');
  };

  return {
    user,
    loading,
    login,
    register,
    forgotPassword,
    resetPassword,
    logout,
    isAuthenticated: () => !!user,
  };
};