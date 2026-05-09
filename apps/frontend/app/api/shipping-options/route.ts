export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country') || 'se';
    const cartId = searchParams.get('cart_id');

    const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;

    if (!publishableKey) {
      return Response.json(
        { error: 'Medusa publishable key not configured' },
        { status: 500 }
      );
    }

    // If no cart_id provided, create one first
    let actualCartId = cartId;
    if (!actualCartId) {
      const createCartResponse = await fetch('https://techpilots.medusajs.app/store/carts', {
        method: 'POST',
        headers: {
          'x-publishable-api-key': publishableKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!createCartResponse.ok) {
        const error = await createCartResponse.text();
        console.error('Failed to create cart:', error);
        return Response.json(
          { error: 'Failed to create cart for shipping options' },
          { status: createCartResponse.status }
        );
      }

      const cartData = await createCartResponse.json();
      actualCartId = cartData.cart?.id;

      if (!actualCartId) {
        console.error('No cart ID returned from Medusa');
        return Response.json(
          { error: 'Failed to create cart' },
          { status: 500 }
        );
      }
    }

    // Now fetch shipping options for the cart
    const url = new URL('https://techpilots.medusajs.app/store/shipping-options');
    url.searchParams.set('cart_id', actualCartId);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'x-publishable-api-key': publishableKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Medusa shipping options error:', error);
      return Response.json(
        { error: 'Failed to fetch shipping options from Medusa' },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Get all shipping options
    const allOptions = data.shipping_options || [];

    // Map to simplified format - include all options
    const shippingOptions = allOptions.map((option: any) => {
      let amount = 0;

      // For Standard shipping, prefer 0 if available (free shipping)
      // For Express shipping, prefer the highest amount (paid shipping)
      if (option.prices && option.prices.length > 0) {
        if (option.type?.code === 'standard') {
          // For standard, use 0 if available
          const zeroPrice = option.prices.find((p: any) => p.amount === 0);
          amount = zeroPrice?.amount ?? Math.min(...option.prices.map((p: any) => p.amount || 0));
        } else {
          // For express, use the highest amount
          amount = Math.max(...option.prices.map((p: any) => p.amount || 0));
        }
      }

      return {
        id: option.id,
        name: option.name,
        amount: amount,
        type: option.type?.code || 'standard'
      };
    });

    return Response.json({
      shipping_options: shippingOptions,
      cart_id: actualCartId
    });
  } catch (error) {
    console.error('Shipping options error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
