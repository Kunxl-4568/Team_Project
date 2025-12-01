
import React from "react"

export function Search() {
    return(
        <form className="flex gap-2 w-full max-w-md mx-auto
        -mt-4
        sm:-mt-2
        md:mt-0"
        >
  <input
    placeholder="Search products..." 
    className="flex-grow p-2 border rounded placeholder:text-[#BDBDBD] placeholder:text-base border-[#2C2C2C] text-base font-slab text-[#2C2C2C]"
  />
  <button className="px-4 bg-[#FFC300] text-[#2C2C2C] rounded font-slab">Search</button>
</form>

    );
}