

import { useState, useRef, useEffect } from "react";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Carousel from "@/components/Carousel"
import {Header} from "../components/Header";
import ProductCard from "../components/Productcard";


export default function Home() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [bannerHeight, setBannerHeight] = useState(0);
  const bannerRef = useRef<HTMLDivElement>(null);

useEffect(() => { 
  if (bannerRef.current)  {
    setBannerHeight(bannerRef.current.offsetHeight);

  }
}, [bannerVisible]);

const products = [
  {
    id: 1,
    name: "Faber-Castell Pencils 24 Pack",
    price:30.00,
    originalPrice: 25.00,
    image:"/images/Faber Castell metal tin.png",
    isOnSale: true,
    isInWishlist:false,
  },
    {
    id: 2,
    name: "Faber-Castell Pencils 24 Pack",
    price:30.00,
    originalPrice: 25.00,
    image:"/images/Faber Castell metal tin.png",
    isOnSale: true,
    isInWishlist:false,
  },
    {
    id: 3,
    name: "Faber-Castell Pencils 24 Pack",
    price:30.00,
    originalPrice: 25.00,
    image:"/images/Faber Castell metal tin.png",
    isOnSale: true,
    isInWishlist:false,
  }
];

  return (

    <div className="bg-white min-h-screen flex flex-col">
      <div ref={bannerRef}>
        {bannerVisible && <Banner onClose={() => setBannerVisible(false)} />}
         </div>

         <div className="px-4 mt-4 md:-mt-2 lg:-mt-0">
         <Header />
         </div>

      <Navbar bannerHeight={bannerVisible ? bannerHeight : 0} /> 

        <div className="w-full mt-2 md:mt-4 lg:mt-6">
      <Carousel />
    </div>

    <div className="w-full mt-10 px-4 md:px-8 lg:px-12">
      <div className="flex items-center justify-between">
        <img src="/images/Bee doodle.png" alt="Bee doodle" className="h-12 md:h-16 lg:h-20 ml-4"/>
      <h2 className="text 2xl font-slab text-black md:text 3xl mb-6">Products you will Love</h2>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {products.map((product) =>  (
    <ProductCard 
    key={product.id}
    id={product.id}
    name={product.name}
    price={product.price}
    originalPrice={product.originalPrice}
    image={product.image}
    isOnSale={product.isOnSale}
    isInWishlist={product.isInWishlist}
    onAddToBasket={(id) => console.log("Add to basket:", id)}
    onToggleWishlist={(id) => console.log("Toggle wishlist:", id)}
    />
))}

</div>
    </div>
  
    </div>
  
   
  );
}