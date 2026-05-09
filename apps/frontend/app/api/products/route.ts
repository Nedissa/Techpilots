export async function GET() {
  try {
    const response = await fetch(
      'https://techpilots.medusajs.app/store/products?limit=100',
      {
        headers: {
          'x-publishable-api-key': 'pk_ab6e93368dc9440a191c0540f0ab9227b81f916924bc422b654c61d371652e29',
        },
      }
    );

    if (!response.ok) {
      return Response.json(
        { error: 'Failed to fetch from Medusa' },
        { status: response.status }
      );
    }

    const data = await response.json();
    const products = data.products || [];

    const transformedProducts = products.map((product: any, idx: number) => {
      const image = product.images?.[0]?.url || product.thumbnail || '';

      // Get price from first variant if available
      let price = 0;
      let originalPrice: number | undefined = undefined;

      if (product.variants && product.variants.length > 0) {
        const firstVariant = product.variants[0];
        if (firstVariant.prices && firstVariant.prices.length > 0) {
          const firstPrice = firstVariant.prices[0];
          price = firstPrice.amount || 0;
        }
      }

      const colors = ['#000000', '#FFFFFF', '#C0C0C0', '#808080'];
      const features = [
        'Intel Core i7 Processor',
        '16GB RAM Memory',
        '512GB SSD Storage',
        'NVIDIA Graphics'
      ];

      // Assign section categories based on product index
      let sectionCategory = 'popular';
      if (idx % 3 === 1) sectionCategory = 'recommended';
      if (idx % 3 === 2) sectionCategory = 'new';

      // Calculate discount percentage if we have both prices
      let discountPercent = undefined;
      if (originalPrice && price) {
        discountPercent = Math.floor(((originalPrice - price) / originalPrice) * 100);
      }

      return {
        id: product.id,
        title: product.title,
        handle: product.handle,
        price: price,
        originalPrice: originalPrice,
        image: image,
        images: (product.images?.map((img: any) => img.url) || []).slice(0, 3),
        category: product.collection?.title || sectionCategory,
        brand: ['ASUS', 'Dell', 'HP', 'Lenovo'][idx % 4],
        colors: colors,
        stock: 'I lager',
        rating: 3 + Math.random() * 2,
        reviews: Math.floor(Math.random() * 50) + 5,
        features: features,
        isNew: idx % 3 === 0,
        discountPercent: discountPercent,
        sectionCategory: sectionCategory,
      };
    });

    return Response.json({ products: transformedProducts });
  } catch (error) {
    console.error('Error in /api/products:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
