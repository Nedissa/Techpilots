'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { Logo } from './Logo';
import { useAside } from './Aside';
import { LanguageSwitcher } from './LanguageSwitcher';
import { LaptopIcon } from './Icons/LaptopIcon';
import { DesktopIcon } from './Icons/DesktopIcon';
import { ProcessorIcon } from './Icons/ProcessorIcon';
import { GrafikkortIcon } from './Icons/GrafikkortIcon';
import { ModerkortIcon } from './Icons/ModerkortIcon';
import { AccessoriesIcon } from './Icons/AccessoriesIcon';

interface MenuItem {
  id: string;
  title: string;
  url: string;
  items?: MenuItem[];
}

interface MenuSection {
  id: string;
  title: string;
  url: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface MenuCategory {
  id: string;
  title: string;
  url: string;
  items?: MenuSection[];
}

const MENU_DATA: MenuCategory[] = [
  {
    id: 'datorer-och-tillbehor',
    title: 'Datorer & Tillbehör',
    url: '/produktserier',
    items: [
      {
        id: 'barbara',
        title: 'Bärbara',
        url: '/produktserier/laptops',
        icon: <LaptopIcon />,
        items: [
          { id: 'ultrabooks', title: 'Ultrabooks', url: '/produktserier/ultrabooks' },
          { id: 'gaming-barbara', title: 'Gaming bärbara', url: '/produktserier/gaming-laptops' },
          { id: 'kontor-barbara', title: 'Kontor', url: '/produktserier/office-laptops' },
        ],
      },
      {
        id: 'stationara',
        title: 'Stationära',
        url: '/produktserier/desktops',
        icon: <DesktopIcon />,
        items: [
          { id: 'mini-pc', title: 'Mini-PC', url: '/produktserier/mini-pc' },
          { id: 'allt-i-ett', title: 'Allt-i-ett', url: '/produktserier/all-in-one' },
          { id: 'arbetsdatorer', title: 'Arbetsdatorer', url: '/produktserier/workstations' },
        ],
      },
      {
        id: 'datortillbehor',
        title: 'Tillbehör',
        url: '/produktserier/accessories',
        icon: <AccessoriesIcon />,
        items: [
          { id: 'bildskarm', title: 'Bildskärmar', url: '/produktserier/monitors' },
          { id: 'tangentbord', title: 'Tangentbord', url: '/produktserier/keyboards' },
          { id: 'moss', title: 'Möss', url: '/produktserier/mice' },
          { id: 'lagring', title: 'Lagring', url: '/produktserier/storage' },
        ],
      },
    ],
  },
  {
    id: 'komponenter',
    title: 'Datorkomponenter',
    url: '/produktserier/components',
    items: [
      {
        id: 'processorer',
        title: 'Processorer',
        url: '/produktserier/processorer',
        icon: <ProcessorIcon />,
        items: [
          { id: 'intel', title: 'Intel', url: '/produktserier/intel-processorer' },
          { id: 'amd', title: 'AMD', url: '/produktserier/amd-processorer' },
        ],
      },
      {
        id: 'moderkort',
        title: 'Moderkort',
        url: '/produktserier/moderkort',
        icon: <ModerkortIcon />,
        items: [
          { id: 'intel-socket', title: 'Intel Socket', url: '/produktserier/intel-moderkort' },
          { id: 'amd-socket', title: 'AMD Socket', url: '/produktserier/amd-moderkort' },
        ],
      },
      {
        id: 'grafikkort',
        title: 'Grafikkort',
        url: '/produktserier/grafikkort',
        icon: <GrafikkortIcon />,
        items: [
          { id: 'nvidia', title: 'NVIDIA', url: '/produktserier/nvidia-grafikkort' },
          { id: 'amd-gpu', title: 'AMD', url: '/produktserier/amd-grafikkort' },
        ],
      },
      {
        id: 'ram',
        title: 'RAM-minnen',
        url: '/produktserier/ram',
        icon: <ProcessorIcon />,
        items: [
          { id: 'ddr5', title: 'DDR5', url: '/produktserier/ddr5-ram' },
          { id: 'ddr4', title: 'DDR4', url: '/produktserier/ddr4-ram' },
        ],
      },
      {
        id: 'lagringsenhet',
        title: 'Lagringsenhet',
        url: '/produktserier/lagring',
        icon: <ProcessorIcon />,
        items: [
          { id: 'ssd', title: 'SSD NVMe', url: '/produktserier/ssd-nvme' },
          { id: 'hdd', title: 'HDD', url: '/produktserier/hdd' },
        ],
      },
      {
        id: 'natlagring',
        title: 'Nätaggregat',
        url: '/produktserier/natlagring',
        icon: <ProcessorIcon />,
        items: [
          { id: 'modular', title: 'Modulär', url: '/produktserier/modular-psu' },
          { id: 'semi-modular', title: 'Semi-modulär', url: '/produktserier/semi-modular-psu' },
        ],
      },
    ],
  },
  {
    id: 'gaming',
    title: 'Gaming',
    url: '/produktserier/gaming',
    items: [
      {
        id: 'gaming-laptops',
        title: 'Gaming Bärbara',
        url: '/produktserier/gaming-laptops-gaming',
        icon: <LaptopIcon />,
        items: [
          { id: 'high-end', title: 'High-End', url: '/produktserier/high-end-gaming-laptops' },
          { id: 'mid-range', title: 'Mid-Range', url: '/produktserier/mid-range-gaming-laptops' },
        ],
      },
      {
        id: 'gaming-pc',
        title: 'Gaming PC',
        url: '/produktserier/gaming-pc-gaming',
        icon: <DesktopIcon />,
        items: [
          { id: 'budget', title: 'Budget', url: '/produktserier/budget-gaming-pc' },
          { id: 'pro', title: 'Pro', url: '/produktserier/pro-gaming-pc' },
        ],
      },
      {
        id: 'gaming-peripherals',
        title: 'Gaming Tillbehör',
        url: '/produktserier/gaming-peripherals',
        icon: <AccessoriesIcon />,
        items: [
          { id: 'gaming-mus', title: 'Gaming Möss', url: '/produktserier/gaming-mus' },
          { id: 'gaming-tangentbord', title: 'Gaming Tangentbord', url: '/produktserier/gaming-tangentbord' },
          { id: 'gaming-headset', title: 'Gaming Headset', url: '/produktserier/gaming-headset' },
        ],
      },
    ],
  },
  {
    id: 'mobiltelefoner',
    title: 'Mobiltelefoner',
    url: '/produktserier/phones',
    items: [
      {
        id: 'smartphones',
        title: 'Smartphones',
        url: '/produktserier/smartphones',
        icon: <ProcessorIcon />,
        items: [
          { id: 'flagship', title: 'Flaggskip', url: '/produktserier/flagship-phones' },
          { id: 'mid-range-phone', title: 'Mid-Range', url: '/produktserier/mid-range-phones' },
          { id: 'budget-phone', title: 'Budget', url: '/produktserier/budget-phones' },
        ],
      },
      {
        id: 'mobil-tillbehor',
        title: 'Mobil Tillbehör',
        url: '/produktserier/phone-accessories',
        icon: <AccessoriesIcon />,
        items: [
          { id: 'skal', title: 'Skal & Skydd', url: '/produktserier/phone-cases' },
          { id: 'laddare', title: 'Laddare', url: '/produktserier/phone-chargers' },
          { id: 'screenprotectors', title: 'Skärmskydd', url: '/produktserier/screen-protectors' },
        ],
      },
    ],
  },
  {
    id: 'tv-hifi',
    title: 'TV & HiFi',
    url: '/produktserier/tv-hifi',
    items: [
      {
        id: 'tv',
        title: 'TV',
        url: '/produktserier/television',
        icon: <ProcessorIcon />,
        items: [
          { id: '4k-tv', title: '4K TV', url: '/produktserier/4k-television' },
          { id: 'oled-tv', title: 'OLED TV', url: '/produktserier/oled-television' },
          { id: 'gaming-tv', title: 'Gaming TV', url: '/produktserier/gaming-television' },
        ],
      },
      {
        id: 'ljud',
        title: 'Ljud & HiFi',
        url: '/produktserier/audio',
        icon: <AccessoriesIcon />,
        items: [
          { id: 'hogtalare', title: 'Högtalare', url: '/produktserier/speakers' },
          { id: 'horlur', title: 'Hörlurar', url: '/produktserier/headphones' },
          { id: 'surround', title: 'Surround System', url: '/produktserier/surround-system' },
        ],
      },
      {
        id: 'tillbehor-tv',
        title: 'TV Tillbehör',
        url: '/produktserier/tv-accessories',
        icon: <AccessoriesIcon />,
        items: [
          { id: 'montering', title: 'TV Montering', url: '/produktserier/tv-mounts' },
          { id: 'soundbar', title: 'Soundbar', url: '/produktserier/soundbars' },
        ],
      },
    ],
  },
];

export function HeaderWrapper() {
  const { open } = useAside();
  const pathname = usePathname();
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const isPathActive = (url: string) => {
    if (url === '/') return pathname === '/';
    return pathname.startsWith(url);
  };

  useEffect(() => {
    // Load cart from sessionStorage on mount
    const savedCart = sessionStorage.getItem('cart');
    if (savedCart) {
      try {
        const { count, total } = JSON.parse(savedCart);
        setCartCount(count);
        setCartTotal(total);
      } catch (e) {
        console.error('Failed to load cart from sessionStorage', e);
      }
    }
  }, []);

  useEffect(() => {
    const handleAddToCart = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { price, quantity } = customEvent.detail;
      const priceNum = typeof price === 'string' ? parseInt(price) : price;

      const newCount = cartCount + (quantity || 1);
      const newTotal = cartTotal + (priceNum * (quantity || 1));

      setCartCount(newCount);
      setCartTotal(newTotal);

      // Save to sessionStorage
      sessionStorage.setItem('cart', JSON.stringify({ count: newCount, total: newTotal }));

      // Show header when item is added to cart
      setIsHeaderVisible(true);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };

    const handleCartUpdated = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { totalAmount, itemCount } = customEvent.detail;
      setCartTotal(totalAmount);
      setCartCount(itemCount);

      // Save to localStorage
      localStorage.setItem('cart', JSON.stringify({ count: itemCount, total: totalAmount }));
    };

    window.addEventListener('addToCart', handleAddToCart);
    window.addEventListener('cartUpdated', handleCartUpdated);
    return () => {
      window.removeEventListener('addToCart', handleAddToCart);
      window.removeEventListener('cartUpdated', handleCartUpdated);
    };
  }, [cartCount, cartTotal]);

  // Handle scroll to show/hide header
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show header when scrolling up
      if (currentScrollY < lastScrollY.current) {
        setIsHeaderVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Hide header when scrolling down
        setIsHeaderVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getActiveCategory = () => MENU_DATA.find(cat => cat.id === activeMegaMenu);

  return (
    <header className={`sticky top-0 left-0 right-0 w-full bg-white z-40 transition-transform ${
      isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
    }`}>
      {/* Search bar section */}
      <div className="px-6 py-4">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex-shrink-0">
            <Logo />
          </Link>

          {/* Search Input */}
          <div className="flex-1 relative">
            <div className="relative flex items-center bg-gray-100 px-3 py-2 rounded">
              <svg className="w-5 h-5 text-gray-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM21 21l-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Sök efter produkt, kategori eller artikel"
                className="flex-1 bg-transparent text-sm placeholder-gray-400 focus:outline-none py-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm.length > 1 && setShowSearchResults(true)}
              />
            </div>
            {showSearchResults && searchTerm.length > 1 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg z-50 max-h-96 overflow-y-auto">
                <div className="p-3 text-sm text-gray-600">
                  Inga resultat för "{searchTerm}"
                </div>
              </div>
            )}
          </div>

          {/* Right side icons */}
          <div className="flex items-center gap-6 flex-shrink-0">
            {/* Language Switcher */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>
            <div className="hidden md:block w-px h-6 bg-gray-300"></div>
            <Link href="/konto" className="hidden md:flex items-center gap-2 text-black hover:text-gray-600">
              <span className="text-xs font-semibold">Mitt konto</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </Link>
            <div className="hidden md:block w-px h-6 bg-gray-300"></div>
            <button
              onClick={() => open('cart')}
              className="flex items-center gap-4 text-black"
            >
              <div className="relative flex items-center pt-1">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-lg">{cartCount}</span>
                )}
              </div>
              <div className="flex flex-col items-end gap-0.5 hidden md:flex">
                <span className="text-sm font-bold text-black">{cartTotal.toLocaleString('sv-SE')} kr</span>
                <span className="text-xs font-semibold text-black">Varukorg</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation & Mega Menu Wrapper */}
      <div onMouseLeave={() => { setShowMegaMenu(false); setActiveMegaMenu(null); }}>
        {/* Navigation */}
        <nav className="bg-white">
          <div className="px-6 py-0 flex justify-center">
            <div className="w-full max-w-[1280px] flex items-stretch gap-0">
              {MENU_DATA.map((category) => {
                const isActive = isPathActive(category.url);
                return (
                  <button
                    key={category.id}
                    onMouseEnter={() => {
                      if (category.items && category.items.length > 0) {
                        setShowMegaMenu(true);
                        setActiveMegaMenu(category.id);
                      }
                    }}
                    onClick={() => category.items?.length === 0 && (window.location.href = category.url)}
                    className="px-6 py-4 text-sm font-semibold text-black whitespace-nowrap relative group"
                  >
                    {category.title}
                    <span className={`absolute bottom-0 left-6 right-6 h-0.5 transition-all ${
                      isActive ? 'bg-black' : 'bg-transparent group-hover:bg-black'
                    }`}></span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Mega Menu */}
        {showMegaMenu && activeMegaMenu && getActiveCategory()?.items && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white z-40 flex justify-center border-b border-l border-r border-gray-200">
            <div className="w-[1280px] px-6">
              <div className="py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {getActiveCategory()?.items?.map((section) => (
                    <div key={section.id}>
                      <div className="mb-4 pb-4 border-b border-gray-200">
                        <div className="text-black flex-shrink-0 mb-2 w-6 h-6 flex items-center justify-center">
                          {section.icon}
                        </div>
                        <Link href={section.url}>
                          <h3 className={`font-bold text-sm uppercase tracking-wide transition-colors cursor-pointer ${
                            isPathActive(section.url)
                              ? 'text-black'
                              : 'text-black hover:text-gray-600'
                          }`}>
                            {section.title}
                          </h3>
                        </Link>
                      </div>
                      <ul className="space-y-2">
                        {section.items && section.items.map((item) => (
                          <li key={item.id}>
                            <Link href={item.url} className={`text-sm transition-colors ${
                              isPathActive(item.url)
                                ? 'font-bold text-black'
                                : 'text-gray-700 hover:text-black'
                            }`}>
                              {item.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="w-full h-px bg-gray-200 relative z-50"></div>
    </header>
  );
}
