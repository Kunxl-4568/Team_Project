import React from 'react';
import CartItem from "../components/CartItem";
import CartSummary from '../components/CartSummary';
import NavBar from '../components/Navbar';
import {NavFooter} from '../components/nav-footer';
import {Link} from '@inertiajs/react';

type CartItemType = {
    id: number;
    title: string;
    image: string;
    price: number;
    quantity: number;
};

type CartPageProps = {
    cartItems: CartItemType[];
    subtotal: number;
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
    onRemove: (id: number) => void;
    onCheckout: () => void; 
};

const CartPage: React.FC<CartPageProps> = ({
    cartItems,
    subtotal,
    onIncrease,
    onDecrease,
    onRemove,
    onCheckout,
}) => {
    if (cartItems.length === 0){
        return (
            <div className='flex flex-col bg-white min-h-screen'>
                <div className='mt-6'>
                <NavBar bannerHeight={0}/>
                </div>
                <div className='flex flex-col items-center justify-center flex-grow text-l'>
                <p className='text-[#2c2c2c] mb-4'>YOUR CART IS EMPTY</p>
                <Link href='/index'className = 'bg-[#ffc300] text-[#2c2c2c] px-4 py-2 rounded hover:underline'>
                    GO SHOPPING
                </Link>
                </div>
                <NavFooter items={[]}/>
            </div>
        );
    }

    return (
        <div className='bg-[#fff8dc] min-h-screen flex flex-col pt-7'>
            <NavBar bannerHeight={0}/>
        
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

        <div className='bg-white max-w-6xl mx-auto p-10 min-h-[500px] mt-10 mb-20 rounded-lg'>

        <div className='flex items-center mb-3'>
         <button className='text-[#2c2c2c] flex-grow text-left underline '>Back to Shopping</button>   
        <h1 className='text-[#2c2c2c] font-bold text-xl text-center fex-grow mb-8 mt-5 mr-28'>Shopping Cart</h1>
        <div className='flex-grow'></div>
        </div>

        <hr className='border-t-1 border-black mb-5'/>
        
            <h1 className='text-[#2c2c2c] mb-5'>Cart Items</h1>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className = 'md:col-span-2 space-y-6'>
                {cartItems.map((item) => (
                    <CartItem
                        key={item.id}
                        title={item.title}
                        image={item.image}
                        price ={item.price}
                        quantity={item.quantity}
                        onIncrease={() => onIncrease(item.id)}
                        onDecrease={() => onDecrease(item.id)}
                        onRemove={() => onRemove(item.id)}
                    />
                ))}
            </div>
            
            <CartSummary subtotal={subtotal} onCheckout={onCheckout}/>
        </div>

        </div>
        <NavFooter items={[]}/>
        </div>

    )
};

export default CartPage;