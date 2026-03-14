import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex space-x-4">
        <li><Link href="/">Inicio</Link></li>
        <li><Link href="/flights">Vuelos</Link></li>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/profile">Perfil</Link></li>
      </ul>
    </nav>
  );
}