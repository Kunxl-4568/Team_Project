import { useState, useRef, useEffect } from "react";
import Navbar from "@/components/Navbar";
import {Header} from "@/components/Header";
import Footer from "@/components/Footer";

export default function ContactUs() {
    const [bannerVisible, setBannerVisible] = useState(true);
    const fixedHeight=80;
    const fixedRef = useRef<HTMLDivElement>(null);
    const [basket,setBasket] = useState<number[]>([]);
    const [formData, setFormData] = useState({ Fname: "", Lname: "", email: "", phone: "", message: ""});
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowSuccessMessage(true);
        setFormData({ Fname: "", Lname: "", email: "", phone: "", message: "" });

        setTimeout(() => setShowSuccessMessage(false), 5000);
    };
    
    return (
        <div className="bg-white min-h-screen flex flex-col dark:bg-neutral-900">

            {/* Header */}
            <div ref={fixedRef} className="fixed top-0 left-0 w-full z-40 bg-white dark:bg-neutral-900 flex flex-col">
                <div className="w-full flex justify-center">
                    <div className="w-full px-4 md:px-8 lg:px-12">
                        <Header basket={basket}/>
                    </div>
                </div>

                <div className="flex justify-center w-full mt-2">
                    <div className="w-full px-4 md:px-8 lg:px-12 mx-auto mt-2">
                        <Navbar bannerHeight={bannerVisible ? fixedHeight : 0} />
                    </div>
                </div>
            </div>

            {/* Success Message */}
            {showSuccessMessage && (
                <div className="fixed top-24 right-4 z-50">
                    <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg">
                        Thank you! We will contact you soon.
                    </div>
                </div>
            )}

            
            <div className="flex-1 flex flex-col items-center justify-center pt-[140px] px-4">

                <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-[#2c2c2c] dark:text-white text-center">
                    GET IN TOUCH
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">

                    <div className="flex gap-4">
                        <input 
                            type='text' 
                            name='Fname'
                            placeholder='FIRST NAME'
                            value={formData.Fname}
                            onChange={handleChange}
                            className='flex-1 border-b border-gray-400 bg-transparent py-2 outline-none'
                            required
                        />

                        <input 
                            type='text' 
                            name='Lname'
                            placeholder='LAST NAME'
                            value={formData.Lname}
                            onChange={handleChange}
                            className='flex-1 border-b border-gray-400 bg-transparent py-2 outline-none'
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <input
                            type='email'
                            name='email'
                            placeholder='EMAIL'
                            value={formData.email}
                            onChange={handleChange}
                            className='flex-1 border-b border-gray-400 bg-transparent py-2 outline-none'
                            required
                        />

                        <input
                            type='tel'
                            name='phone'
                            placeholder='PHONE NUMBER'
                            value={formData.phone}
                            onChange={handleChange}
                            className='flex-1 border-b border-gray-400 bg-transparent py-2 outline-none'
                        />
                    </div>

                    <textarea
                        name='message'
                        placeholder='MESSAGE'
                        value={formData.message}
                        onChange={handleChange}
                        className='w-full border-b border-gray-400 bg-transparent py-2 outline-none'
                        rows={4}
                        required
                    />

                    <div className="flex justify-center">
                        <button 
                            type='submit' 
                            className='w-40 bg-[#ffc300] cursor-pointer text-[#2C2C2C] py-2 rounded-md transition-colors duration-300 dark:] hover:bg-yellow-500 dark:text-[#2C2C2C]'
                        >
                            SUBMIT
                        </button>
                    </div>

                </form>
            </div>

            <Footer />
        </div>
    );
}