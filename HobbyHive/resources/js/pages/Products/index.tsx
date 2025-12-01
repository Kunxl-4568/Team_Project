
import React, { useState} from "react";
import { Head, usePage, } from "@inertiajs/react";
import Productcard from "@/components/Productcard";
import type { PageProps } from "@inertiajs/core";
import { type BreadcrumbItem } from '@/types';
import AppLayout from "@/layouts/app-layout";
import ProductGrid from "@/components/ProductGrid";

interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    isOnSale?: boolean;
    isInWishlist:boolean;
    category: { name: string};
}

interface ProductsPageProps {
    products: Product[];
    selectedCategory: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Products',
        href: '/products',
    },
];


export default function Products() {
    const { products, selectedCategory } = usePage<PageProps & ProductsPageProps>().props;
    const [productsList, setProductsList] = useState<Product[]>(products || []);

     const handleAddToBasket = (id: number) => {
        console.log("Add to basket:", id);
    };


return (
    <AppLayout breadcrumbs={breadcrumbs}>
        <Head title='Products' />
        <div className="mt-4">
            <ProductGrid 
            products ={productsList}
            onAddToBasket={handleAddToBasket}
            onToggleWishlist={(id => console.log("Toggle wishlist", id))}
            />


        </div>
    </AppLayout>
);
}