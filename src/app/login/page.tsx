'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AppLink from '@/components/AppLink';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const result = await login({ email, password });
    if (!result.success) {
      setError(result.error);
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow text-gray-900">
        <h2 className="text-3xl font-bold text-center text-gray-900">Iniciar Sesión</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting ? 'Entrando...' : 'Ingresar'}
          </button>
        </form>
        <div className="text-center text-sm">
          <AppLink href="/forgot-password" className="text-blue-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </AppLink>
          <br />
          <AppLink href="/register" className="text-blue-600 hover:underline">
            ¿No tienes cuenta? Regístrate
          </AppLink>
        </div>
      </div>
    </div>
  );
}