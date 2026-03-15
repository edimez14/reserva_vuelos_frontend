'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AppLink from '@/components/AppLink';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    const result = await forgotPassword({ email });
    if (result.success) {
      setMessage(result.message);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Recuperar contraseña</h2>
        {message && <div className="bg-green-100 text-green-700 p-3 rounded">{message}</div>}
        {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Enviar correo
          </button>
        </form>
        <div className="text-center">
          <AppLink href="/login" className="text-blue-600 hover:underline text-sm">
            Volver al login
          </AppLink>
        </div>
      </div>
    </div>
  );
}