import React, { useState} from 'react';

export default function ContactUs() {
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
            <div className='sm:mt-30 sm:ml-25 mt-5 ml-0'>
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
    
