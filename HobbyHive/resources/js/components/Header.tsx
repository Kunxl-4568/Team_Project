import React, {useState,  } from "react";
import { Heart } from "lucide-react";
import { Search } from "./Search";
import { Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import Basket from "./Basket";

interface HeaderProps {
  basket: number[]; 
  searchQuery?: string;
}


export function Header({ basket =[], searchQuery =""}:HeaderProps) {
  
  const[isWishlistWork, setIsWishlistWork] = useState(false);

  

    return(
       
        <div className="w-full px-4 mt-8 flex flex-col md:flex-row items-center md:items-center gap-6 text-[#2C2C2C] font-slab">

        <div className="flex justify-start w-full md:w-auto mx-auto">  

          <Link href="/">
         <img src="/images/titlelogo.png" alt="Logo" 
         className="order-2 md:order-1 h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] w-auto" />
         </Link>
        </div>

          <div className="w-full md:flex-1 md:mx-4">
           <Search initialQuery={searchQuery} />
           </div>

           <div className="w-full flex justify-start md:justify-end gap-4  md:w-auto items-center ">

            <Link href="/register" className="flex flex-col items-center cursor-pointer">
            <img src="/images/Sign-up.png" alt="sign up" className="h-8 w-10 md:h-12 md:w-12"/>
            <span className="text-xs md:text-sm mt-1 text-black">Sign Up</span>
           </Link>

           <Link href="/login" className="flex flex-col items-center cursor-pointer">
            <Heart className="w-8 h-8 fill-none text-black hover:fill-yellow-400 transition-colors" />
             <span className="text-xs md:text-sm mt-1 text-black">Wish List</span>
           </Link>

           

          <Link href="/basket">
            <Basket basket={basket}/>
           </Link>

        </div>
      </div>
    
    );
  }
  
  