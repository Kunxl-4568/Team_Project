
import React from "react"

export function Search() {
    return(
        <form className="flex gap-2 w-full max-w-md md:max-w-xl">
  <input
    placeholder="Search products..." 
    className="flex-grow p-2 border rounded placeholder:text-[#BDBDBD] placeholder:text-base border-[#2C2C2C]   text-base font-slab text-[#2C2C2C]"
  />
  <button className="px-4 bg-[#FFC300] text-[#2C2C2C] rounded font-slab shadow-sm border-0 mx-auto cursor-pointer hover:bg-[#f8be00]">Search</button>
</form>

    );
}