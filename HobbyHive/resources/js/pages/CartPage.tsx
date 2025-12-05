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
    itemCount?: number;
    flash?: {
        success?: string;
        error?: string;
    };
};

export default function CartPage() {
    const { cartItems = [], subtotal = 0, itemCount = 0, flash = {} } = usePage<CartPageProps>().props;
    const [bannerVisible, setBannerVisible] = useState(true);
    const fixedHeight=80;
    const fixedRef = useRef<HTMLDivElement>(null);
    const [basket,setBasket] = useState<number[]>([]);

    const updateQuantity = (itemId: number, newQuantity: number) => {
        if (newQuantity < 1) return;

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
  };

    return (
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


        </div>

            <div className="max-w-6xl mx-auto p-4 w-full">
                {flash?.success && <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">{flash.success}</div>}
                {flash?.error && <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">{flash.error}</div>}
            </div>

            <div className="bg-white max-w-6xl mx-auto p-10 min-h-[500px] mt-2 mb-20 rounded-lg w-full">
                <div className="flex items-center justify-between mb-6">
                    <Link href="/products" className="flex items-center text-[#2c2c2c] hover:underline">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Shopping
                    </Link>
                    <h1 className="text-[#2c2c2c] font-bold text-2xl">Shopping Cart ({itemCount})</h1>
                    <button onClick={clearCart} className="text-red-600 hover:text-red-800 text-sm">
                        Clear Cart
                    </button>
                </div>

                <hr className="border-t-1 border-gray-300 mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center border rounded p-4 bg-gray-50">
                                <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded mr-4" />
                                <div className="flex-1">
                                    <h3 className="font-semibold text-[#2c2c2c]">{item.title}</h3>
                                    <p className="text-sm text-gray-600">£{item.price.toFixed(2)}</p>
                                    <p className="text-xs text-gray-500">Stock: {item.stock}</p>
                                </div>

                                <div className="flex items-center space-x-3 mr-4">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="p-1 border rounded hover:bg-gray-200"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        disabled={item.quantity >= item.stock}
                                        className="p-1 border rounded hover:bg-gray-200 disabled:opacity-50"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="text-right">
                                    <p className="font-semibold">£{item.line_total.toFixed(2)}</p>
                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-red-600 hover:text-red-800 mt-2"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <CartSummary subtotal={subtotal} onCheckout={() => router.visit('/checkout')} />
                </div>
            </div>
            <NavFooter items={[]} />
        </div>
    );
}