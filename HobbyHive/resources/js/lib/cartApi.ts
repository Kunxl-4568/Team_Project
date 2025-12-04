// resources/js/lib/cartApi.ts

export interface CartItem {
  id: number;
  product_id: number;
  title: string;
  image?: string | null;
  price: number;
  quantity: number;
}

export interface CartResponse {
  items: CartItem[];
  subtotal: number;
}

async function handleResponse(res: Response) {
  if (!res.ok) {
    let message = "Request failed";
    try {
      const data = await res.json();
      message = data.message ?? message;
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }
  return res.json();
}

// GET /api/cart
export async function getCart(): Promise<CartResponse> {
  const res = await fetch("/api/cart", { credentials: "include" });
  return handleResponse(res);
}

// POST /api/cart/items
export async function addToCart(
  productId: number,
  quantity = 1
): Promise<CartResponse> {
  const res = await fetch("/api/cart/items", {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_id: productId, quantity }),
  });
  return handleResponse(res);
}

// PATCH /api/cart/items/{id}
export async function updateCartItem(
  cartItemId: number,
  quantity: number
): Promise<CartResponse> {
  const res = await fetch(`/api/cart/items/${cartItemId}`, {
    method: "PATCH",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
  });
  return handleResponse(res);
}

// DELETE /api/cart/items/{id}
export async function removeCartItem(
  cartItemId: number
): Promise<CartResponse> {
  const res = await fetch(`/api/cart/items/${cartItemId}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleResponse(res);
}

// DELETE /api/cart
export async function clearCart(): Promise<CartResponse> {
  const res = await fetch("/api/cart", {
    method: "DELETE",
    credentials: "include",
  });
  return handleResponse(res);
}
