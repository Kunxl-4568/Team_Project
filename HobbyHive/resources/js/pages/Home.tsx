

import { useState, useRef, useEffect } from "react";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Carousel from "@/components/Carousel"
import {Header} from "@/components/Header";
import ProductCard from "@/components/Productcard";
import Footer from "@/components/Footer";
import Basket from "@/components/Basket";


export default function Home() {

 const [basket,setBasket] = useState<number[]>([]);

    const handleAddToBasket = (id: number) => {
      setBasket(prev => {const updated = [...prev, id];
      sessionStorage.setItem("basket", JSON.stringify(updated));
      return updated;
    });  
   };

  const [bannerVisible, setBannerVisible] = useState(true);
  const [fixedHeight, setFixedHeight] = useState(0);
  const fixedRef = useRef<HTMLDivElement>(null);

useEffect(() => { 
  if (fixedRef.current)  {
    setFixedHeight(fixedRef.current.offsetHeight);
  }
}, [bannerVisible]); 

  useEffect(() => {
    const stored = sessionStorage.getItem("basket");
    if (stored) setBasket(JSON.parse(stored));
}, []);

const products = [
  {
    id: 1,
    name: "Jenga Classic Game",
    price:25.00,
    originalPrice: 30.00,
    image:"/images/Jenga.png",
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
    name: "Finn Family Moomintroll Plush",
    price:30.00,
    originalPrice: 25.00,
    image:"/images/Finn-Family-Moomintroll.png",
    isOnSale: true,
    isInWishlist:false,
  }
];

  return (

    <div className="bg-white min-h-screen flex flex-col">

      {bannerVisible && (
        <div className="fixed top-0 left-0 w-full z-50 flex justify-center">
          <div className="w-full px-4 md:px-8 lg:px-12 max-w-7xl">
      <Banner onClose={() => setBannerVisible(false)} />
        </div>
    </div>
    )}

      <div ref={fixedRef} className="fixed top-0 left-0 w-full z-40 bg-white flex flex-col">
        <div className="w-full flex justify-center">
         <div className="w-full px-4 md:px-8 lg:px-12 max-w-7xl">
         <Header basket={basket}/>
         </div>
         </div> 

         <div className="flex justify-center w-full mt-2">
         <div className="w-full px-4 md:px-8 lg:px-12 mx-auto max-w-7xl mt-2">
         <Navbar bannerHeight={bannerVisible ? fixedHeight : 0} /> 
           </div>
         </div>
        </div>

         <div style={{ paddingTop: fixedHeight }} className="px-4 md:px-8 lg:px-12 mx-auto max-w-7xl">
      <Carousel />
    

    <div className="w-full mt-10 ">
      <div className="flex items-center justify-between">
        <img src="/images/Bee doodle.png" alt="Bee doodle" className="h-12 md:h-16 lg:h-20 ml-4"/>
      <h2 className="text-2xl font-slab text-black md:text 3xl mb-6">Products you will Love</h2>
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
    onAddToBasket={handleAddToBasket}
    onToggleWishlist={(id) => console.log("Toggle wishlist:", id)}
    />
))}

     </div>
    </div>
        <div className="mt-6 flex justify-center">
          <div className="w-full px-4 md:px-8 lg:px-12 max-w-7xl">
          <Footer />
          </div>
        </div>
      </div>
  
    </div>
  
   
  );
}