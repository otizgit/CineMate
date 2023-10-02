import React from "react";
import heroImages from "../../assets/data/heroImages";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export default function Hero() {
  const heroImageElement = heroImages.map((image) => {
    return (
      <SwiperSlide key={image.desktopUrl}>
        <picture className="brightness-50 h-[100dvh]">
          <source media="(max-width: 600px)" srcSet={image.mobileUrl} />
          <img className="image" src={image.desktopUrl} alt="hero image" />
        </picture>
      </SwiperSlide>
    );
  });

  return (
    <div className="relative margin">
      <div className="relative">
        <Swiper
          grabCursor={false}
          slidesPerView={1}
          modules={[Autoplay, Pagination]}
          pagination={true} 
          autoplay={{ delay: 8000 }}
        >
          {heroImageElement}
        </Swiper>
      </div>
      <div className="top-[40%] absolute left-[50%] w-[80%] translate-x-[-50%] z-10 md:top-[55%]">
        {/* <h1
          style={{ textShadow: "1px 6px black" }}
          className="font-comic mb-4 text-center leading-tight text-[3.2rem] text-gray-200 xl:text-6xl"
        >
          Explore The Movie World
        </h1> */}
        {/* <div className="flex flex-col items-center justify-center gap-3 xl:gap-12 md:flex-row md:gap-4">
          <button className="button spacing bg-blue font w-[11rem] backdrop-blur">
            <span>Explore</span>
          </button>
          <button className="button spacing font w-[11rem] backdrop-blur bg-blue">
            <span>View Categories</span>
          </button>
        </div> */}
      </div>
    </div>
  );
}
