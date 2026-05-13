import { notFound } from 'next/navigation';
import { MainLayout } from '@/app/components/MainLayout';
import { getProductByHandle, getBreadcrumbTrail } from '@/app/lib/products';
import ProductDetailClient from '@/app/produktserier/[slug]/[handle]/ProductDetailClient';

interface PageProps {
  params: Promise<{
    handle: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);

  if (!product) {
    notFound();
  }

  const categorySlug = product.category || 'laptops';
  const breadcrumbTrail = getBreadcrumbTrail(categorySlug);

  return (
    <MainLayout>
      <ProductDetailClient
        product={product}
        categorySlug={categorySlug}
        categoryTitle={product.category || 'Produkter'}
        breadcrumbTrail={breadcrumbTrail}
      />
    </MainLayout>
  );
}
