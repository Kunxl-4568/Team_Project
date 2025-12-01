import React from "react";
import { Heart } from "lucide-react";
import { useState } from "react";
import { Search } from "./Search";
import { home } from '@/routes';
import { Link } from '@inertiajs/react';



export function Header(){

    const [isWishlistWork, setIsWishlistWork] = useState(false);
     const [basketAmount,setBasketAmount] = useState(0);

    return(
       
        <div className="w-full px-4 mt-8 flex flex-col md:flex-row items-center md:items-center gap-6 text-[#2C2C2C] font-slab">

        <div className="flex justify-start w-full md:w-auto mx-auto">  

          <Link href={home()}>
         <img src="/images/titlelogo.png" alt="Logo" 
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

           <div className="relative flex flex-col items-center cursor pointer">
           <img src="/images/Basket.png" alt="Basket symbol" className="h-10 w-10 curasor-pointer"
           onClick={() => setBasketAmount(basketAmount + 1)}/>
           {basketAmount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full px-2 py-0.5">{basketAmount}</span>
           )} 
           <span className="text-xs md:text-sm mt-1 text-black">Basket</span>

           </div>


        </div>
      </div>
    );
  }
  
  