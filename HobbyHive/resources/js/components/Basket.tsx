import React from "react";
import { Link } from "@inertiajs/react";

export function Basket({ basket = [] }) {
  const count = basket.length;  return (
    <Link href="/cart" className="flex flex-col items-center cursor-pointer relative">
      <img src="/images/basket.png" alt="Basket" className="h-8 w-8 md:h-10 md:w-10"/>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {count}
        </span>
      )}
      <span className="text-xs md:text-sm mt-1 text-black">Basket</span>
    </Link>
  );
}
