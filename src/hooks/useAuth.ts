import { useState } from 'react';
import { authService, LoginData, RegisterData, ForgotPasswordData, ResetPasswordData } from '@/services/auth';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

type AuthResult = { success: true } | { success: false; error: string };
type MessageResult = { success: true; message: string } | { success: false; error: string };

export const useAuth = () => {
  const currentUser = authService.getCurrentUser();
  const [user, setUser] = useState(currentUser);
  const [loading] = useState<boolean>(currentUser === null);
  const router = useRouter();

  const login = async (data: LoginData): Promise<AuthResult> => {
    try {
      const response = await authService.login(data);
      authService.saveSession(response);
      setUser(response.user);
      router.push('/dashboard');
      return { success: true };
    } catch (error: unknown) {
      const err = error as AxiosError<{ detail?: string }>;
      return { success: false, error: err.response?.data?.detail ?? 'Error al iniciar sesión' };
    }
  };

  const register = async (data: RegisterData): Promise<AuthResult> => {
    try {
      const response = await authService.register(data);
      authService.saveSession(response);
      setUser(response.user);
      router.push('/dashboard');
      return { success: true };
    } catch (error: unknown) {
      const err = error as AxiosError<{ detail?: string }>;
      return { success: false, error: err.response?.data?.detail ?? 'Error al registrarse' };
    }
  };

  const forgotPassword = async (data: ForgotPasswordData): Promise<MessageResult> => {
    try {
      const response = await authService.forgotPassword(data);
      return { success: true, message: response.detail };
    } catch (error: unknown) {
      const err = error as AxiosError<{ detail?: string }>;
      return { success: false, error: err.response?.data?.detail ?? 'Error al enviar correo' };
    }
  };

  const resetPassword = async (data: ResetPasswordData): Promise<MessageResult> => {
    try {
      const response = await authService.resetPassword(data);
      return { success: true, message: response.detail };
    } catch (error: unknown) {
      const err = error as AxiosError<{ detail?: string }>;
      return { success: false, error: err.response?.data?.detail ?? 'Error al restablecer contraseña' };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
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
    isAuthenticated: authService.isAuthenticated,
  };
};