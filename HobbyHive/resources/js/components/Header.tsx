import React, { useState } from "react";
import { Heart, Moon, Sun, User as UserIcon } from "lucide-react";
import { Search } from "./Search";
import { Basket } from "./Basket";
import { home, login, register } from "@/routes";
import { usePage, Link, router } from '@inertiajs/react';


interface HeaderProps {
  basket?: any[];
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
    flash?: {
        success?: string;
        error?: string;
    };
    errors?: Record<string, string>;
    [key: string]: any;
}

export function Header({ basket = [] }: HeaderProps) {
  const basketAmount = basket.length;
  const [isDarkMode, setIsDarkMode] = useState(false); 
  const { auth } = usePage<PageProps>().props; // for auth user data - used in logout

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
};

  return (
    
    <div className="w-full px-4 flex items-center text-[#2C2C2C] dark:text-white font-slab mt-8 transition-all duration-300">

      {/* Logo */}

      <div className="flex-none justify-start">
      
        <Link href={home()}>
          <img
            src="/images/HobbyHiveLogo.png"
            alt="Logo"
            className="h-18 w-full"
          />
        </Link>
      </div>

      {/* Search */}
      <div className="w-xl flex-1 flex justify-center">
        <Search />
      </div>

      {/* Right side: sign up, wishlist, basket, dark mode */}
      <div className="flex flex-row justify-end w-auto gap-12 shrink-0">

        {/* Sign in / Logout */}
        {auth.user ? (
          <div className="flex flex-col items-center cursor-pointer w-16">
            <button 
              onClick={() => router.post('/logout')}
              className="flex flex-col items-center"
            >
              <UserIcon className="w-10 h-10 text-[#2c2c2c] dark:text-[#ffc300] cursor-pointer" />
              <span className="text-sm text-[#2c2c2c] dark:text-white mt-1 cursor-pointer">Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center cursor-pointer w-16">
            <Link href={register()} className="flex flex-col items-center">
              <UserIcon className="w-10 h-10 text-[#2c2c2c] dark:text-[#ffc300]" />
              <span className="text-sm mt-1">Sign in</span>
            </Link>
          </div>
        )}

       {/* Wishlist */}
      <div className="flex flex-col items-center cursor-pointer w-16 whitespace-nowrap">
        <Link href="/wishlist" className="flex flex-col items-center">
          <Heart className="w-10 h-10 text-[#2c2c2c] dark:text-[#ffc300] transition-colors cursor-pointer" />
          <span className="text-sm text-[#2c2c2c] dark:text-white mt-1">
            Wish List
          </span>
        </Link>
      </div>

{/* Basket */}
    <div className="flex flex-col items-center cursor-pointer w-16">
          <Basket basket={basket} />
        </div>

        {/* Dark Mode Toggle */}
        <div className="flex flex-col items-center cursor-pointer w-16">
          <button onClick={toggleDarkMode} className="w-10 h-10 cursor-pointer">
            {isDarkMode ? (
              <Sun className="w-10 h-10 text-[#2c2c2c] dark:text-[#ffc300]" />
            ) : (
              <Moon className="w-10 h-10 text-[#2c2c2c] dark:text-[#ffc300]" />
            )}
          </button>
          <span className="text-sm text-[#2c2c2c] dark:text-white mt-1">
            {isDarkMode ? "Light" : "Dark"}
          </span>
        </div>

      </div>
    </div>
  );
}
