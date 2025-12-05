<<<<<<< HEAD
import { useState, useRef, useEffect } from "react";
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import CartItem from "../components/CartItem";
import CartSummary from '../components/CartSummary';
import NavBar from '../components/Navbar';
import {NavFooter} from '../components/nav-footer';
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Carousel from "@/components/Carousel"
import {Header} from "@/components/Header";
import ProductCard from "@/components/Productcard";
import Footer from "@/components/Footer";
import Basket from "@/components/Basket";
=======
import React from "react";
import { Link, router, usePage } from "@inertiajs/react";
>>>>>>> a456c23842294be71a4ba6fb49f45e9d81dcb031

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

<<<<<<< HEAD
export default function CartPage() {
    const { cartItems = [], subtotal = 0, itemCount = 0, flash = {} } = usePage<CartPageProps>().props;
    const [bannerVisible, setBannerVisible] = useState(true);
    const fixedHeight=80;
    const fixedRef = useRef<HTMLDivElement>(null);
    const [basket,setBasket] = useState<number[]>([]);
=======
const CartPage: React.FC = () => {
  const { cartItems = [], subtotal = 0 } = usePage<CartPageProps>().props;
>>>>>>> a456c23842294be71a4ba6fb49f45e9d81dcb031

  //backend logic
  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

<<<<<<< HEAD
        const item = cartItems.find(i => i.id === itemId);
        if (!item) return;

        if (newQuantity > item.stock) {
            alert('Not enough stock available');
            return;
        }

        router.put(`/cart/${itemId}`, { quantity: newQuantity }, {
            preserveScroll: true,
            onSuccess: () => console.log('Quantity updated'),
        });
    };

    const removeItem = (itemId: number) => {
        if (!confirm('Remove this item from cart?')) return;
        router.delete(`/cart/${itemId}`, { preserveScroll: true });
    };

    const clearCart = () => {
        if (!confirm('Clear entire cart?')) return;
        router.post('/cart/clear', {}, { preserveScroll: true });
    };

    if (!cartItems || cartItems.length === 0) {
        return (
            <div className='flex flex-col bg-white min-h-screen'>
                <div className='mt-6'>

                {bannerVisible && (
                    <div className="fixed top-0 left-0 w-full z-50 flex justify-center">
                        <div className="w-full px-4 md:px-8 lg:px-12 max-w-7xl">
                            <Banner onClose={() => setBannerVisible(false)} />
                        </div>
                    </div>
                )}
                            
                
                <div ref={fixedRef} className="fixed top-0 left-0 w-full z-40 bg-white flex flex-col">
                    <div className="w-full flex justify-center">
                        <div className="w-full px-4 md:px-8 lg:px-12 max-w-7xl">
                            <Header basket={basket}/>
                        </div>
                    </div> 
                                    
                <div className="flex justify-center w-full mt-2">
                    <div className="w-full px-4 md:px-8 lg:px-12 mx-auto max-w-7xl mt-2">
                        <Navbar bannerHeight={bannerVisible ? fixedHeight : 0} /> 
                    </div>
                </div>
            </div>

            
                </div>
                <div className="flex flex-col items-center justify-center flex-grow text-lg">
                    <p className="text-[#2c2c2c] mb-4">YOUR CART IS EMPTY</p>
                    <Link href="/products" className="bg-[#ffc300] text-[#2c2c2c] px-4 py-2 rounded hover:underline">
                        GO SHOPPING
                    </Link>
                </div>
                <NavFooter items={[]} />
            </div>
        );
    }

    const handleCheckout = () => {
    // navigate to the checkout route
    router.visit('/checkout'); // or router.get('/checkout')
=======
    router.put(
      `/cart/${itemId}`,
      { quantity: newQuantity },
      { preserveScroll: true }
    );
>>>>>>> a456c23842294be71a4ba6fb49f45e9d81dcb031
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
<<<<<<< HEAD
        <div className="bg-[#fff8dc] min-h-screen flex flex-col pt-7">
            <Head title="Shopping Cart" />
            {bannerVisible && (
                <div className="fixed top-0 left-0 w-full z-50 flex justify-center">
                    <div className="w-full px-4 md:px-8 lg:px-12 max-w-7xl">
                        <Banner onClose={() => setBannerVisible(false)} />
                     </div>
                </div>
                            )}
                        
            
                <div ref={fixedRef} className="fixed top-0 left-0 w-full z-40 bg-white flex flex-col">
                    <div className="w-full flex justify-center">
                        <div className="w-full px-4 md:px-8 lg:px-12 max-w-7xl">
                            <Header basket={basket}/>
                        </div>
                    </div> 
                                
                <div className="flex justify-center w-full mt-2">
                    <div className="w-full px-4 md:px-8 lg:px-12 mx-auto max-w-7xl mt-2">
                        <Navbar bannerHeight={bannerVisible ? fixedHeight : 0} /> 
                    </div>
                </div>
            </div>

            <div className='flex items-center justify-center gap-8 mt-5'>
            <div className='flex flex-col items-center gap-2'>
                <div className='w-8 h-8 rounded-full bg-[#ffc300] flex items-center justify-center text-[#2c2c2c] font-bold'>
                    1
                </div>
                <span className='text-[#2c2c2c] font-semibold text-xs'>Cart</span>
            </div>

            <div className = 'h-0.5 w-30 bg-[#2c2c2c]'></div>

            <div className='flex flex-col items-center gap-2'>
                <div className='w-8 h-8 rounded-full border border-black flex items-center justify-center text-[#2c2c2c] font-bold'>
                    2
                </div>
                <span className='text-[#2c2c2c] font-semibold text-xs'>Checkout</span>
            </div>


=======
      <div className="flex flex-col bg-white min-h-screen">
        <div className="mt-6">
          <NavBar bannerHeight={0} />
>>>>>>> a456c23842294be71a4ba6fb49f45e9d81dcb031
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
