import React from 'react';

function AboutUs () {
    return(
        <div className = 'min-h-screen sm:w-auto bg-white p-4 sm:p-8 sm:bg-[url("/images/AboutUs.png")] bg-no-repeat bg-right-bottom bg-contain'>
            <div className='bg-[#F4F3EF] p-4 sm:p-8 rounded-lg max-w-2xl sm:mt-37 sm:ml-9 mt-25 ml-4'>
            
            <div className=''>
            <img src="/images/bee.png" alt='bee icon' className='w-20 h-14 sm:h-10 sm:ml-65 ml-27 sm:mb-5 mb-4'/>
            <h1 className='inline-block text-2xl sm:text-4xl font-bold sm:mb-8 mb-4 sm:ml-45 ml-17 text-[#2c2c2c]'>ABOUT US</h1>
            </div>

            <p className='text-[#2c2c2c] max-w-2xl'>HobbyHive is a hub for hobbyist, 
                DIY enthusiast,decorators, and families. It centralises the 
                discovery and purchase of craft materials, 
                DIY kits, and creative tools while fostering a community 
                where users share projects, ask for advice, and showcase their creations. 
                At HobbyHive creativity starts here, inspiring every project and every passion</p>
            </div>
        </div>
    );
}
export default AboutUs;