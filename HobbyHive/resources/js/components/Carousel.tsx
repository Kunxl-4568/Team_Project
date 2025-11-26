
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function MyCarousel() {
  return (
    <div className="w-full ">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
      >
        <div className="relative w-full">
          <img src="/images/AutumnBackground.png" alt="Seasonal Collection" /> 
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black px-4">
          <h2 className="font-hepta text-2xl md:text-4xl lg:text-5xl">Seasonal Collection</h2>
          <p className="mt-2 text-sm md:text-4xl lg:text-5xl font-hepta">Limited Time Only</p>

          </div>
        </div>
         <div className="relative w-full">
          <img src="/images/PencilBackground.png" alt="Arts and crafts" /> 
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black px-4">
          <h2 className="font-hepta text-2xl md:text-4xl lg:text-5xl">Discover Art Supplies</h2>
          <p className="mt-2 text-sm md:text-4xl lg:text-5xl font-hepta">For every creative mind</p>

          </div>
        </div>
         <div className="relative w-full">
          <img src="/images/BeeBackground.png" alt="New Collection" /> 
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black px-4">
          <h2 className="font-hepta text-2xl md:text-4xl lg:text-5xl">New Collection</h2>
          <p className="mt-2 text-sm md:text-4xl lg:text-5xl font-hepta">Limited Time Only</p>

          </div> 
        </div>
      </Carousel>
    </div>
  );
}
