'use client';

import Link from 'next/link';
import { useState } from 'react';
import { PageContent } from '@/app/components/PageContent';
import { ProductItem } from '@/app/components/ProductItem';

interface Subcategory {
  title: string;
  handle: string;
}

const CATEGORY_DATA: Record<string, { name: string; description: string; subcategories: Subcategory[] }> = {
  'laptops': {
    name: 'Laptops',
    description: 'Högpresterande laptops för gaming, arbete och kreativt arbete',
    subcategories: [
      { title: 'Gaming Laptops', handle: 'gaming-laptops' },
      { title: 'Ultrabooks', handle: 'ultrabooks' },
      { title: 'Arbetslaptops', handle: 'arbetslaptops' },
    ],
  },
  'datorer': {
    name: 'Datorer',
    description: 'Stationära datorer för alla behov',
    subcategories: [
      { title: 'Gaming PC', handle: 'gaming-pc' },
      { title: 'Arbetsstationer', handle: 'arbetsstationer' },
      { title: 'Kontor', handle: 'kontor' },
    ],
  },
  'komponenter': {
    name: 'Komponenter',
    description: 'Processorer, grafikkort och annat datorkrypto',
    subcategories: [
      { title: 'Processorer', handle: 'processorer' },
      { title: 'Grafikkort', handle: 'grafikkort' },
      { title: 'RAM & Lagring', handle: 'ram-lagring' },
    ],
  },
  'tillbehor': {
    name: 'Tillbehör',
    description: 'Periferiutrustning och tillbehör för din dator',
    subcategories: [
      { title: 'Monitorer', handle: 'monitorer' },
      { title: 'Tangentbord & Möss', handle: 'tangentbord-moss' },
      { title: 'Headset & Ljud', handle: 'headset-ljud' },
    ],
  },
};

const PRODUCTS_BY_CATEGORY: Record<string, any[]> = {
  'laptops': [
    { id: '1', title: 'ASUS ROG Gaming Laptop 16"', handle: 'asus-rog-gaming-laptop', price: '14999', originalPrice: '17999', brand: 'ASUS', discount: 17, rating: 5, reviews: 128 },
    { id: '5', title: 'Dell XPS 13', handle: 'dell-xps-13', price: '12999', originalPrice: '14999', brand: 'Dell', discount: 13, rating: 5, reviews: 112 },
    { id: '9', title: 'Lenovo ThinkPad Pro', handle: 'lenovo-thinkpad', price: '13999', originalPrice: '16999', brand: 'Lenovo', discount: 18, rating: 5, reviews: 101 },
  ],
  'komponenter': [
    { id: '2', title: 'Intel Core i9-13900H', handle: 'intel-core-i9', price: '8999', originalPrice: '9999', brand: 'Intel', discount: 10, rating: 5, reviews: 89 },
    { id: '3', title: 'NVIDIA RTX 4080', handle: 'nvidia-rtx-4080', price: '11999', originalPrice: '13999', brand: 'NVIDIA', discount: 14, rating: 5, reviews: 156 },
    { id: '6', title: 'AMD Ryzen 9', handle: 'amd-ryzen-9', price: '7999', originalPrice: '8999', brand: 'AMD', discount: 11, rating: 5, reviews: 95 },
    { id: '10', title: 'RTX 4070 Ti', handle: 'rtx-4070-ti', price: '8999', originalPrice: '10999', brand: 'NVIDIA', discount: 18, rating: 5, reviews: 143 },
  ],
  'datorer': [
    { id: '11', title: 'Gaming PC Ultimate', handle: 'gaming-pc-ultimate', price: '24999', originalPrice: '29999', brand: 'Custom', discount: 17, rating: 5, reviews: 87 },
    { id: '12', title: 'Workstation Pro', handle: 'workstation-pro', price: '19999', originalPrice: '24999', brand: 'Custom', discount: 20, rating: 5, reviews: 64 },
  ],
  'tillbehor': [
    { id: '4', title: 'Corsair Headset', handle: 'corsair-headset', price: '1499', originalPrice: '1899', brand: 'Corsair', discount: 21, rating: 5, reviews: 67 },
    { id: '7', title: 'Samsung Monitor 4K', handle: 'samsung-monitor-4k', price: '5499', originalPrice: '6999', brand: 'Samsung', discount: 21, rating: 5, reviews: 78 },
    { id: '8', title: 'Mechanical Gaming Keyboard', handle: 'gaming-keyboard', price: '1299', originalPrice: '1699', brand: 'Corsair', discount: 24, rating: 5, reviews: 234 },
    { id: '11', title: 'Mouse Logitech MX', handle: 'logitech-mx-mouse', price: '899', originalPrice: '1199', brand: 'Logitech', discount: 25, rating: 5, reviews: 189 },
    { id: '12', title: 'Mousepad Large Pro', handle: 'mousepad-pro', price: '499', originalPrice: '699', brand: 'SteelSeries', discount: 29, rating: 5, reviews: 55 },
  ],
};

export default function CategoryPage({ params }: { params: { handle: string } }) {
  const category = CATEGORY_DATA[params.handle];
  const products = PRODUCTS_BY_CATEGORY[params.handle] || [];

  if (!category) {
    return (
      <PageContent>
        <h1 className="text-3xl font-bold mb-4">Kategorin hittades inte</h1>
        <Link href="/" className="text-blue-600 hover:underline">Tillbaka till startsidan</Link>
      </PageContent>
    );
  }

  return (
    <PageContent>
      <div className="w-full py-12">
        <h1 className="text-4xl font-bold text-center mb-12">{category.name}</h1>

        <div className="w-full h-px bg-gray-200 mb-8"></div>

        <div className="w-full">
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">Inga produkter hittades i denna kategori</p>
              <Link href="/produkter" className="text-blue-600 hover:underline">
                Bläddra bland alla produkter
              </Link>
            </div>
          )}
        </div>
      </div>
    </PageContent>
  );
}
