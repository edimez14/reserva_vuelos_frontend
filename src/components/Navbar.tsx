'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const { logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link href="/">Inicio</Link></li>
        {isAuthenticated() ? (
          <>
            <li><Link href="/flights">Vuelos</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/profile">Perfil</Link></li>
            <li>
              <button onClick={logout} className="text-red-300 hover:text-red-100">
                Cerrar sesión
              </button>
            </li>
          </>
        ) : (
          <>
            <li><Link href="/login">Login</Link></li>
            <li><Link href="/register">Registro</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}