import React from "react";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Search } from "./Search";
import Basket from "../components/Basket";
import { Link } from "@inertiajs/react"
interface HeaderProps {
  basket: number[];
}

export function Header({ basket}: HeaderProps) {
  const basketAmount = basket.length;

  const[isWishlistWork, setIsWishlistWork] = useState(false);

    return(
       
        <div className="w-full px-4 mt-8 flex flex-col md:flex-row items-center md:items-center gap-6">

      <div className="flex justify-start w-full md:w-auto">  
        <Link href="/">
         <img src="/images/Title and Logo.png.png" alt="Logo" 
         className="order-2 md:order-1 h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] w-auto" />
        </Link>
      </div>

         <div className="w-full md:flex-1 md:mx-4">
           <Search />
           </div>

           <div className="w-full flex justify-start md:justify end gap-4  md:w-auto items-center ">

            <div className="flex flex-col items-center cursor pointer">
            <img src="/images/Sign-up.png" alt="sign up" className="h-8 w-10 md:h-12 md:w-12"
           />
            <span className="text-xs md:text-sm mt-1 text-black">Sign Up</span>

           </div>
           <div className="flex flex-col items-center cursor pointer">
           <button onClick={() => setIsWishlistWork(!isWishlistWork)}
           className="cursor-pointer" >

            <Heart className={`w-8 h-8 transition-colors ${
                isWishlistWork ? "fill-yellow-500 text-yellow-500" : "text-black"
            }`}/>
           </button>
            <span className="text-xs md:text-sm mt-1 text-black">Wish List</span>
           </div>

     <Basket basket={basket}/>


        </div>
      </div>
    );
  }
  
  