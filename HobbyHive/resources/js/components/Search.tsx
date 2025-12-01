
import React from "react"

export function Search() {
    return(
        <form className="flex gap-2 w-full max-w-md md:max-w-xl">
  <input
    placeholder="Search products..."
    className="flex-grow p-2 border rounded"
  />
  <button className="px-4 bg-yellow-500 text-white rounded">Search</button>
</form>

    );
}