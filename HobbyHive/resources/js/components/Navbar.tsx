
import React from "react";

type NavbarProps = {
    bannerHeight: number
};

export default function Navbar({bannerHeight}: NavbarProps) {
    const categories = [
        "All",
        "Seasonal",
        "New",
        "Art Supplies",
        "Toys & Games",
        "Textile Crafts",
        "Books",
        "Offers",
    ];

    
    return (
        <nav className="w-full relative flex items-center p-4 bg-white shadow transition-all duration-300
        -mt-0
        md:-mt-4
        lg:-mt-6
        xl:-mt-8">


            <ul className="w-full flex flex-wrap justify-center items-center md:justify-between md:px-10 gap-3  ">
                {categories.map((category) => {
                    const slug = category.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-");
                    return (
                        <li key={category}>
                            <a href={`/products?category=${slug}`}
                            className="font-hepta hover:text-yellow-600 transition">
                       
                        {category}
                        </a>
                  </li>
                    );
                })}
            </ul>
           {/**Rainbow line at the bottom of nav bar */}
           <div className="absolute bottom-0 w-full left-0 h-[3px] bg-gradient-to-r 
           from-red-500 
           via-orange-500 
           via-yellow-500 
           via-green-500 
           via-blue-500 
           via-indigo-500 
           to-purple-500">

           </div>

        </nav>
    );
}

