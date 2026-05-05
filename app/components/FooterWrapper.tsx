'use client';

import Link from 'next/link';

export function FooterWrapper() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-5 gap-12 mb-12 pb-8 border-b border-gray-800 text-white">
            {/* Logo section */}
            <div>
              <h2 className="text-lg font-bold mb-6">TechPilots</h2>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  <a href="tel:+46108800981" className="hover:underline">+010-880 09 81</a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="4" width="20" height="16" rx="2" ry="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/>
                  </svg>
                  <a href="mailto:info@techpilots.se" className="hover:underline">info@techpilots.se</a>
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>506 31 Borås</span>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div>
              <h3 className="font-bold mb-3 text-sm">Information</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="/frakt-och-leverans" className="hover:underline">Leverans</Link></li>
                <li><Link href="/returpolicy" className="hover:underline">Betalning</Link></li>
                <li><Link href="/villkor" className="hover:underline">Säkerhet</Link></li>
              </ul>
            </div>

            {/* Kundservice */}
            <div>
              <h3 className="font-bold mb-3 text-sm">Kundservice</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="/kontakt" className="hover:underline">Kontakta oss</Link></li>
                <li><Link href="/faq" className="hover:underline">Vanliga frågor</Link></li>
                <li><Link href="/returpolicy" className="hover:underline">Returer & byten</Link></li>
              </ul>
            </div>

            {/* Om oss */}
            <div>
              <h3 className="font-bold mb-3 text-sm">Om oss</h3>
              <ul className="space-y-1 text-sm">
                <li><Link href="/om-oss" className="hover:underline">Vår historia</Link></li>
                <li><a href="#" className="hover:underline">Hållbarhet</a></li>
                <li><a href="#" className="hover:underline">Karriär</a></li>
              </ul>
            </div>

            {/* Sociala medier - Längst till höger */}
            <div>
              <h3 className="font-bold mb-4 text-sm">Följ oss</h3>
              <div className="flex gap-4">
                <a href="https://facebook.com/techpilots" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors" aria-label="Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://instagram.com/techpilots" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors" aria-label="Instagram">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                    <circle cx="17.5" cy="6.5" r="1.5"/>
                  </svg>
                </a>
                <a href="https://linkedin.com/company/techpilots" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors" aria-label="LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Certifieringar och märken */}
          <div className="pt-8 pb-8 border-b border-gray-800">
            <h3 className="font-bold mb-4 text-sm">Säkerhet & Certifieringar</h3>
            <div className="flex gap-8">
              <div className="flex flex-col items-center gap-2">
                <a href="#" className="hover:text-gray-300 transition-colors text-center" aria-label="SSL Säkert">
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <svg className="w-6 h-6 absolute" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                    </svg>
                    <span className="text-xs font-bold text-black relative z-10" style={{fontSize: '7px', letterSpacing: '-0.5px'}}>SSL</span>
                  </div>
                </a>
                <span className="text-xs text-gray-400 whitespace-nowrap">Kryptering</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <a href="#" className="hover:text-gray-300 transition-colors text-center" aria-label="GDPR Kompatibel">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </a>
                <span className="text-xs text-gray-400 whitespace-nowrap">GDPR</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <a href="#" className="hover:text-gray-300 transition-colors text-center" aria-label="Miljöansvar">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8m3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5m-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11m3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                  </svg>
                </a>
                <span className="text-xs text-gray-400 whitespace-nowrap">Miljöansvar</span>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="flex justify-between items-center text-xs text-gray-400 pt-8">
            <p>© 2026 TechPilots. Alla rättigheter förbehållna.</p>
            <a href="/villkor" className="hover:text-white transition-colors">Villkor och policyer</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
