'use client';

import Link from 'next/link';
import { useState, useCallback } from 'react';
import { Product } from '@/app/lib/products';

export default function ProductDetailClient({ product }: { product: Product }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = useCallback(() => {
    const cartEvent = new CustomEvent('addToCart', {
      detail: {
        id: product.id,
        title: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        quantity,
      },
    });
    window.dispatchEvent(cartEvent);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }, [product, quantity]);

  const getProxiedImageUrl = (url: string) => {
    return `/api/image?url=${encodeURIComponent(url)}`;
  };

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12">
      <Link href="/produkter" className="text-gray-600 hover:text-gray-900 mb-8 inline-block">
        ← Tillbaka till produkter
      </Link>

      <div className="grid grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="bg-gray-100 aspect-square flex items-center justify-center rounded-lg mb-6 overflow-hidden">
            {(product.images?.[imageIndex] || product.image) ? (
              <img
                src={getProxiedImageUrl(product.images?.[imageIndex] || product.image)}
                alt={product.title}
                className="w-full h-full object-contain p-8"
                onError={(e) => {
                  console.error('Image failed to load:', e.currentTarget.src);
                }}
              />
            ) : (
              <div className="text-gray-400">Ingen bild</div>
            )}
          </div>

          {product.images && product.images.length > 1 && (
            <div className="flex gap-2 justify-start">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setImageIndex(idx)}
                  className={`w-16 h-16 rounded border-2 transition-colors ${
                    imageIndex === idx ? 'border-black' : 'border-gray-300'
                  }`}
                >
                  <img
                    src={getProxiedImageUrl(product.images![idx])}
                    alt={`${product.title} ${idx + 1}`}
                    className="w-full h-full object-contain p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          {product.brand && (
            <p className="text-xs text-gray-500 font-medium mb-2 uppercase">{product.brand}</p>
          )}

          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating || 0) ? 'text-black text-xl' : 'text-gray-300 text-xl'}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews || 0} recensioner)</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-gray-900">
                {product.price.toLocaleString('sv-SE')} kr
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  {product.originalPrice.toLocaleString('sv-SE')} kr
                </span>
              )}
            </div>
            {product.discountPercent && (
              <p className="text-green-600 font-semibold mt-2">Spara {product.discountPercent}%</p>
            )}
          </div>

          {/* Stock */}
          <div className="mb-6">
            <p className={`font-semibold flex items-center gap-2 ${product.stock ? 'text-green-600' : 'text-gray-400'}`}>
              <span className={`w-3 h-3 rounded-full ${product.stock ? 'bg-green-600' : 'bg-gray-300'}`}></span>
              {product.stock || 'Slut i lager'}
            </p>
          </div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-4">Funktioner</h3>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-gray-400 mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-4">Färger</h3>
              <div className="flex gap-3">
                {product.colors.map((color, idx) => (
                  <button
                    key={idx}
                    className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-900 transition-colors"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quantity and Add to Cart */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 font-bold text-gray-600 hover:bg-gray-100"
              >
                −
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center py-2 border-none focus:outline-none"
                min="1"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 font-bold text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={added || !product.stock}
              className={`flex-1 py-3 rounded font-bold text-white flex items-center justify-center gap-2 transition-colors ${
                added
                  ? 'bg-green-600 hover:bg-green-700'
                  : product.stock
                  ? 'bg-black hover:bg-gray-800'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {added ? (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  Tillagd i varukorg
                </>
              ) : product.stock ? (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                  Lägg i varukorg
                </>
              ) : (
                'Slut i lager'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
