import { Heart, ShoppingBasket } from "lucide-react";
import { router } from "@inertiajs/react";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isOnSale?: boolean;
  isInWishlist: boolean;
  onAddToBasket: (id: number) => void;
  onToggleWishlist: (id: number) => void;
}

export default function ProductCard({
  id,
  name,
  price,
  originalPrice,
  image,
  isOnSale,
  isInWishlist,
  onAddToBasket,
  onToggleWishlist,
}: ProductCardProps) {
  return (
    <div className="relative bg-white rounded-lg text-[#2C2C2C] shadow h-full text-center overflow-hidden flex flex-col mx-4">

      <button onClick={() => router.visit("/register")}
        className="absolute top-2 right-2 z-10 cursor-pointer m-2"
      >
        <Heart
          className={`w-6 h-6 ${
            isInWishlist ? "fill-red-500 text-yellow-500" : "fill-none text-[#2C2C2C] hover:fill-yellow-400 hover:text-yellow-400 shadow-2xl"
          }`}
        />
      </button>

      <div className="relative h-40 flex items-center justify-center  "> 
      <img src={image} alt={name}
      className = "w-full h-full object-contain mt-4"
        
        />
        </div>

    
      {isOnSale && (
        <p className="my-4 flex items-center justify-center bg-red-500 text-white px-3 py-1 rounded text-lg text-center font-bold"> LIMITED TIME SALE!</p>
      )}

      <div className="flex flex-col flex-1 px-2 text-center">
      <h3 className="font-slab text-lg mt-4 text-[#2C2C2C]">{name}</h3>

      </div>

     
      <div className="flex justify-center items-center gap-2 mt-1">
        <p className="font-slab text-[#2C2C2C] text-xl font-semibold">£{price.toFixed(2)}</p>

        {isOnSale && originalPrice && (
          <p className="line-through text-gray-500"> £{originalPrice.toFixed(2)}</p>
        )}
      </div>

     
       <button
          onClick={() => onAddToBasket(id)}
          className="mt-4  mx-auto w-58 bg-yellow-400 hover:bg-yellow-500 text-[#2C2C2C] font-slab my-4 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer text-center shadow-sm"
        >
        <ShoppingBasket  />Add to Basket</button>
    </div>
  );
}
