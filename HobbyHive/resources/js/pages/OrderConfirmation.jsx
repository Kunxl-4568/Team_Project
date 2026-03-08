import React from 'react'
import { Link } from '@inertiajs/react'

export default function OrderConfirmation() {
  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-semibold mb-3">Thank you for your order 🎉</h1>
      <p className="text-gray-600 mb-6">Your order has been placed successfully.</p>

      <Link href={route('home')} className="inline-block bg-black text-white px-5 py-2 rounded">
        Continue shopping
      </Link>
    </div>
  )
}