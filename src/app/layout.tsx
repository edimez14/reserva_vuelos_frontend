import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from '../components/Navbar';
import PageTransition from '@/components/PageTransition';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadatos base que usa Next para título y descripción del sitio.
export const metadata: Metadata = {
  title: 'Reserva de Vuelos',
  description: 'Sistema de reserva de vuelos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Barra de navegación visible en toda la aplicación. */}
        <Navbar />
        {/* Capa de carga que aparece cuando hay cambio de página. */}
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
