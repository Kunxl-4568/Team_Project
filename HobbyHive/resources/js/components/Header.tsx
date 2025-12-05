import React from "react";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Search } from "./Search";
import Basket from "../components/Basket";
import { Link } from "@inertiajs/react"
import { router } from "@inertiajs/react";

interface HeaderProps {
  basket: number[];
  searchQuery?: string;
}

export function Header({ basket, searchQuery =""}: HeaderProps) {
  const basketAmount = basket.length;

  const[isWishlistWork, setIsWishlistWork] = useState(false);

    return(
    <div className="w-full px-4 mt-8">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-center gap-6">

         <div className="flex justify-center md:justify-start w-full md:w-auto">  
         <Link href="/">
         <img src="/images/Title and Logo.png.png" alt="Logo" 
         className="order-2 md:order-1 h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] w-auto" />
         </Link>
         </div>

          <div className="w-full md:flex-1 md:mx-4">
           <Search initialQuery={searchQuery} />
           </div>

           <div className="w-full flex justify-start md:justify-end gap-4  md:w-auto items-center ">

            <div className="flex flex-col items-center cursor-pointer">
            <button onClick={() => router.visit("/register")} className="flex flex-col items-center">
            <img src="/images/Sign-up.png" alt="sign up" className="h-8 w-10 md:h-12 md:w-12"
           />
           </button>
            <span className="text-xs md:text-sm mt-1 text-black">Sign Up</span>

           </div>
           <div className="flex flex-col items-center cursor-pointer">
           <button onClick={() => router.visit("/register")}
           className="cursor-pointer" >

            <Heart className={`w-8 h-8 transition-colors ${
                isWishlistWork ? "fill-red-500 text-yellow-500" : "fill-none text-black hover:fill-yellow-400 hover:text-yellow-400"
            }`}/>
           </button>
            <span className="text-xs md:text-sm mt-1 text-black">Wish List</span>
           </div>

            <Basket basket={basket}/>


        </div>
      </div>
    </div>
    );
  }
  
  