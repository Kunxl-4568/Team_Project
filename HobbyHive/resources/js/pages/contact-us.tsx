import { useState, useRef, useEffect } from "react";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Carousel from "@/components/Carousel"
import {Header} from "@/components/Header";
import ProductCard from "@/components/Productcard";
import Footer from "@/components/Footer";
import Basket from "@/components/Basket";

export default function ContactUs() {
    const [bannerVisible, setBannerVisible] = useState(true);
    const fixedHeight=80;
    const fixedRef = useRef<HTMLDivElement>(null);
    const [basket,setBasket] = useState<number[]>([]);
    const handleAddToBasket = (id: number) => { setBasket((prev) => [...prev, id])};
    const [formData, setFormData] = useState({ Fname: "", Lname: "", email: "", phone: "", message: ""});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("submitted", formData);
    };
    return (
        <div className='min-h-screen bg-white p-6 bg-[url("/images/honeycomb.png")] bg-no-repeat bg-right-bottom bg-contain overflow-x-hidden' >

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

            



            <div className='sm:mt-50 sm:ml-15 mt-5 ml-0'>
            <h1 className='sm:text-4xl text-2xl font-bold sm:mb-8 sm:ml-10 mb-8 text-[#2c2c2c]'>GET IN TOUCH</h1>
            <form onSubmit={handleSubmit} className='space-y-4 w-[400px]'>
                <div className=' flex space-x-4'>
                <input 
                type='text' 
                name='Fname'
                placeholder='FIRST NAME'
                value = {formData.Fname}
                onChange={handleChange}
                className ='w-[155px] sm:w-[220px] sm:flex-1 mb-4 py-2 outline-none border-b border-gray-400 bg-transparent focus:border-[#2c2c2c] placeholder:text-[#D9D9D9] text-[#2c2c2c]'
                required
                />

                <input 
                type='text' 
                name='Lname'
                placeholder='LAST NAME'
                value = {formData.Lname}
                onChange={handleChange}
                className ='w-[140px] sm:w-[220px] sm:flex-1 mb-4 py-2 outline-none border-b border-gray-400 bg-transparent focus:border-[#2c2c2c] placeholder:text-[#D9D9D9] text-[#2c2c2c]'
                required
                />
                </div>

                <div className='flex space-x-4'>
                <input
                type='email'
                name='email'
                placeholder='EMAIL'
                value={formData.email}
                onChange={handleChange}
                className='w-[140px] sm:w-[220px] sm:flex-1 mb-4 py-2 outline-none border-b border-gray-400 bg-transparent focus:border-[#2c2c2c] placeholder:text-[#D9D9D9] text-[#2c2c2c]'
                required
                />

                <input
                type='tel'
                name='phone'
                placeholder='PHONE NUMBER'
                value={formData.phone}
                onChange={handleChange}
                className='w-[155px] sm:w-[220px] sm:flex-1 mb-4 py-2 outline-none border-b border-gray-400 bg-transparent focus:border-[#2c2c2c] placeholder:text-[#D9D9D9] text-[#2c2c2c]'
                />
                </div>

                <textarea
                name='message'
                placeholder='MESSAGE'
                value={formData.message}
                onChange={handleChange}
                className=' w-[320px] sm:w-[440px] mb-4 py-2 outline-none border-b border-gray-400 bg-transparent focus:border-[#2c2c2c] placeholder:text-[#D9D9D9] text-[#2c2c2c]'
                rows={4}
                required
                />

                <button type='submit' className='w-[150px] ml-25 bg-[#2C2C2C] text-white py-2 rounded-md hover:bg-[#ffc300] mb-4'>
                    SUBMIT
                </button>
            </form>
            </div>
        </div>
    );
}
    
