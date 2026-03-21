import { useState, useRef } from "react";
import { usePage } from "@inertiajs/react";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Carousel from "@/components/Carousel";
import { Header } from "@/components/Header";
import ProductCard from "@/components/Productcard";
import Footer from "@/components/Footer";
import Basket from "@/components/Basket";
import MiniWishlist from "../../components/MiniWishlist";
import MiniOrder from "../../components/MiniOrder";
import MiniAccount from "../../components/MiniAccount";
import MiniReview from "../../components/MiniReview";

type DashboardProps = {
  wishlistItems: {
    id: number;
    product_id: number;
    title: string;
    image: string;
    price: number;
  }[];
  orderItems: {
    id: number;
    product_id: number;
    title: string;
    image: string;
    status: string;
    trackingStep: number;
  } [];
};

const PurchasedProducts = [
    {id: 1, name: "Monopoly", image: "/images/Jenga.png"},
    {id: 2, name: "Monopoly", image: "/images/Monopoly.png"}
   ];

function dashboard () {
    const {wishlistItems = [], orderItems = []} = usePage<DashboardProps>().props;
   const [bannerVisible, setBannerVisible] = useState(true);
    const fixedHeight=80;
    const fixedRef = useRef<HTMLDivElement>(null);
    const [basket,setBasket] = useState<number[]>([]);
    const handleAddToBasket = (id: number) => { setBasket((prev) => [...prev, id])};
    const [name, setName] = useState("Sarah");
   const [email, setEmail] = useState("example.com");

   
   return(
        <div className="bg-[#fff8dc] min-h-screen flex flex-col">
            <div ref={fixedRef} className="fixed top-0 left-0 w-full z-40 bg-white flex flex-col">
                <div className="w-full flex justify-center">
                    <div className="w-full px-4 md:px-8 lg:px-12 ">
                        <Header basket={basket}/>
                     </div>
                </div> 
            
                <div className="flex justify-center w-full mt-1">
                    <div className="w-full px-4 md:px-8 lg:px-12 mx-auto  mt-2">
                        <Navbar bannerHeight={bannerVisible ? fixedHeight : 0} /> 
                    </div>
                </div>


            </div>


            <div className = "mt-53 px-4 md:px-8 lg:px-12">
                <div className="flex items-center justify-between">
          <h1 className="text-3xl font-slab text-black md:text 3xl mb-1">Welcome {name},</h1>          
        <img src="/images/Bee doodle no background.png" alt="Bee doodle" className="h-12 md:h-16 lg:h-20 ml-4"/>
</div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 md:px-8 lg:px-12 pt-5 pb-5">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h1 className="text-[#2c2c2c] font-semibold">My Current Order</h1>
                    <MiniOrder items={orderItems} />
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                    <h1 className="text-[#2c2c2c] font-semibold">Wishlist</h1>
                    <MiniWishlist items={wishlistItems} />
                </div>
                <div className="bg-white p-6 rounded-lg lg:row-span-2">
                    <h1 className="text-[#2c2c2c] font-semibold">My Account</h1>
                    <MiniAccount />
                    
                </div>
                <div className="bg-white p-6 rounded-lg lg:col-span-2">
                    <h1 className="text-[#2c2c2c] font-semibold">Review Products</h1>
                    <MiniReview PurchasedProducts={PurchasedProducts}/>
                </div>
            </div>
           
        </div>
    );
}
export default dashboard;