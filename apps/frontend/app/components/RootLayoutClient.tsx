'use client';

import { Aside } from './Aside';
import { CartAside } from './CartAside';
import React, { useEffect } from 'react';
import { HeaderWrapper } from './HeaderWrapper';
import { FooterWrapper } from './FooterWrapper';

export function RootLayoutClient({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Force page reload when browser back/forward buttons are pressed
    // This ensures pages actually update when navigating through history
    const handlePopState = () => {
      window.location.reload();
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <Aside.Provider>
      <HeaderWrapper />
      <main className="py-4 pb-24 flex justify-center flex-1 min-h-screen">
        <div className="w-full max-w-[1280px]">
          {children}
        </div>
      </main>
      <FooterWrapper />
      <CartAside />
    </Aside.Provider>
  );
}
