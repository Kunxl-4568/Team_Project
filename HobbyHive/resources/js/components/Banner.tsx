
import React from "react";

export default function Banner({onClose}: { onClose: () => void }) {

  return (
    <div className="bg-[#FFF9E4] text-center p-4 md:p-2 lg:p- relative">
      <p className="font-hepta text-sm md:text-lg lg:text-xl font-medium">Shop Our Seasonal Collection</p>
      <button onClick={onClose}
      className= "absolute top-2 right-2 text-lg">X</button>

    </div>
  );
}