'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AppLink from '@/components/AppLink';

export default function RegisterPage() {
  // Guardamos todo el formulario en un solo estado para manejarlo más fácil.
  const [form, setForm] = useState({
    email: '',
    name: '',
    phone: '',
    password: '',
    password2: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Actualiza solo el campo que cambió, sin perder el resto.
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    const result = await register(form);
    if (!result.success) {
      // Si backend manda error raro, lo convertimos a texto para poder mostrarlo.
      setError(typeof result.error === 'string' ? result.error : JSON.stringify(result.error));
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow text-gray-900">
        <h2 className="text-3xl font-bold text-center text-gray-900">Registro</h2>
        {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Teléfono</label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirmar contraseña</label>
            <input
              type="password"
              name="password2"
              value={form.password2}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-gray-900"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting ? 'Creando cuenta...' : 'Registrarse'}
          </button>
        </form>
        <div className="text-center text-sm">
          <AppLink href="/login" className="text-blue-600 hover:underline">
            ¿Ya tienes cuenta? Inicia sesión
          </AppLink>
        </div>
      </div>
    </div>
  );
}