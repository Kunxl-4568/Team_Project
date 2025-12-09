
import React from "react";
import { Link, usePage } from "@inertiajs/react";


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

    const { selectedCategory } = usePage().props as { selectedCategory?: string };


    return (
        <nav className="w-full relative text-black flex items-center p-4 bg-white shadow transition-all duration-300 
        mt-4">


            <ul className="w-full flex flex-wrap justify-center md:justify-between gap-6 px-4 md:px-0 ">
                {categories.map((category) => {
                    const slug = category.toLowerCase().replace(/ & /g, " and ").replace(/ /g, "-");
                    const isActive = selectedCategory === slug || (slug === "all" && !selectedCategory);

                 return (
                   <li key={category}>
                        <Link
                            href={`/products?category=${slug}`}
                            className={`font-hepta text-black transition ${isActive ? "text-yellow-600" : "hover:text-yellow-600"}`}
                           preserveScroll
                         >
                       
                            {category}
                        </Link>
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