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
    onClick?.(event);

    if (event.defaultPrevented || target === '_blank') {
      return;
    }

    startNavigation();
  };

  return (
    <Link {...props} target={target} onClick={handleClick}>
      {children}
    </Link>
  );
}
