

import React, {useState, useRef, useEffect} from "react";
import {Header} from "@/components/Header";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Head, usePage, router} from "@inertiajs/react";
import type { PageProps } from "@inertiajs/core";
import ProductCard from "@/components/Productcard";
import ProductContextCarousel from "@/components/ProductContextCarousel";
import { Link } from "@inertiajs/react";

interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    isOnSale?: boolean;
    isInWishlist:boolean;
    category: { name: string};
    description: string;
}

interface ShowPageProps {
    product: Product;
    randomProducts: Product[];
    
}



export default function Products() {
    const { product, randomProducts} = usePage<PageProps & ShowPageProps>().props;
    
  const [bannerVisible, setBannerVisible] = useState(true);
  const [bannerHeight, setBannerHeight] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

    const [basket,setBasket] = useState<number[]>(() => {
        const stored = localStorage.getItem("basket");
        return stored ? JSON.parse(stored) : [];
    });
    const handleAddToBasket = (id: number) => {setBasket((prev) => {
        const updated = [...prev, id];
        localStorage.setItem("basket", JSON.stringify(updated));
        return updated;
    });

     // send to backend
        router.post('/cart', { product_id: id, quantity: 1 }, {
            preserveScroll: true,
            onSuccess: () => {
                // remove later
                console.log('Added to cart (server)');
            },
            onError: (errors) => {
                console.error('Add to cart failed', errors);
                // remove later
            }
        });
};

  useEffect(() => {
    if (bannerRef.current) setBannerHeight(bannerRef.current.offsetHeight);
  }, [bannerVisible]);
 
  useEffect(() => {
    const stored = sessionStorage.getItem("basket");
    if (stored) setBasket(JSON.parse(stored));
}, []);
  
return (
     <div className="bg-white min-h-screen flex flex-col">
        <Head title={product.name} />
       
       {/*Banner*/}
        {bannerVisible && (
        <div ref={bannerRef} className="w-full flex justify-center">
        <div className="w-full px-4 md:px-8 lg:px-12 max-w-7xl">
             <Banner onClose={() => setBannerVisible(false)} />
         </div>
     </div>
        )}
       
        {/*Head*/}
      <div className="w-full flex justify-center mt-4 px-4 md:px-8 lg:px-12">
      <div className="w-full max-w-7xl">
        <Header basket={basket} />
      </div>
      </div>

         {/*Navbar*/}
        <div className="w-full flex justify-center mt-2 Md:px-8 lg:px-12 px-4">
            <div className="w-full max-w-7xl">
         <Navbar bannerHeight={bannerVisible ? bannerHeight : 0} />
         </div>
         </div>

         {/*Product Content*/}
        <div className="w-full px-4 md:px-8 lg:px-12 mx-auto max-w-7xl mt-6">
            <div className="grid md:grid-cols-2 gap-10 items-start"></div>
          
          <div>
            <img className= "w-full rounded-lg" src={product.image} alt={product.name} 
              />
          </div>
        {/*Main chunk of details*/}
        <div>
            <p className="text-gray-500">{product.category.name}</p>
            <h1 className="text-3xl text-[#2c2c2c] mt-2">{product.name}</h1>
        

        <div className="flex items-center gap-4 mt-4">
            <p className="text-2xl text-[#2c2c2c]">£{product.price.toFixed(2)}</p>
        

        {product.isOnSale && product.originalPrice && (
            <p className="line-through text-gray-400">£{product.originalPrice.toFixed(2)}</p>

        )}
        </div>

        <p className="mt-6 text-gray-700">{product.description}</p>

        <button onClick={() => handleAddToBasket(product.id)} className="mt-6 bg-yellow-400 hover:bg-yellow-500 text-black"> Add to Basket </button>
         <div className="w-full flex justify-center mt-2 Md:px-8 lg:px-12 px-4mt-6"> </div>
         </div>
         </div>

<div className="w-full px-4 md:px-8 lg:px-12 mx-auto max-w-7xl mt-16">
    <h2 className="text-sxl font-slab mb-6 text-[#2c2c2c]">You might also like</h2>
    <ProductContextCarousel 
    products={randomProducts}
    onAddToBasket={handleAddToBasket}
    />
        </div>
        
        <div className="w-full max-w-7xl">
           <Footer />
        </div>
     </div>
   );
}