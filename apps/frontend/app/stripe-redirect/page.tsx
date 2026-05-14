'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function StripeRedirect() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url');

  useEffect(() => {
    if (url) {
      // This redirect happens AFTER the page is in Next.js history
      // So browser back button will work properly
      window.location.href = url;
    }
  }, [url]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Omdirigerar till Stripe...</p>
    </div>
  );
}
