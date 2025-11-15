// Cart service for API calls

export async function addToCart(productId, quantity = 1) {
  const response = await fetch(`/api/Cart/${productId}?quantity=${quantity}`, {
    method: 'POST',
    credentials: 'include', // include cookies if needed
  });
  if (!response.ok) throw new Error('Failed to add to cart');
  return response;
}

export async function getCart() {
  const response = await fetch('/api/Cart', {
    method: 'GET',
    credentials: 'include',
  });
  if (!response.ok) throw new Error('Failed to fetch cart');
  return response.json();
}
