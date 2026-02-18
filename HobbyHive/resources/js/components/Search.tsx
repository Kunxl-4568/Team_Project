
import React, { useState, useEffect } from "react"
import { router } from "@inertiajs/react"

interface SearchProps {
    initialQuery?: string;
  }

export function Search({initialQuery =""}: SearchProps) {
  const [query, setQuery] = useState(initialQuery);
  
  useEffect(() => {setQuery(initialQuery);}, [initialQuery])

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); 
  router.visit("/products", {method: "get", data:{search: query.trim()} });
};

    return(
      <form onSubmit = {handleSubmit} className="flex gap-2 w-full max-w-md md:max-w-xl">
  <input

    type="text"
    placeholder="Search products..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="grow p-2 border placeholder:text-[#BDBDBD] placeholder:text-base border-[#2C2C2C] text-base font-slab text-[#2C2C2C] rounded focus:outline-none focus:ring-2 focus:ring-black"
  />
  <button type="submit" className="px-4 b rounded bg-[#FFC300] text-[#2C2C2C] rounded font-slab shadow-sm border-0 mx-auto cursor-pointer hover:bg-[#f8be00]">Search</button>

</form>

    );
}