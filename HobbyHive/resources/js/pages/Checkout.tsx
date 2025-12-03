import React from 'react';
import NavBar from '../components/Navbar';
import {NavFooter} from '../components/nav-footer';

type CheckoutProps = {
    subtotal: number;
    onSubmit: () => void;
};

const Checkout: React.FC = () => {
    const subtotal = 93.95;
    const shipping = 5.0;
    const total = subtotal + shipping;
    return(
        <div className = 'bg-white min-h-screen py-12 flex flex-col'>
        <NavBar bannerHeight={0}/>

        <div className='flex items-center justify-center gap-8 mt-5'>
            <div className='flex flex-col items-center gap-2'>
                <div className='w-8 h-8 rounded-full border-black flex items-center justify-center text-[#2c2c2c] font-bold'>
                    1
                </div>
                <span className='text-[#2c2c2c] font-semibold text-xs'>Cart</span>
            </div>

            <div className = 'h-0.5 w-30 bg-[#2c2c2c]'></div>

            <div className='flex flex-col items-center gap-2'>
                <div className='w-8 h-8 rounded-full bg-[#ffc300]   flex items-center justify-center text-[#2c2c2c] font-bold'>
                    2
                </div>
                <span className='text-[#2c2c2c] font-semibold text-xs'>Checkout</span>
            </div>


        </div>

    
        <div className ='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto '>

            <div className = 'space-y-8'>
                <section>
                    <h2 className ='text-xl font-bold text-[#2c2c2c] mb-2 mt-4'>Shipping Address</h2>
                    <div className='space-y-4 border border-black border py-4 px-4'>
                        <input type='text' placeholder='Full Name' className='w-full border rounded border-black px-3 py-2 text-[#2c2c2c]'/>
                        <input type='text' placeholder='Street Address' className='w-full border rounded border-black px-3 py-2 text-[#2c2c2c]'/>
                        <div className='grid grid-cols-2 gap-4'>
                            <input type='text' placeholder='City' className='w-full border rounded border-black px-3 py-2 text-[#2c2c2c]'/>
                            <input type='text' placeholder='Postal Code' className='w-full border rounded border-black px-3 py-2 text-[#2c2c2c]'/>
                        </div>
                        <div className='flex gap-4'>
                            <button className='bg-[#ffc300] text-[#2c2c2c] px-4 py-4 rounded-lg hover:bg-dark yellow w-90 h-12 hover:underline'>Save this Address</button>
                            <button className='text-[#2c2c2c] border border-black rounded-lg w-40 h-12 hover:underline'>Cancel</button>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className='text-xl font-bold text-[#2c2c2c] mb-4'>Payment Method</h2>
                    <div className='border border-black border py-4 px-4'>
                    <select className='w-full border rounded border-black px-3 py-2 text-[#2c2c2c] mb-4'>
                        <option>Credit or Debit Card</option>
                        <option>Google Pay</option>
                        <option>PayPal</option>
                    </select>
                    <div className='space-y-4'>
                        <input type='text' placeholder='Card Number' className='border rounded px-3 py-2 text-[#2c2c2c] w-full'/>
                        <div className='grid grid-cols-2 gap-4'>
                            <input type='text' inputMode='numeric' pattern='\d{2}/\d{2}' placeholder='Expiration Date' className='border rounded px-3 py-2 text-[#2c2c2c]'/>
                            <input type='password' placeholder='CVV' className='border rounded px-3 py-2 text-[#2c2c2c]'/>
                        </div>
                        <input type='text' placeholder='Billing Address' className='border rounded px-3 py-2 text-[#2c2c2c]'/>
                        <label className = 'flex items-center gap-2 text-sm text-[#2c2c2c]'>
                            <input type ='checkbox' />
                            Save this Address for future use
                        </label>
                        <div className = 'flex gap-4'>
                            <button className = 'bg-[#ffc300] text-[#2c2c2c] rounded-lg px-4 py-rounded hover:bg-dark yellow w-90 h-12 hover:underline'>Save this Card</button>
                            <button className='text-[#2c2c2c] w-40 h-12 border border-black rounded-lg hover:underline'>Cancel</button>
                        </div>
                    </div>
                    </div>
                </section>
            </div>

            <div className='bg-[#ffffb2] p-6 space-y-4 h-75 mt-12'>
                <button className='bg-[#ffc300] text-white py-2 w-full rounded hover:bg:ebb400'>Place Order</button>
                <hr className='border-t-1 border-black mb-5'/>
                <h2 className='text-xl font-bold text-[#2c2c2c]'>Order Summary</h2>

                <div className='flex justify-between text-lg text-[#2c2c2c]'>
                    <span>Subtotal:</span>
                    <span>£{subtotal.toFixed(2)}</span>
                </div>

                <div className='flex justify-between text-lg text-[#2c2c2c]'>
                    <span>Shipping:</span>
                    <span>Free</span>
                </div>

                <hr className='border-t-1 border-black mb-5'/>

                <div className='flex justify-between text-lg text-[#2c2c2c]'>
                    <span>Order Total:</span>
                    <span>£{(subtotal).toFixed(2)}</span>
                </div>



                {/*<p className='text-lg text-[#2c2c2c]'>Subtotal: £{subtotal.toFixed(2)}</p>
                <p className='text-lg text-[#2c2c2c]'>Shipping: Free</p>
                <hr className='border-t-1 border-black mb-5'/>
                <p className='text-lg text-[#2c2c2c]'>Order Total: £{(subtotal).toFixed(2)}</p>*/}
                
            </div>

        </div>
        <NavFooter items={[]}/>
        </div>
    );
};

export default Checkout;