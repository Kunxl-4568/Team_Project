import React from 'react';
import {Link} from '@inertiajs/react';

type CartSummaryProps = {
    subtotal: number;
    onCheckout: () => void;
};

const CartSummary: React.FC<CartSummaryProps> =({subtotal, onCheckout}) => {
    const shipping = 0;
    const vat = subtotal * 0.2;
    const total = subtotal + shipping + vat;
    return (
        <div className='border p-4 rounded shadow border border-black'>
            <h2 className='text-xl font-bold mb-2 text-[#2c2c2c]'>ORDER SUMMARY</h2>

            <div className='flex justify-between text-lg text-[#2c2c2c]'>
                    <span>Subtotal:</span>
                    <span>£{subtotal.toFixed(2)}</span>
            </div>

            <div className='flex justify-between text-lg text-[#2c2c2c]'>
                    <span>Shipping:</span>
                    <span>Free</span>
            </div>

            <div className='flex justify-between text-lg text-[#2c2c2c]'>
                    <span>VAT:</span>
                    <span>£{vat.toFixed(2)}</span>
                </div>
    
            <hr className='border-t-1 border-black mb-5 mt-5'/>
            
            <div className='flex justify-between text-lg text-[#2c2c2c]'>
                    <span>Total:</span>
                    <span>£{total.toFixed(2)}</span>
                </div>
                
            
            
            <Link href='/Checkout' className='block bg-[#ffc300] text-[#2c2c2c] hover:underline text-center px-y py-2 rounded w-65 justify-center mt-3'>
                PROCEED TO CHECKOUT
            </Link>


            <Link href='/index' className='block w-full text-[#2c2c2c] hover:underline mt-3 text-center'>Continue Shopping</Link>

            <hr className='border-t-1 border-black mb-5 mt-5'/>

            <p className='text-xs text-[#2c2c2c] text-center'>Customer support available</p>
        </div>
    );
};

export default CartSummary;
