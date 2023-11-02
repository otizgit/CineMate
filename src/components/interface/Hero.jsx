import React from "react";
import heroImages from "../../assets/data/heroImages";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { motion } from "framer-motion";

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
          pagination={{
            clickable: true,
          }}
          autoplay={{ delay: 8000 }}
          style={{
            "--swiper-navigation-color": "#29AB87",
            "--swiper-pagination-color": "#29AB87",
          }}
        >
          {heroImageElement}
        </Swiper>
      </div>
      <a href="#section">
        <div className="absolute bottom-[3rem] z-20 w-[35px] h-[60px] left-1/2 translate-x-[-50%] rounded-3xl border-2 border-primary flex justify-center items-start p-2 bg-black">
          <motion.div
            animate={{
              y: [0, 24, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-3 h-3 rounded-full bg-primary mb-1"
          ></motion.div>
        </div>
      </a>
    </div>
  );
}
