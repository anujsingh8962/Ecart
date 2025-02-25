"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageCarousel = () => {
  const images = [
    "/black-friday-elements-assortment.jpg",
    "/shopping-cart-with-presents.jpg",
    "/black-friday-elements-assortment.jpg",
    "/overturned-shopping-cart-with-black-friday-ribbon.jpg",
  ];

  return (
    <div className="relative z-[10]">
      <Carousel
        showArrows={true}
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={3000}
        transitionTime={800}
      >
        {images.map((src, index) => (
          <div key={index} className="w-full h-[300px]">
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
