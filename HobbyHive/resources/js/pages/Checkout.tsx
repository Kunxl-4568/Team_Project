import React, { useState, useRef } from 'react';
import { usePage, useForm, Link } from '@inertiajs/react';

import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import { Header } from "@/components/Header";
import { NavFooter } from '../components/nav-footer';

type PageProps = {
  subtotal?: number;
  itemCount?: number;
  flash?: { success?: string; error?: string };
};

const Checkout: React.FC = () => {
  const [bannerVisible, setBannerVisible] = useState(true);
  const fixedHeight = 80;
  const fixedRef = useRef<HTMLDivElement>(null);
  const [basket, setBasket] = useState<number[]>([]);

  const page = usePage<PageProps>();
  const { subtotal = 0 } = page.props;

  const shipping = 0;
  const vat = subtotal * 0.2;
  const total = subtotal + shipping + vat;

  const { data, setData, post, processing, errors } = useForm({
    full_name: '',
    email: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    postcode: '',
    country: 'United Kingdom',
    payment_method: 'card',
  });

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('checkout.store'));
  };

  return (
    <div className="bg-white min-h-screen py-12 flex flex-col">
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
            <Header basket={basket} />
          </div>
        </div>

        <div className="flex justify-center w-full mt-2">
          <div className="w-full px-4 md:px-8 lg:px-12 mx-auto max-w-7xl mt-2">
            <Navbar bannerHeight={bannerVisible ? fixedHeight : 0} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-8 mt-40">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full border-black flex items-center justify-center text-[#2c2c2c] font-bold">
            1
          </div>
          <span className="text-[#2c2c2c] font-semibold text-xs">Cart</span>
        </div>

        <div className="h-0.5 w-30 bg-[#2c2c2c]"></div>

        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#ffc300] flex items-center justify-center text-[#2c2c2c] font-bold">
            2
          </div>
          <span className="text-[#2c2c2c] font-semibold text-xs">Checkout</span>
        </div>
      </div>

      {/* ✅ Form wraps the whole checkout so submit works */}
      <form
        onSubmit={placeOrder}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mt-2"
      >
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-[#2c2c2c] mb-2 mt-4">Shipping Address</h2>

            <div className="space-y-4 border border-black py-4 px-4">
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border rounded border-black px-3 py-2 text-[#2c2c2c]"
                  value={data.full_name}
                  onChange={(e) => setData('full_name', e.target.value)}
                />
                {errors.full_name && <div className="text-red-600 text-sm mt-1">{errors.full_name}</div>}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border rounded border-black px-3 py-2 text-[#2c2c2c]"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                />
                {errors.email && <div className="text-red-600 text-sm mt-1">{errors.email}</div>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Phone (optional)"
                  className="w-full border rounded border-black px-3 py-2 text-[#2c2c2c]"
                  value={data.phone}
                  onChange={(e) => setData('phone', e.target.value)}
                />
                {errors.phone && <div className="text-red-600 text-sm mt-1">{errors.phone}</div>}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Street Address"
                  className="w-full border rounded border-black px-3 py-2 text-[#2c2c2c]"
                  value={data.address_line1}
                  onChange={(e) => setData('address_line1', e.target.value)}
                />
                {errors.address_line1 && (
                  <div className="text-red-600 text-sm mt-1">{errors.address_line1}</div>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Address line 2 (optional)"
                  className="w-full border rounded border-black px-3 py-2 text-[#2c2c2c]"
                  value={data.address_line2}
                  onChange={(e) => setData('address_line2', e.target.value)}
                />
                {errors.address_line2 && (
                  <div className="text-red-600 text-sm mt-1">{errors.address_line2}</div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full border rounded border-black px-3 py-2 text-[#2c2c2c]"
                    value={data.city}
                    onChange={(e) => setData('city', e.target.value)}
                  />
                  {errors.city && <div className="text-red-600 text-sm mt-1">{errors.city}</div>}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Postal Code"
                    className="w-full border rounded border-black px-3 py-2 text-[#2c2c2c]"
                    value={data.postcode}
                    onChange={(e) => setData('postcode', e.target.value)}
                  />
                  {errors.postcode && <div className="text-red-600 text-sm mt-1">{errors.postcode}</div>}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full border rounded border-black px-3 py-2 text-[#2c2c2c]"
                  value={data.country}
                  onChange={(e) => setData('country', e.target.value)}
                />
                {errors.country && <div className="text-red-600 text-sm mt-1">{errors.country}</div>}
              </div>

              {/* Keep your buttons if you want, but they don’t have to do anything */}
              <div className="flex gap-4">
                <button
                  type="button"
                  className="bg-[#ffc300] text-[#2c2c2c] px-4 py-4 rounded-lg hover:underline w-90 h-12"
                >
                  Save this Address
                </button>
                <button type="button" className="text-[#2c2c2c] border border-black rounded-lg w-40 h-12 hover:underline">
                  Cancel
                </button>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#2c2c2c] mb-4">Payment Method</h2>
            <div className="border border-black py-4 px-4">
              <div>
                <select
                  className="w-full border rounded border-black px-3 py-2 text-[#2c2c2c] mb-2"
                  value={data.payment_method}
                  onChange={(e) => setData('payment_method', e.target.value)}
                >
                  <option value="card">Credit or Debit Card</option>
                  <option value="google_pay">Google Pay</option>
                  <option value="paypal">PayPal</option>
                </select>
                {errors.payment_method && (
                  <div className="text-red-600 text-sm mb-4">{errors.payment_method}</div>
                )}
              </div>

              {/* These fields are UI-only for now (not sent to backend) */}
              <div className="space-y-4">
                <input type="text" placeholder="Card Number" className="border rounded px-3 py-2 text-[#2c2c2c] w-full" />
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="Expiration Date" className="border rounded px-3 py-2 text-[#2c2c2c]" />
                  <input type="password" placeholder="CVV" className="border rounded px-3 py-2 text-[#2c2c2c]" />
                </div>
                <label className="flex items-center gap-2 text-sm text-[#2c2c2c]">
                  <input type="checkbox" />
                  Save this Address for future use
                </label>

                <div className="flex gap-4">
                  <button type="button" className="bg-[#ffc300] text-[#2c2c2c] rounded-lg px-4 hover:underline w-90 h-12">
                    Save this Card
                  </button>
                  <button type="button" className="text-[#2c2c2c] w-40 h-12 border border-black rounded-lg hover:underline">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Order Summary */}
        <div className="bg-[#ffffb2] p-6 space-y-4 h-75 mt-12">
          <button
            type="submit"
            disabled={processing}
            className="bg-[#ffc300] text-white py-2 w-full rounded disabled:opacity-50"
          >
            {processing ? 'Placing order...' : 'Place Order'}
          </button>

          <div className="text-sm">
            <Link href={route('cart.index')} className="underline text-[#2c2c2c]">Back to cart</Link>
          </div>

          <hr className="border-t-1 border-black mb-5" />

          <h2 className="text-xl font-bold text-[#2c2c2c]">Order Summary</h2>

          <div className="flex justify-between text-lg text-[#2c2c2c]">
            <span>Subtotal:</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-lg text-[#2c2c2c]">
            <span>Shipping:</span>
            <span>Free</span>
          </div>

          <hr className="border-t-1 border-black mb-5" />

          <div className="flex justify-between text-lg text-[#2c2c2c]">
            <span>Order Total:</span>
            <span>£{total.toFixed(2)}</span>
          </div>
        </div>
      </form>

      <NavFooter items={[]} />
    </div>
  );
};

export default Checkout;