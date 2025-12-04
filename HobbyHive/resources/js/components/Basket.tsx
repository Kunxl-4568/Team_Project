import React from "react";

interface BasketProps {
  basket: any[]; // change type later if you want
}

export function Basket({ basket }: BasketProps) {
  return (
    <div className="flex flex-col items-center cursor-pointer">
      <div className="relative">
        {/* Replace with an icon/image if you have one */}
        <span className="text-xs md:text-sm text-black">Basket</span>
        <span className="ml-1 inline-flex items-center justify-center rounded-full bg-yellow-500 text-black text-[10px] px-1.5 py-0.5">
          {basket.length}
        </span>
      </div>
    </div>
  );
}
