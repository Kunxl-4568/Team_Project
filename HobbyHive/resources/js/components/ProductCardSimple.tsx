import { ShoppingBasket } from "lucide-react";

interface ProductCardSimpleProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  onAddToBasket: (id: number) => void;
}

export default function ProductCardSimple({
  id,
  name,
  price,
  originalPrice,
  image,
  onAddToBasket,
}: ProductCardSimpleProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 text-center">


      <img src={image} alt={name}
        className="w-full h-48 object-contain rounded-md mt-2"
        />

      
      <h3 className="font-hepta text-lg mt-3">{name}</h3>

     
      <div className="flex justify-center items-center gap-2 mt-1">
        <p className="font-hepta text-xl">£{price.toFixed(2)}</p>

        {originalPrice && (
          <p className="line-through text-gray-500"> 
          £{originalPrice.toFixed(2)}</p>
        )}
      </div>

     
      <button onClick={() => onAddToBasket(id)}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-hepta mt-4 py-2 rounded-lg flex items-center justify-center gap-2" >
        <ShoppingBasket className="w-5 h-5" />Add to Basket </button>
    </div>
  );
}