

import React, {useState, useRef, useEffect} from "react";
import ProductGrid from "@/components/ProductGrid";
import {Header} from "@/components/Header";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Head, usePage, } from "@inertiajs/react";
import type { PageProps } from "@inertiajs/core";




interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    isOnSale?: boolean;
    isInWishlist:boolean;
    category: { name: string};
}

interface ProductsPageProps {
    products: Product[];
    selectedCategory: string;
}




export default function Products() {
    const { products, selectedCategory } = usePage<PageProps & ProductsPageProps>().props;
    const [productsList, setProductsList] = useState<Product[]>(products || []);

    const [basket,setBasket] = useState<number[]>(() => {
        const stored = localStorage.getItem("basket");
        return stored ? JSON.parse(stored) : [];
    });
    const handleAddToBasket = (id: number) => {setBasket((prev) => {
        const updated = [...prev, id];
        sessionStorage.setItem("basket", JSON.stringify(updated));
        return updated;
    });
};

  const [bannerVisible, setBannerVisible] = useState(true);
  const [bannerHeight, setBannerHeight] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

  

  useEffect(() => {
    if (bannerRef.current) setBannerHeight(bannerRef.current.offsetHeight);
  }, [bannerVisible]);
 
     useEffect(() => {
          localStorage.setItem("basket", JSON.stringify(basket));
      },[basket]);
  
return (
     <div className="bg-white min-h-screen flex flex-col">
        <Head title='Products' />
       
        {bannerVisible && (
        <div ref={bannerRef} className="w-full flex justify-center">
        <div className="w-full px-4 md:px-8 lg:px-12 max-w-7xl">
             <Banner onClose={() => setBannerVisible(false)} />
         </div>
     </div>
        )}

      <div className="w-full flex justify-center mt-4 px-4 md:px-8 lg-px-12">
      <div className="w-full max-w-7xl">
        <Header basket={basket} />
      </div>
      </div>

        <div className="w-full flex justify-center mt-2 Md:px-8 lg:px-12 px-4">
            <div className="w-full max-w-7xl">
         <Navbar bannerHeight={bannerVisible ? bannerHeight : 0} />
         </div>
         </div>


        <div className="w-full px-4 md:px-8 lg:px-12 mx-auto max-w-7xl mt-6">
            <ProductGrid 
            products ={productsList}
            onAddToBasket={handleAddToBasket}
            onToggleWishlist={(id => console.log("Toggle wishlist", id))}
            />
         </div>

         <div className="w-full flex justify-center mt-2 Md:px-8 lg:px-12 px-4mt-6">
            <div className="w-full max-w-7xl">
           <Footer />
           </div>
         </div>

        </div>
   
);
}