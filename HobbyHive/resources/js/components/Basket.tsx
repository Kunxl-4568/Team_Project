import React, { useState, useEffect } from "react";

interface BasketProps {
    basket: number[];
}


export default function Basket({basket}: BasketProps) {

     
    const basketAmount = basket.length;
    return (
     <div className="relative flex flex-col items-center cursor-pointer">
           <img src="/images/Basket.png" alt="Basket symbol" className="h-10 w-10 cursor-pointer"
            />
           {basketAmount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full px-2 py-0.5">{basketAmount}</span>
           )} 
           <span className="text-xs md:text-sm mt-1 text-black font-hepta">Basket</span>

           </div>
    );
}