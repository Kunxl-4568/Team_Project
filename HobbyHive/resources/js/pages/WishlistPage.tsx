import React, { useRef, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import { Header } from "@/components/Header";
import Navbar from "@/components/Navbar";
import { NavFooter } from "@/components/nav-footer";
import Footer from "@/components/Footer";
import { Heart, ShoppingBasket, Trash2 } from "lucide-react";

type WishlistItemType = {
  id: number;
  product_id: number;
  title: string;
  image: string;
  price: number;
  original_price?: number;
  is_on_sale: boolean;
};

type WishlistPageProps = {
  wishlistItems: WishlistItemType[];
  wishlistProductIds: number[];
};

const WishlistPage: React.FC = () => {
  const [bannerVisible, setBannerVisible] = useState(true);
  const fixedHeight = 80;
  const fixedRef = useRef<HTMLDivElement>(null);
  const [basket, setBasket] = useState<number[]>([]);

  const { wishlistItems = [], wishlistProductIds = [] } =
    usePage<WishlistPageProps>().props;

  const removeItem = (itemId: number) => {
    router.delete(`/wishlist/${itemId}`, { preserveScroll: true });
  };

  const clearWishlist = () => {
    router.post("/wishlist/clear", {}, { preserveScroll: true });
  };

  const addToCart = (productId: number) => {
    router.post(
      "/cart",
      { product_id: productId, quantity: 1 },
      { preserveScroll: true }
    );
  };

  const headerSection = (
    <div ref={fixedRef} className="fixed top-0 left-0 w-full z-40 bg-white flex flex-col">
      <div className="w-full flex justify-center">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <Header basket={basket} />
        </div>
      </div>
      <div className="flex justify-center w-full mt-2">
        <div className="w-full px-4 md:px-8 lg:px-12 mx-auto mt-2">
          <Navbar bannerHeight={bannerVisible ? fixedHeight : 0} />
        </div>
      </div>
    </div>
  );

  // Empty state
  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        {headerSection}
        <div className="flex flex-col items-center justify-center flex-1 mt-48 text-lg gap-4">
          <Heart className="w-16 h-16 text-gray-300" />
          <p className="text-[#2c2c2c] font-semibold text-xl">Your wishlist is empty</p>
          <p className="text-gray-400 text-sm">Save items you love and come back to them later.</p>
          <Link
            href="/products"
            className="bg-[#ffc300] text-[#2c2c2c] font-semibold px-6 py-2 rounded hover:bg-yellow-400 transition"
          >
            Browse Products
          </Link>
        </div>
        <NavFooter items={[]} />
      </div>
    );
  }

  return (
    <div className="bg-[#fff8dc] min-h-screen flex flex-col">
      {headerSection}

      <div className="bg-white max-w-6xl mx-auto p-10 min-h-[500px] mt-47 mb-20 rounded-lg w-full">
        {/* Header row */}
        <div className="flex items-center mb-3">
          <Link
            href="/products"
            className="text-[#2c2c2c] flex-grow text-left underline"
          >
            Back to Shopping
          </Link>

          <h1 className="text-[#2c2c2c] font-bold text-xl flex-grow mb-8 mt-5 mr-28 mx-auto">
            My Wishlist
          </h1>

          <button
            onClick={clearWishlist}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Clear Wishlist
          </button>
        </div>

        <hr className="border-t-1 border-black mb-5" />

        <p className="text-[#2c2c2c] mb-5">{wishlistItems.length} saved item{wishlistItems.length !== 1 ? "s" : ""}</p>

        {/* Grid of wishlist items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="relative bg-white rounded-lg shadow text-center overflow-hidden flex flex-col"
            >
              {/* Remove button */}
              <button
                onClick={() => removeItem(item.id)}
                className="absolute top-2 right-2 z-10 text-gray-400 hover:text-red-500 transition"
                title="Remove from wishlist"
              >
                <Heart className="w-6 h-6 fill-red-500 text-red-500" />
              </button>

              {/* Product image */}
              <Link href={`/products/${item.product_id}`} className="block">
                <div className="h-40 flex items-center justify-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain mt-4"
                  />
                </div>
              </Link>

              {item.is_on_sale && (
                <p className="my-2 bg-red-500 text-white px-3 py-1 text-sm font-bold">
                  LIMITED TIME SALE!
                </p>
              )}

              <div className="flex flex-col flex-1 px-2 text-center">
                <h3 className="font-slab text-lg mt-4 text-[#2C2C2C]">{item.title}</h3>
              </div>

              <div className="flex justify-center items-center gap-2 mt-1">
                <p className="font-slab text-[#2C2C2C] text-xl font-semibold">
                  £{item.price.toFixed(2)}
                </p>
                {item.is_on_sale && item.original_price && (
                  <p className="line-through text-gray-500">
                    £{item.original_price.toFixed(2)}
                  </p>
                )}
              </div>

              {/* Add to basket */}
              <button
                onClick={() => addToCart(item.product_id)}
                className="mt-4 mx-auto w-58 bg-yellow-400 hover:bg-yellow-500 text-[#2C2C2C] font-slab my-4 py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <ShoppingBasket /> Add to Basket
              </button>
            </div>
          ))}
        </div>
      </div>

      <NavFooter items={[]} />
    </div>
  );
};

export default WishlistPage;
