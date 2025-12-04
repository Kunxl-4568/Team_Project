import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import NavBar from "../components/Navbar";
import { NavFooter } from "../components/nav-footer";
import { Link } from "@inertiajs/react";
import {
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
  type CartItem as CartItemData,
  type CartResponse,
} from "@/lib/cartApi";

// --- DUMMY ITEMS (remove later) ---
const DUMMY_ITEMS: CartItemData[] = [
  {
    id: 1,
    product_id: 101,
    title: "Faber Castell Pencils",
    image: "/images/Faber Castell metal tin.png",
    price: 6.99,
    quantity: 1,
  }
];

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void loadCart();
  }, []);

async function loadCart(): Promise<void> {
  try {
    setLoading(true);
    setError(null);

    const cart: CartResponse = await getCart();

    // Set items exactly as returned by backend
    setCartItems(DUMMY_ITEMS)
    setCartItems(cart.items ?? []);
    setSubtotal(cart.subtotal ?? 0);

  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Failed to load cart";
    setError(message);

    setCartItems([]);
    setSubtotal(0);
  } finally {
    setLoading(false);
  }
}


  async function handleIncrease(id: number): Promise<void> {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    const newQty = item.quantity + 1;

    try {
      const cart = await updateCartItem(id, newQty);
      setCartItems(cart.items);
      setSubtotal(cart.subtotal);
    } catch {
      console.error("Increase failed");
    }
  }

  async function handleDecrease(id: number): Promise<void> {
    const item = cartItems.find((i) => i.id === id);
    if (!item) return;

    const newQty = item.quantity - 1;

    try {
      if (newQty < 1) {
        const cart = await removeCartItem(id);
        setCartItems(cart.items);
        setSubtotal(cart.subtotal);
      } else {
        const cart = await updateCartItem(id, newQty);
        setCartItems(cart.items);
        setSubtotal(cart.subtotal);
      }
    } catch {
      console.error("Decrease failed");
    }
  }

  async function handleRemove(id: number): Promise<void> {
    try {
      const cart = await removeCartItem(id);
      setCartItems(cart.items);
      setSubtotal(cart.subtotal);
    } catch {
      console.error("Remove failed");
    }
  }

  async function handleClearCart(): Promise<void> {
    try {
      const cart = await clearCart();
      setCartItems(cart.items);
      setSubtotal(cart.subtotal);
    } catch {
      console.error("Clear cart failed");
    }
  }

  function handleCheckout(): void {
    alert("Checkout not implemented yet.");
  }

  // ---------- LOADING ----------
  if (loading && cartItems.length === 0) {
    return (
      <div className="flex flex-col bg-white min-h-screen">
        <div className="mt-6">
          <NavBar bannerHeight={0} />
        </div>
        <div className="flex flex-col items-center justify-center flex-grow text-l">
          <p className="text-[#2c2c2c] mb-4">Loading cart...</p>
        </div>
        <NavFooter items={[]} />
      </div>
    );
  }

  // ---------- EMPTY ----------
  if (!loading && cartItems.length === 0) {
    return (
      <div className="flex flex-col bg-white min-h-screen">
        <div className="mt-6">
          <NavBar bannerHeight={0} />
        </div>
        <div className="flex flex-col items-center justify-center flex-grow text-l">
          <p className="text-[#2c2c2c] mb-4">YOUR CART IS EMPTY</p>
          <Link
            href="/index"
            className="bg-[#ffc300] text-[#2c2c2c] px-4 py-2 rounded hover:underline"
          >
            GO SHOPPING
          </Link>
        </div>
        <NavFooter items={[]} />
      </div>
    );
  }

  // ---------- MAIN UI ----------
  return (
    <div className="bg-[#fff8dc] min-h-screen flex flex-col pt-7">
      <NavBar bannerHeight={0} />

      <div className="flex items-center justify-center gap-8 mt-5">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#ffc300] flex items-center justify-center text-[#2c2c2c] font-bold">
            1
          </div>
          <span className="text-[#2c2c2c] font-semibold text-xs">Cart</span>
        </div>

        <div className="h-0.5 w-30 bg-[#2c2c2c]" />

        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full border border-black flex items-center justify-center text-[#2c2c2c] font-bold">
            2
          </div>
          <span className="text-[#2c2c2c] font-semibold text-xs">Checkout</span>
        </div>
      </div>

      <div className="bg-white max-w-6xl mx-auto p-10 min-h-[500px] mt-10 mb-20 rounded-lg">
        <div className="flex items-center mb-3">
          <button className="text-[#2c2c2c] flex-grow text-left underline">
            Back to Shopping
          </button>
          <h1 className="text-[#2c2c2c] font-bold text-xl text-center fex-grow mb-8 mt-5 mr-28">
            Shopping Cart
          </h1>
          <div className="flex-grow" />
        </div>

        <hr className="border-t-1 border-black mb-5" />

        <h1 className="text-[#2c2c2c] mb-5">Cart Items</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                title={item.title}
                image={item.image ?? ""}
                price={item.price}
                quantity={item.quantity}
                onIncrease={() => handleIncrease(item.id)}
                onDecrease={() => handleDecrease(item.id)}
                onRemove={() => handleRemove(item.id)}
              />
            ))}
          </div>

          <CartSummary subtotal={subtotal} onCheckout={handleCheckout} />
        </div>
      </div>

      <NavFooter items={[]} />
    </div>
  );
};

export default CartPage;
