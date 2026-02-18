import React, { useState } from "react";
import { Heart } from "lucide-react";
import { Search } from "./Search";
import { Basket } from "./Basket";          
import { home, login, register } from "@/routes";
// import { Link } from "@inertiajs/react";
import { usePage, Link, router } from '@inertiajs/react';


interface HeaderProps {
  basket?: any[]; // change type later if you want
}

interface User {
    id: number;
    name?: string;
    email: string;
    email_verified_at?: string;
    created_at?: string;
    updated_at?: string;
}

interface PageProps {
    auth: {
        user: User | null;
    };
    // Add other shared props here as needed
    flash?: {
        success?: string;
        error?: string;
    };
    errors?: Record<string, string>;
    [key: string]: any;
}

export function Header({ basket = [] }: HeaderProps) {  
  const basketAmount = basket.length;
  const [isWishlistWork, setIsWishlistWork] = useState(false);
  const { auth } = usePage<PageProps>().props; // for auth user data - used in logout

  return (
    
    <div className="w-full px-4 flex items-center gap-2 text-[#2C2C2C] font-slab mt-8">

      {/* Logo */}

      <div className="flex-none justify-start ">
      
        <Link href={home()}>
          <img
            src="/images/HobbyHiveLogo.png"
            alt="Logo"
            className="h-18 w-full "


          />
        </Link>
        </div>
     

      {/* Search */}
      <div className="w-xl flex-1 flex justify-center ">
        <Search />
      </div>

      {/* Right side: sign up, wishlist, basket */}
      <div className="flex flex-row justify-end w-auto gap-4 mx-auto ">
        {/* Sign up
        <div className="flex flex-col items-center cursor-pointer ">
          <Link href={register()} className="flex flex-col items-center">
            <img
              src="/images/Sign-up.png"
              alt="sign up"
              className="h-12 w-12"
            />
            <span className="text-sm  text-[#2c2c2c]">Sign Up</span>
          </Link>
        </div> */}

        {/* Sign up / Logout */}
        {auth.user ? (
          // User is logged in - Show Logout
          <div className="flex flex-col items-center cursor-pointer hover:underline">
            <button 
              onClick={() => router.post('/logout')}
              className="flex flex-col items-center"
            >
              <img
                src="/images/Sign-up.png"
                alt="logout"
                className="h-12 w-12"
              />
              <span className="text-sm text-[#2c2c2c] " >Logout</span>
            </button>
          </div>
        ) : (
          // User is NOT logged in - Show Sign Up
          <div className="flex flex-col items-center cursor-pointer hover:underline">
            <Link href={login()} className="flex flex-col items-center">
              <img
                src="/images/Sign-up.png"
                alt="sign up"
                className="h-12 w-12"
              />
              <span className="text-sm text-[#2c2c2c]">Sign in</span>
            </Link>
          </div>
        )}

        {/* Wishlist */}
        <div className="flex flex-col items-center cursor-pointer w-8 h-10 whitespace-nowrap px-10 hover:underline">
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
         <div className="flex flex-col items-center cursor-pointer w-8 h-10 pl-5 mt-1 hover:underline ">
        <Basket basket={basket}  />
        </div>
      </div>
    </div>
  );
}