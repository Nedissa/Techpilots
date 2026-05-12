import { notFound } from 'next/navigation';
import { MainLayout } from '@/app/components/MainLayout';
import { getProductByHandle } from '@/app/lib/products';
import ProductDetailClient from './ProductDetailClient';

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

  return (
    <MainLayout>
      <ProductDetailClient product={product} />
    </MainLayout>
  );
}
