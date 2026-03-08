
import React from "react";

export default function Banner({onClose}: { onClose: () => void }) {

  return (
    <div className="bg-[#FFC300] text-center p-4 md:p-2 lg:p-  text-[#2C2C2C] shadow-sm sticky w-full">
      <p className="font-slab text-base md:text-lg lg:text-xl font-bold">Shop Our Seasonal Collection!</p>
      <button onClick={onClose}
      className= "absolute top-2 right-2 text-lg pr-5 cursor-pointer font-bold">X</button>

    </div>
  );
}