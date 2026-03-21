import { useState, useEffect } from "react";
import { Link } from "@inertiajs/react";
import { Package } from "lucide-react";

type MiniOrderProps = {
  items: {
    id: number;
    product_id: number;
    title: string;
    image: string;
    status: string;
    trackingStep: number;
  }[];
};

export default function MiniOrder({ items }: MiniOrderProps) {
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
        <Package className="w-16 h-16 text-gray-300"/>
        <p className="text-[#2c2c2c] font-semibold text-xl">No orders yet</p>
        <p className="text-gray-400 text-sm">
          You haven’t placed any orders yet.
        </p>

        <div className="bg-[#ffc300] rounded-lg w-full mt-13 text-center">
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

  const statusStyles: Record<string, string> = {
    Delivered: "bg-green-100 text-green-800",
    Processing: "bg-yellow-100 text-yellow-800",
    Shipped: "bg-blue-100 text-blue-800",
    "In Transit": "bg-blue-100 text-blue-800",
    "Requested Return": "bg-orange-100 text-orange-800",
    Returned: "bg-gray-100 text-gray-800",
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
      
      <span
        className={`px-2 py-1 text-xs rounded font-semibold mt-1 ${statusStyles[item.status]}`}
      >
        Status: {item.status}
      </span>

      <div className="flex justify-center mt-2 space-x-1">
        {[1, 2, 3].map((step) => (
          <div
            key={step}
            className={`h-2 w-6 rounded ${
              step <= item.trackingStep ? "bg-[#ffc300]" : "bg-[#fefaf1]"
            }`}
          />
        ))}
      </div>

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

      <div className="bg-[#ffc300] rounded-lg w-full mt-5">
        <Link
           href="/orders"
           className="text-sm underlined text-[#2c2c2c] mt-2"
        >
            View Previous Orders
        </Link>
      </div>


    </div>
  );
}