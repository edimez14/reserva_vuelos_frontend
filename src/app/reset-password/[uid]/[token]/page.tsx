'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function ResetPasswordPage() {
  const params = useParams();
  const router = useRouter();
  // uid y token llegan desde la URL del correo de recuperación.
  const uid = params.uid as string;
  const token = params.token as string;
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setMessage('');
    const result = await resetPassword({ uid, token, new_password: newPassword, new_password2: newPassword2 });
    if (result.success) {
      setMessage('Contraseña actualizada. Redirigiendo al login...');
      // Damos unos segundos para que el usuario alcance a leer el mensaje.
      setTimeout(() => router.push('/login'), 3000);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Nueva contraseña</h2>
        {message && <div className="bg-green-100 text-green-700 p-3 rounded">{message}</div>}
        {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nueva contraseña</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
            <input
              type="password"
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Restablecer
          </button>
        </form>
      </div>
    </div>
  );
}