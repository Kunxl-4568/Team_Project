import React, { useState } from "react";
import { Heart } from "lucide-react";
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
  const { auth } = usePage<PageProps>().props;

  return (
    <div className="w-full px-4 flex items-center gap-2 text-[#2C2C2C] font-slab mt-8">

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

      {/* Right side: sign in, wishlist, basket */}
      <div className="flex flex-row justify-end w-auto gap-4 mx-auto">

        {/* Sign in / Logout */}
        {auth.user ? (
          <div className="flex flex-col items-center cursor-pointer hover:underline">
            <button
              onClick={() => router.post('/logout')}
              className="flex flex-col items-center"
            >
              <img src="/images/Sign-up.png" alt="logout" className="h-12 w-12" />
              <span className="text-sm text-[#2c2c2c]">Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center cursor-pointer hover:underline">
            <Link href={register()} className="flex flex-col items-center">
              <img src="/images/Sign-up.png" alt="sign up" className="h-12 w-12" />
              <span className="text-sm text-[#2c2c2c]">Sign in</span>
            </Link>
          </div>
        )}

        {/* Wishlist — navigates to /wishlist page */}
        <div className="flex flex-col items-center cursor-pointer w-8 h-10 whitespace-nowrap px-10 hover:underline">
          <Link href="/wishlist" className="flex flex-col items-center">
            <Heart className="w-8 h-10 text-[#2c2c2c] hover:fill-yellow-400 hover:text-yellow-400 transition-colors" />
            <span className="text-sm mt-2 text-[#2c2c2c]">Wish List</span>
          </Link>
        </div>

        {/* Basket */}
        <div className="flex flex-col items-center cursor-pointer w-8 h-10 pl-5 mt-1 hover:underline">
          <Basket basket={basket} />
        </div>
      </div>
    </div>
  );
}
