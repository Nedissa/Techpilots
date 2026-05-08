import Link from 'next/link';
import { ProductsSection } from './components/ProductsSection';
import { ProductBanner } from './components/ProductBanner';
import { MainLayout } from './components/MainLayout';
import { NewsletterPopup } from './components/NewsletterPopup';
import { HeroCarouselClient } from './components/HeroCarouselClient';

const FEATURED_COLLECTIONS = [
  { title: 'Gaming Laptops', handle: 'gaming-laptops' },
  { title: 'Datorkomponenter', handle: 'datorkomponenter' },
  { title: 'Gaming Setup', handle: 'gaming-setup' },
]

function CampaignBannersSection() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <CampaignBanner title="Se alla veckans deals" bgColor="bg-blue-900" />
      <CampaignBanner title="Samsung Micro RGB" bgColor="bg-black" />
      <CampaignBanner title="Vi tömmer lagret!" bgColor="bg-blue-900" />
      <CampaignBanner title="50% rabatt på kök!" bgColor="bg-green-100" />
    </div>
  );
}

async function fetchProductsFromAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/products');
    if (!response.ok) return [];
    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}


function CampaignBanner({
  title,
  bgColor,
}: {
  title: string;
  bgColor: string;
}) {
  return (
    <div className={`${bgColor} p-6 h-32 flex items-end justify-start overflow-hidden relative`} style={{}}>
      <h3 className={`text-xl font-bold ${bgColor === 'bg-green-100' ? 'text-green-700' : 'text-white'}`}>
        {title}
      </h3>
    </div>
  );
}

function CallToAction() {
  return (
    <div className="flex justify-center">
      <div className="max-w-[1280px] w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-6">
        <h2 className="text-4xl font-bold mb-4">Är du redo att uppgradera?</h2>
        <p className="text-xl mb-8 max-w-2xl">
          Hitta de bästa datorerna, komponenterna och tillbehöret. Snabb leverans och utmärkt kundsupport.
        </p>
        <Link href="/produkter" className="inline-block bg-white text-gray-900 px-8 py-3 rounded font-bold hover:bg-gray-100">
          Börja shoppa nu →
        </Link>
      </div>
    </div>
  );
}

export default async function Home() {
  const products = await fetchProductsFromAPI();

  return (
    <div className="relative">
      <MainLayout bordered={true} noPadding={true}>
        <div className="flex flex-col gap-4">
          <div className="-mx-6">
            <HeroCarouselClient collections={FEATURED_COLLECTIONS} />
          </div>
          <div className="px-6">
            <ProductsSection
              variant="popular"
              products={products.slice(0, 4)}
            />
          </div>
          <div className="px-6">
            <ProductBanner />
          </div>
          <div className="px-6">
            <ProductsSection
              variant="recommended"
              products={products.slice(4, 8)}
            />
          </div>
          <div className="-mx-6">
            <CallToAction />
          </div>
        </div>
      </MainLayout>
      <div className="fixed bottom-4 right-4 z-50">
        <NewsletterPopup />
      </div>
    </div>
  );
}
