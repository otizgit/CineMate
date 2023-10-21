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
    </div>
  );
}
