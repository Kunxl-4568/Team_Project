import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Link } from "@inertiajs/react";

type Product = {
  id: number;
  name: string;
  image: string;
};

type MiniReviewProps = {
  PurchasedProducts: Product[];
};

export default function MiniReview({ PurchasedProducts }: MiniReviewProps) {
  const [index, setIndex] = useState(0);
  const [ratings, setRatings] = useState<{ [id: number]: number }>({});

  useEffect(() => {
    if (!PurchasedProducts || PurchasedProducts.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % PurchasedProducts.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [PurchasedProducts]);

  if (!PurchasedProducts || PurchasedProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 text-lg gap-4 mt-5 text-center">
        <Star className="w-16 h-16 text-gray-300" />
        <p className="text-[#2c2c2c] font-semibold text-xl">No items to review</p>
        <p className="text-gray-400 text-sm">Purchase items to review.</p>
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

  const length = PurchasedProducts.length;

  const leftIndex = (index - 1 + length) % length;
  const centerIndex = index;
  const rightIndex = (index + 1) % length;

  const visible = [
    PurchasedProducts[leftIndex],
    PurchasedProducts[centerIndex],
    PurchasedProducts[rightIndex],
  ];

  return (
    <>
      <div className="flex justify-center items-center space-x-20 mt-4">
        {visible.map((product, i) => {
          const isCenter = i === 1;

          return (
            <div
              key={`${product.id}-${i}`}
              className={`flex flex-col items-center transition-all duration-300 ${
                isCenter ? "scale-125 opacity-100" : "scale-90 opacity-60"
              }`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-28 h-28 object-contain mb-2"
              />

              <p className="font-semibold text-[#2c2c2c]">{product.name}</p>

              {isCenter && (
                <div className="flex space-x-1 mt-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() =>
                        setRatings({
                          ...ratings,
                          [product.id]: star,
                        })
                      }
                      className={`cursor-pointer text-2xl ${
                        ratings[product.id] && star <= ratings[product.id]
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-4 space-x-2 pt-3">
        {PurchasedProducts.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-[#2c2c2c]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </>
  );
}