'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MainLayout } from '@/app/components/MainLayout';

const MOCK_PRODUCT = {
  id: '1',
  title: 'ASUS ROG Gaming Laptop 16"',
  vendor: 'ASUS',
  price: 14999,
  compareAtPrice: 17999,
  rating: 5,
  reviews: 128,
  sku: 'ASUS-ROG-16-001',
  quantityAvailable: 12,
  description: 'En kraftfull gaming-laptop med senaste teknik. Perfekt för gaming och professionellt arbete.\n\nUtstyrd med Intel Core i9-13900H, NVIDIA RTX 4080, 32GB DDR5 RAM och 1TB SSD. 16" 3.2K 165Hz display för en otrolig visuell upplevelse.',
  featuredImage: {
    url: 'https://via.placeholder.com/800?text=ASUS+Laptop+Main',
    altText: 'ASUS ROG Gaming Laptop',
  },
  images: [
    { id: '1', url: 'https://via.placeholder.com/800?text=ASUS+Laptop+1', altText: 'ASUS ROG 1' },
    { id: '2', url: 'https://via.placeholder.com/800?text=ASUS+Laptop+2', altText: 'ASUS ROG 2' },
    { id: '3', url: 'https://via.placeholder.com/800?text=ASUS+Laptop+3', altText: 'ASUS ROG 3' },
    { id: '4', url: 'https://via.placeholder.com/800?text=ASUS+Laptop+4', altText: 'ASUS ROG 4' },
  ],
  highlights: [
    { value: 'Intel Core i9', label: 'Processor' },
    { value: '32GB DDR5', label: 'RAM' },
    { value: '1TB SSD', label: 'Lagring' },
    { value: '16" 3.2K 165Hz', label: 'Display' },
    { value: 'RTX 4080', label: 'GPU' },
    { value: '8-10h', label: 'Batteritid' },
  ],
};

const COLORS = {
  'Svart': '#000000',
  'Vit': '#FFFFFF',
  'Silver': '#C0C0C0',
};

export default function ProductPage({ params }: { params: { handle: string } }) {
  const product = MOCK_PRODUCT;
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Svart');
  const [activeTab, setActiveTab] = useState('description');
  const router = useRouter();

  const discountPercent = Math.round(
    ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
  );

  const mainImage = product.images[selectedImage] || product.featuredImage;

  return (
    <MainLayout>
      <div>
        {/* Breadcrumbs and Rating */}
        <div className="flex flex-col gap-1 mb-5">
          <div className="flex items-center gap-2 text-sm text-black">
            <Link href="/" className="hover:text-gray-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </Link>
            <span>/</span>
            <Link href="/produktserier" className="hover:text-gray-600">
              {product.vendor}
            </Link>
            <span>/</span>
            <span className="text-black font-medium">{product.title}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex gap-1 text-black">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
            <span className="text-sm text-black">5.0 ({product.reviews})</span>
          </div>
        </div>

        {/* Main Product Grid */}
        <div className="flex gap-2.5 mb-0">
          {/* Left Column - Image & Tabs */}
          <div className="flex-1 flex flex-col gap-2.5">
            {/* Image Gallery */}
            <div
              className="p-8 flex gap-6 bg-white"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            >
              {/* Highlights Card */}
              <div className="flex flex-col w-72">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Snabbfakta</h3>
                <div className="border-b border-gray-200 pb-4 mb-4">
                  <div className="grid grid-cols-2 gap-8">
                    {product.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div
                          className="flex-shrink-0 text-black text-xl flex items-center justify-center"
                          style={{ minWidth: '20px', minHeight: '20px' }}
                        >
                          +
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900">{item.value}</div>
                          <div className="text-xs text-gray-600">{item.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600">
                  Viktiga egenskaper och specifikationer för denna produkt.
                </p>
              </div>

              {/* Image Gallery */}
              <div className="flex-1">
                {/* Main Image */}
                <div className="flex items-center justify-center gap-6 mb-4">
                  <button
                    onClick={() => setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)}
                    className="text-black hover:text-gray-600 text-5xl font-bold transition-colors flex-shrink-0"
                  >
                    ‹
                  </button>

                  <div className="relative bg-white flex items-center justify-center h-96 w-full overflow-hidden">
                    <img
                      src={mainImage.url}
                      alt={mainImage.altText}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <button
                    onClick={() => setSelectedImage((prev) => (prev + 1) % product.images.length)}
                    className="text-black hover:text-gray-600 text-5xl font-bold transition-colors flex-shrink-0"
                  >
                    ›
                  </button>
                </div>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div
                    className="flex gap-4 overflow-x-auto p-4 bg-white justify-center"
                    style={{
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                    }}
                  >
                    {product.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`flex-shrink-0 w-16 h-16 overflow-hidden transition-all duration-150 ${
                          selectedImage === idx ? 'scale-125' : ''
                        }`}
                      >
                        <img src={img.url} alt="" className="w-full h-full object-contain" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Product Tabs */}
            <div
              className="p-8 pb-0 flex-1 bg-white"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
            >
              <div className="pt-0 w-full pb-8">
                {/* Tab Bar */}
                <div className="flex gap-8 mb-8 border-b border-gray-200 w-full justify-center">
                  {[
                  { key: 'description', label: 'Beskrivning' },
                  { key: 'specifications', label: 'Specifikationer' },
                  { key: 'reviews', label: 'Recensioner' },
                  { key: 'questions', label: 'Frågor' },
                ].map(({ key, label }) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      className={`pb-4 font-medium text-sm transition-colors whitespace-nowrap flex items-center gap-2 ${
                        activeTab === key
                          ? 'text-black border-b-2 border-black'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {key === 'description' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M3 3h18v2H3V3zm0 4h18v2H3V7zm0 4h18v2H3v-2zm0 4h18v2H3v-2z" />
                        </svg>
                      )}
                      {key === 'specifications' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5.04-6.71l-2.75 3.54-2.12-2.59-1.84 2.25h9.5L13.96 9.29z" />
                        </svg>
                      )}
                      {key === 'reviews' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      )}
                      {key === 'questions' && (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.5-3 5h2c0-2.5 3-3 3-5 0-2.21-1.79-4-4-4z" />
                        </svg>
                      )}
                      {label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'description' && (
                  <div className="space-y-3 pb-8">
                    <div className="border-b border-gray-200 pb-3">
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{product.description}</p>
                    </div>
                  </div>
                )}

                {activeTab === 'specifications' && (
                  <div className="space-y-3 pb-8">
                    {[
                      { label: 'Processor', value: 'Intel Core i9-13900H' },
                      { label: 'Minne', value: '32GB DDR5' },
                      { label: 'Lagring', value: '1TB NVMe SSD' },
                      { label: 'Skärm', value: '16" 3.2K 165Hz' },
                      { label: 'Grafikkort', value: 'NVIDIA GeForce RTX 4080' },
                    ].map((spec, idx) => (
                      <div key={idx} className="border-b border-gray-200 pb-3">
                        <p className="text-sm font-semibold text-gray-900">{spec.label}</p>
                        <p className="text-sm text-gray-700">{spec.value}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-3 pb-8">
                    {[
                      { rating: 5, title: 'Utmärkt laptop', text: 'En fantastisk laptop med utmärkt prestanda och display. Väl värd pengarna!' },
                      { rating: 5, title: 'Mycket nöjd', text: 'Leverans gick snabbt och produkten är exakt som beskrivit.' },
                    ].map((review, idx) => (
                      <div key={idx} className="border-b border-gray-200 pb-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-black">★</span>
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-gray-900">{review.title}</span>
                        </div>
                        <p className="text-sm text-gray-700">{review.text}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'questions' && (
                  <div className="space-y-3 pb-8">
                    {[
                      { q: 'Hur lång är batteritiden?', a: 'Batteritiden är cirka 8-10 timmar beroende på användning.' },
                      { q: 'Kan man uppgradera RAM?', a: 'Ja, RAM kan uppgraderas. Kontakta oss för mer information.' },
                    ].map((qa, idx) => (
                      <div key={idx} className="border-b border-gray-200 pb-3">
                        <div className="font-semibold text-gray-900 mb-2">{qa.q}</div>
                        <p className="text-sm text-gray-700">{qa.a}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div
            className="w-96 flex flex-col p-6 bg-white"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.15)', height: 'fit-content' }}
          >
            {/* Sale Badge */}
            {discountPercent > 0 && (
              <div className="inline-block bg-red-600 text-white px-3 py-1 text-xs font-bold mb-4 rounded w-fit">
                -{discountPercent}%
              </div>
            )}

            {/* SKU + Title */}
            <div className="flex flex-col mb-4">
              <p className="text-sm text-black leading-tight">Varukod: {product.sku}</p>
              <h1 className="text-2xl font-bold text-black line-clamp-2 leading-tight">{product.title}</h1>
            </div>

            {/* Price Section */}
            <div className="mb-4">
              <div className="flex flex-col gap-1 mb-3">
                <span className="text-3xl font-bold text-red-600">
                  {product.price.toLocaleString('sv-SE')} kr
                </span>
                {product.compareAtPrice > product.price && (
                  <span className="text-lg text-gray-400 line-through">
                    {product.compareAtPrice.toLocaleString('sv-SE')} kr
                  </span>
                )}
              </div>

              {/* Stock */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-black font-medium">Webblager</span>
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                <span className="text-black">{product.quantityAvailable} st</span>
              </div>
            </div>

            {/* Color Selector */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Välj färg{selectedColor && <span className="text-gray-600 font-normal"> - {selectedColor}</span>}
              </label>
              <div className="flex gap-2">
                {Object.entries(COLORS).map(([name, hex]) => (
                  <button
                    key={name}
                    onClick={() => setSelectedColor(name)}
                    className={`w-6 h-6 rounded border-2 flex-shrink-0 transition-all ${
                      selectedColor === name ? 'border-black scale-110' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: hex }}
                    title={name}
                  />
                ))}
              </div>
            </div>

            {/* Quantity Stepper */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-900 mb-2">Antal</label>
              <div className="flex items-center bg-gray-100 w-fit h-9 px-3 gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-gray-700 hover:text-black font-bold"
                >
                  −
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-8 text-center bg-transparent focus:outline-none text-sm font-semibold border-none"
                  style={{
                    WebkitAppearance: 'none',
                    MozAppearance: 'textfield',
                  }}
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-gray-700 hover:text-black font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={() => {
                const event = new CustomEvent('addToCart', {
                  detail: {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    originalPrice: product.compareAtPrice,
                    quantity: quantity,
                  },
                });
                window.dispatchEvent(event);
              }}
              className="w-full bg-black text-white text-sm font-semibold py-3 px-4 mb-2 hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" fill="none"/>
              </svg>
              Lägg i varukorg
            </button>

            {/* Buy Now Button */}
            <button
              onClick={() => {
                const quickCheckoutItem = {
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  originalPrice: product.compareAtPrice,
                  quantity: quantity,
                };
                localStorage.setItem('quickCheckout', JSON.stringify(quickCheckoutItem));
                router.push('/kassan');
              }}
              className="w-full bg-green-600 text-white text-sm font-semibold py-3 px-4 mb-4 hover:bg-green-700 transition-colors"
            >
              Handla nu
            </button>

            {/* Key Features Footer */}
            <div className="space-y-3 text-sm border-t border-gray-200 pt-4">
              <div className="flex items-center justify-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-black text-xs">Fri frakt</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-black text-xs">Fria returer</span>
                </div>
              </div>
              <div className="pt-2 border-t border-gray-200 flex justify-center">
                <div className="inline-block bg-pink-300 text-pink-900 px-3 py-1 text-xs font-bold rounded">
                  Klarna
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
