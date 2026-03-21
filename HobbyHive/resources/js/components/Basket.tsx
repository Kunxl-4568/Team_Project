import React from "react";
import { Link } from "@inertiajs/react"
import { ShoppingBasket } from "lucide-react";


interface BasketProps {
  basket: any[]; // change type later if you want
}

export function Basket({ basket = [] }) {
  const count = basket.length;  return (
    <Link href="/cart" className="flex flex-col items-center cursor-pointer relative">
      <ShoppingBasket className="w-10 h-10 text-[#2c2c2c] dark:text-[#ffc300]" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>

      )}
      <span className="text-xs md:text-sm mt-1 text-[#2c2c2c] dark:text-white">Basket</span>
    </Link>
  );
}