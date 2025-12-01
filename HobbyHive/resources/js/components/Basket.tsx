import React, { useState} from "react";
interface BasketProps {
    basket: number[];
}

export default function Basket ({basket}: BasketProps) {

    const [basketAmount, setBasketAmount] = useState(0)
    return (
     <div className="relative flex flex-col items-center cursor pointer">
           <img src="/images/Basket.png" alt="Basket symbol" className="h-10 w-10 curasor-pointer"
           onClick={() => setBasketAmount(basketAmount + 1)}/>
           {basketAmount > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full px-2 py-0.5">{basketAmount}</span>
           )} 
           <span className="text-xs md:text-sm mt-1 text-black">Basket</span>

           </div>
    );
}