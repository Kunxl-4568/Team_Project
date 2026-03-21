import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { Heart, ShoppingBasket, Trash2 } from "lucide-react";

type MiniWishlistProps = {
  items: {
    id: number;
    product_id: number;
    title: string;
    image: string;
    price: number;
  }[];
};

export default function MiniWishlist({ items }: MiniWishlistProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!items || items.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items]);

  if (!items || items.length === 0) {
    return (
      
      <div className="flex flex-col items-center justify-center flex-1 text-lg gap-4 mt-5 text-center">
                <Heart className="w-16 h-16 text-gray-300" />
                <p className="text-[#2c2c2c] font-semibold text-xl">Your wishlist is empty</p>
                <p className="text-gray-400 text-sm">Save items you love and come back to them later.</p>
                <div className="bg-[#ffc300] rounded-lg w-full mt-8 text-center">
                <Link
                  href="/products"
                  className="text-sm underlined text-[#2c2c2c] mt-2"
                >
                  Browse Products
                </Link>
                </div>
        </div>
    );
  }

  const item = items[index];

  return (
    <div className="flex flex-col items-center text-center">
      <Link href={`/products/${item.product_id}`}>
        <img
          src={item.image}
          alt={item.title}
          className="w-30 h-30 object-contain mb-2"
        />
      </Link>

      <p className="font-semibold text-[#2c2c2c]">{item.title}</p>
      <p className="text-[#2c2c2c]">£{item.price.toFixed(2)}</p>

      <div className="flex justify-center mt-3 space-x-2">
  {items.map((_, i) => (
    <div
      key={i}
      className={`w-2 h-2 rounded-full ${
        i === index ? "bg-[#2c2c2c]" : "bg-gray-300"
      }`}
    />
  ))}
</div>

      <div className="bg-[#ffc300] rounded-lg w-full mt-8.5">
      <Link
        href="/wishlist"
        className="text-sm text-[#2c2c2c] mt-2"
      >
        View full wishlist
      </Link>
      </div>

      

    </div>
  );
}