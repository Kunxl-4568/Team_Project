import React, { useState, useRef, useEffect } from "react";
import ProductGrid from "@/components/ProductGrid";
import { Header } from "@/components/Header";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Head, usePage, router } from "@inertiajs/react";
import type { PageProps } from "@inertiajs/core";

interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    isOnSale?: boolean;
    isInWishlist: boolean;
    category: { name: string };
}

interface ProductsPageProps {
    products: Product[];
    selectedCategory: string;
}

export default function Products() {
    const { products, selectedCategory } = usePage<PageProps & ProductsPageProps>().props;
    const [productsList, setProductsList] = useState<Product[]>(products || []);

    const [basket, setBasket] = useState<number[]>(() => {
        const stored = localStorage.getItem("basket");
        return stored ? JSON.parse(stored) : [];
    });

  
    const fixedRef = useRef<HTMLDivElement>(null);

    const handleAddToBasket = (id: number) => {
        setBasket((prev) => {
            const updated = [...prev, id];
            localStorage.setItem("basket", JSON.stringify(updated));
            return updated;
        });

        router.post('/cart', { product_id: id, quantity: 1 }, {
            preserveScroll: true,
        });
    };

    return (
        <div className="bg-white min-h-screen flex flex-col dark:bg-neutral-900">
            <Head title="Products" />

            
            <div ref={fixedRef} className="fixed top-0 left-0 w-full z-40 bg-white flex flex-col dark:bg-neutral-900">
                <div className="w-full flex justify-center">
                    <div className="w-full px-4 md:px-8 lg:px-12">
                        <Header basket={basket} />
                    </div>
                </div>

                <div className="flex justify-center w-full mt-2">
                    <div className="w-full px-4 md:px-8 lg:px-12 mx-auto mt-2">
                        <Navbar bannerHeight={0} />
                    </div>
                </div>
            </div>

            
            <div className="flex-1 w-full px-4 md:px-8 lg:px-12 max-w-7xl mx-auto pt-66">
                <ProductGrid
                    products={productsList}
                    onAddToBasket={handleAddToBasket}
                />
            </div>

            <Footer />
        </div>
    );
}