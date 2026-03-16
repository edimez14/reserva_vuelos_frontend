'use client';

import { useAuth } from '@/hooks/useAuth';
import AppLink from '@/components/AppLink';

export default function Navbar() {
  const { logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li><AppLink href="/">Inicio</AppLink></li>
        {/* Si hay sesión, mostramos las opciones privadas. */}
        {isAuthenticated() ? (
          <>
            <li><AppLink href="/flights">Vuelos</AppLink></li>
            <li><AppLink href="/profile">Perfil</AppLink></li>
            <li>
              <button onClick={logout} className="text-red-300 hover:text-red-100">
                Cerrar sesión
              </button>
            </li>
          </>
        ) : (
          /* Si no hay sesión, mostramos acceso y registro. */
          <>
            <li><AppLink href="/login">Login</AppLink></li>
            <li><AppLink href="/register">Registro</AppLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}