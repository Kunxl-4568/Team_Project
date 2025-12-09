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
    
    <div className="w-full px-4  flex flex-row items-center gap-2 text-[#2C2C2C] font-slab mt-0  ">
      {/* Logo */}
      
        <Link href={home()}>
          <img
            src="/images/titlelogo.png"
            alt="Logo"
            className="order-1 h-20 xl:h-112 w-auto object-contain pt-20 mr-10"
          />
        </Link>
     

      {/* Search */}
      <div className="w-full flex-1 mx-auto">
        <Search />
      </div>

      {/* Right side: sign up, wishlist, basket */}
      <div className=" h-full flex   gap-4 w-auto items-start  ml-10  mb-5 ">
        {/* Sign up */}
        <div className="flex flex-col items-center cursor-pointer ">
          <Link href={register()} className="flex flex-col items-center">
            <img
              src="/images/Sign-up.png"
              alt="sign up"
              className="h-12 w-12"
            />
            <span className="text-sm  text-[#2c2c2c]">Sign Up</span>
          </Link>
        </div>

        {/* Wishlist */}
        <div className="flex flex-col items-center cursor-pointer w-8 h-10 whitespace-nowrap px-10">
          <button
            onClick={() => setIsWishlistWork(!isWishlistWork)}
            className="cursor-pointer"
          >
            <Heart
              className={`w-8 h-10 transition-colors  ${
                isWishlistWork
                  ? "fill-yellow-500 text-yellow-500"
                  : "text-[#2c2c2c]"
              }`}
            />
          </button>
          <span className="text-sm mt-2 text-[#2c2c2c]">Wish List</span>
        </div>

        {/* Basket */}
         <div className="flex flex-col items-center cursor-pointer w-8 h-10 pl-5 mt-1 ">
        <Basket basket={basket}  />
        </div>
      </div>
    </div>
  );
}