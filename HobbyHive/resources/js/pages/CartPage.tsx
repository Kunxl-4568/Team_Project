import React from "react";
import { Link, router, usePage } from "@inertiajs/react";

import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import NavBar from "../components/Navbar";
import { NavFooter } from "../components/nav-footer";

type CartItemType = {
  id: number;
  product_id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
  line_total: number;
};

type CartPageProps = {
  cartItems: CartItemType[];
  subtotal: number;
};

const CartPage: React.FC = () => {
  const { cartItems = [], subtotal = 0 } = usePage<CartPageProps>().props;

  //backend logic
  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    router.put(
      `/cart/${itemId}`,
      { quantity: newQuantity },
      { preserveScroll: true }
    );
  };

  const removeItem = (itemId: number) => {
    router.delete(`/cart/${itemId}`, { preserveScroll: true });
  };

  const clearCart = () => {
    router.post("/cart/clear", {}, { preserveScroll: true });
  };

  const handleCheckout = () => {
    router.visit("/checkout");
  };

  // if cart is empty
  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col bg-white min-h-screen">
        <div className="mt-6">
          <NavBar bannerHeight={0} />
        </div>

        <div className="flex flex-col items-center justify-center flex-grow text-l">
          <p className="text-[#2c2c2c] mb-4">YOUR CART IS EMPTY</p>
          <Link
            href="/products"
            className="bg-[#ffc300] text-[#2c2c2c] px-4 py-2 rounded hover:underline"
          >
            GO SHOPPING
          </Link>
        </div>

        <NavFooter items={[]} />
      </div>
    );
  }

  
  return (
    <div className="bg-[#fff8dc] min-h-screen flex flex-col pt-7">
      <NavBar bannerHeight={0} />

      {/* Progress */}
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
          <Link
            href="/products"
            className="text-[#2c2c2c] flex-grow text-left underline"
          >
            Back to Shopping
          </Link>

          <h1 className="text-[#2c2c2c] font-bold text-xl text-center fex-grow mb-8 mt-5 mr-28">
            Shopping Cart
          </h1>

          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Clear Cart
          </button>
        </div>

        <hr className="border-t-1 border-black mb-5" />

        <h1 className="text-[#2c2c2c] mb-5">Cart Items</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Items on the left */}
          <div className="md:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                title={item.title}
                image={item.image}
                // price={item.price}
                price={item.line_total}
                quantity={item.quantity}
                onIncrease={() =>
                  updateQuantity(item.id, item.quantity + 1)
                }
                onDecrease={() =>
                  updateQuantity(item.id, item.quantity - 1)
                }
                onRemove={() => removeItem(item.id)}
              />
            ))}
          </div>

          {/*Cart summary */}
          <CartSummary subtotal={subtotal} onCheckout={handleCheckout} />
        </div>
      </div>

      <NavFooter items={[]} />
    </div>
  );
};

export default CartPage;
