import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import {Header} from "@/components/Header";
import Footer from "@/components/Footer";

function AboutUs () {
   const [bannerVisible, setBannerVisible] = useState(true);
    const fixedHeight=80;
    const fixedRef = useRef<HTMLDivElement>(null);
    const [basket,setBasket] = useState<number[]>([]);
    const handleAddToBasket = (id: number) => { setBasket((prev) => [...prev, id])};

    return(
        <div className="bg-white min-h-screen flex flex-col dark:bg-neutral-900 transition-all duration-300">
            
            <div ref={fixedRef} className="fixed top-0 left-0 w-full z-40 bg-white dark:bg-neutral-900 flex flex-col">
                <div className="w-full flex justify-center">
                    <div className="w-full px-4 md:px-8 lg:px-12 ">
                        <Header basket={basket}/>
                    </div>
                </div> 
        
                <div className="flex justify-center w-full mt-2">
                    <div className="w-full px-4 md:px-8 lg:px-12 mx-auto mt-2">
                        <Navbar bannerHeight={bannerVisible ? fixedHeight : 0} /> 
                    </div>
                </div>
            </div>

         
            <div className='flex-1 flex justify-center items-center mb-6 mt-6'>
                <div className='p-4 sm:p-8 rounded-lg max-w-3xl sm:mt-50 sm:ml-9 mt-25 ml-4 bg-[#fff8dc]  dark:bg-[#FFC300] transition-all duration-300 shadow-2xl'>
                    
                    <div className='flex flex-col items-center'>
                        <img src="/images/bee.png" alt='bee icon' className='w-20 h-14 sm:h-10 sm:mb-10 mb-4'/>
                        <h1 className=' text-2xl sm:text-4xl font-bold sm:mb-8 mb-4 text-[#2c2c2c]'>ABOUT US</h1>
                    </div>

                    <p className='text-[#2c2c2c] max-w-2xl'>
                        HobbyHive is a hub for hobbyist, DIY enthusiast, decorators, and families. 
                        It centralises the discovery and purchase of craft materials, DIY kits, 
                        and creative tools while fostering a community where users share projects, 
                        ask for advice, and showcase their creations. At HobbyHive creativity starts here, 
                        inspiring every project and every passion.
                    </p>
                </div>
            </div>

            <div className="mt-6 flex justify-center">
                <div className="w-full px-4 md:px-8 lg:px-12 max-w-7xl">
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default AboutUs;