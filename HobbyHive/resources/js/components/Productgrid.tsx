import React from "react";
import ProductCard from "./Productcard.js";

interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    isOnSale?: boolean;
    isInWishlist:boolean;
}

interface ProductGridProps {
    products: Product[];
    product: ProductGridProps;
    onAddToBasket:(id: number) => void;
}

export default function ProductGrid({ products, onAddToBasket}: ProductGridProps) {
    return (
        <div className=" grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
                <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image}
                isOnSale={product.isOnSale}
                isInWishlist={product.isInWishlist}
                onAddToBasket={(id) => console.log("Add to basket:", id)}
                onToggleWishlist={(id) => console.log("Toggle wishlist:", id)}
              />
            ))}
        </div>
    )
}