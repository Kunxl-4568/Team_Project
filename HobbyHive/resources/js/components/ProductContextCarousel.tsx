import react from "react";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ProductCard from "@/components/Productcard";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  isOnSale?: boolean;
  isInWishlist: boolean;
}

interface ProductsContextCarouselProps {
   products: Product[];
   onAddToBasket: (id: number) => void;
}

export default function ProductContextCarousel ({ products, onAddToBasket }: ProductsContextCarouselProps) {
    return (
        <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        centerMode
        centerSlidePercentage={33.33}
        swipeable
      >
                {products.map(p => (
                    <div key={p.id} className="flex justify-center">
                            <ProductCard 
                            id={p.id}
                            name={p.name}
                            price={p.price}
                            originalPrice={p.originalPrice}
                            image={p.image}
                            isOnSale={p.isOnSale}
                            isInWishlist={p.isInWishlist}
                            onAddToBasket={onAddToBasket}
                            onToggleWishlist={(id) => console.log("Toggle wishlist:", id)}
                            />
                    </div>
                       ))}  
      </Carousel>
    );
}