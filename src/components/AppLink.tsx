'use client';

import Link, { LinkProps } from 'next/link';
import { MouseEvent, ReactNode } from 'react';
import { startNavigation } from '@/utils/navigation';

type AppLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

export default function AppLink({ children, onClick, target, ...props }: AppLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    // Primero respetamos cualquier lógica que nos pasen desde afuera.
    onClick?.(event);

    // Si el click fue cancelado o abre nueva pestaña, no mostramos transición.
    if (event.defaultPrevented || target === '_blank') {
      return;
    }

    // Para navegación normal dentro de la app, disparamos loader global.
    startNavigation();
  };

  return (
    <Link {...props} target={target} onClick={handleClick}>
      {children}
    </Link>
  );
}
