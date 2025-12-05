import React, { useState } from "react";
import { Heart } from "lucide-react";
import { Search } from "./Search";
import { Basket } from "./Basket";          
import { home, register } from "@/routes";
import { Link } from "@inertiajs/react";

interface HeaderProps {
  basket?: any[]; // change type later if you want
}

export function Header({ basket = [] }: HeaderProps) {  
  const basketAmount = basket.length;
  const [isWishlistWork, setIsWishlistWork] = useState(false);

  return (
    <div className="w-full px-4 mt-8 flex flex-col md:flex-row items-center md:items-center gap-6 text-[#2C2C2C] font-slab">
      {/* Logo */}
      <div className="flex justify-start w-full md:w-auto mx-auto">
        <Link href={home()}>
          <img
            src="/images/CroppedLogo.png"
            alt="Logo"
            className="order-2 md:order-1 h-20 sm:h-24 md:h-28 lg:h-30 xl:h-[28rem] w-auto object-contain"
          />
        </Link>
      </div>

      {/* Search */}
      <div className="w-full md:flex-1 md:mx-4">
        <Search />
      </div>

      {/* Right side: sign up, wishlist, basket */}
      <div className="w-full flex justify-start md:justify-end gap-4 md:w-auto items-center">
        {/* Sign up */}
        <div className="flex flex-col items-center cursor-pointer">
          <Link href={register()}>
            <img
              src="/images/Sign-up.png"
              alt="sign up"
              className="h-8 w-10 md:h-12 md:w-12"
            />
            <span className="text-xs md:text-sm mt-1 text-black">Sign Up</span>
          </Link>
        </div>

        {/* Wishlist */}
        <div className="flex flex-col items-center cursor-pointer">
          <button
            onClick={() => setIsWishlistWork(!isWishlistWork)}
            className="cursor-pointer"
          >
            <Heart
              className={`w-8 h-8 transition-colors ${
                isWishlistWork
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-black"
              }`}
            />
          </button>
          <span className="text-xs md:text-sm mt-1 text-black">Wish List</span>
        </div>

        {/* Basket */}
        <Basket basket={basket} />
      </div>
    </div>
  );
}