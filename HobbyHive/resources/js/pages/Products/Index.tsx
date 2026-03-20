

import React, { useState, useRef, useEffect } from "react";
import ProductGrid from "@/components/ProductGrid";
import { Header } from "@/components/Header";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Head, usePage, router, Link } from "@inertiajs/react";
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

    const [bannerVisible, setBannerVisible] = useState(true);
    const bannerRef = useRef<HTMLDivElement>(null);
    const fixedRef = useRef<HTMLDivElement>(null);
    const [fixedHeight, setFixedHeight] = useState(0);

    // Measure fixed header height whenever banner visibility changes
    useEffect(() => {
        if (fixedRef.current) setFixedHeight(fixedRef.current.offsetHeight);
    }, [bannerVisible]);

    const handleAddToBasket = (id: number) => {
        setBasket((prev) => {
            const updated = [...prev, id];
            localStorage.setItem("basket", JSON.stringify(updated));
            return updated;
        });

        router.post('/cart', { product_id: id, quantity: 1 }, {
            preserveScroll: true,
            onSuccess: () => console.log('Added to cart (server)'),
            onError: (errors) => console.error('Add to cart failed', errors),
        });
    };

    return (
        <div className="bg-white min-h-screen flex flex-col dark:bg-neutral-900 transition-all duration-300">
            <Head title="Products" />

            {bannerVisible && (
                <div ref={bannerRef} className="w-full flex justify-center">
                    <div className="w-full px-4 md:px-8 lg:px-12 max-w-7xl">
                        <Banner onClose={() => setBannerVisible(false)} />
                    </div>
                </div>
            )}

            <div ref={fixedRef} className="fixed top-0 left-0 w-full z-40 bg-white flex flex-col dark:bg-neutral-900">
                <div className="w-full flex justify-center">
                    <div className="w-full px-4 md:px-8 lg:px-12">
                        <Header basket={basket} />
                    </div>
                </div>

                <div className="flex justify-center w-full mt-2">
                    <div className="w-full px-4 md:px-8 lg:px-12 mx-auto mt-2">
                        <Navbar bannerHeight={bannerVisible ? fixedHeight : 0} />
                    </div>
                </div>
            </div>

            {/* Spacer to push content below the fixed header */}
            <div style={{ height: fixedHeight }} />

            <div className="flex-1 w-full px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
                <ProductGrid
                    products={productsList}
                    onAddToBasket={handleAddToBasket}
                />
            </div>

            <Footer />
        </div>
    );
}