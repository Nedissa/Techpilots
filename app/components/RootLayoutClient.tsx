'use client';

import { Aside } from './Aside';
import { CartAside } from './CartAside';
import React, { useEffect, useState } from 'react';

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <Aside.Provider>
      {children}
      <CartAside />
    </Aside.Provider>
  );
}
