'use client';

import { FormEvent, useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import AuthGuard from '@/components/AuthGuard';
import { profileService, Profile } from '@/services/profile';

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await profileService.getProfile();
        setProfile(data);
        setName(data.name || '');
        setPhone(data.phone || '');
      } catch {
        setError('No se pudo cargar el perfil.');
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const getErrorMessage = (err: unknown, fallback: string) => {
    const axiosErr = err as AxiosError<{ detail?: string }>;
    return axiosErr.response?.data?.detail ?? fallback;
  };

  const handleUpdateProfile = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const updated = await profileService.updateProfile({ name, phone });
      setProfile(updated);
      setMessage('Perfil actualizado correctamente.');
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'No se pudo actualizar el perfil.'));
    }
  };

  const handleChangePassword = async (e: FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (newPassword !== newPassword2) {
      setError('Las contraseñas nuevas no coinciden.');
      return;
    }

    try {
      const response = await profileService.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        new_password2: newPassword2,
      });
      setCurrentPassword('');
      setNewPassword('');
      setNewPassword2('');
      setMessage(response.detail || 'Contraseña actualizada correctamente.');
    } catch (err: unknown) {
      setError(getErrorMessage(err, 'No se pudo cambiar la contraseña.'));
    }
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 p-6 md:p-10">
        <div className="mx-auto max-w-3xl space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">Perfil</h1>

          {loading && <div className="rounded bg-white p-4 text-gray-700">Cargando perfil...</div>}

          {error && <div className="rounded bg-red-100 p-3 text-red-700">{error}</div>}
          {message && <div className="rounded bg-green-100 p-3 text-green-700">{message}</div>}

          {!loading && profile && (
            <>
              <section className="rounded-lg bg-white p-6 shadow">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Ver perfil</h2>
                <div className="space-y-2 text-gray-800">
                  <p><span className="font-medium">Email:</span> {profile.email}</p>
                  <p><span className="font-medium">Nombre:</span> {profile.name || '-'}</p>
                  <p><span className="font-medium">Teléfono:</span> {profile.phone || '-'}</p>
                </div>
              </section>

              <section className="rounded-lg bg-white p-6 shadow">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Editar perfil</h2>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Teléfono</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                  >
                    Guardar cambios
                  </button>
                </form>
              </section>

              <section className="rounded-lg bg-white p-6 shadow">
                <h2 className="mb-4 text-lg font-semibold text-gray-900">Cambiar contraseña</h2>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Contraseña actual</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Nueva contraseña</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">Confirmar nueva contraseña</label>
                    <input
                      type="password"
                      value={newPassword2}
                      onChange={(e) => setNewPassword2(e.target.value)}
                      className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
                  >
                    Cambiar contraseña
                  </button>
                </form>
              </section>
            </>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}