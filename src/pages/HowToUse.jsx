import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { headingAnimation } from "../animations/Animations";
import howToUseImages from "../assets/data/howToUseImages";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

export default function HowToUse() {
  useEffect(() => {
    document.title = `CineMate | How To Use`;
    window.scrollTo(0, 0);
  });

  const stepsElement = howToUseImages.map((data) => {
    return (
      <SwiperSlide key={data.desktopUrl} className="grid place-items-center">
        <picture>
          <source media="(max-width: 1025px)" srcSet={data.mobileUrl} />
          <img src={data.desktopUrl} alt="steps image" />
        </picture>
        <div className="swiper-lazy-preloader swiper-lazy-preloader-teal"></div>
        <div className="hidden lg:block pb-10 pt-3 px-3 w-full">
          <p className="text-primary text-center font-handWriting text-[1rem] tracking-wide">
            {data.desktopContent}
          </p>
        </div>
        <div className="lg:hidden block pb-10 px-3 pt-3 w-full">
          <p className="text-primary text-center font-handWriting text-[1rem] tracking-wide">
            {data.desktopContent}
          </p>
        </div>
      </SwiperSlide>
    );
  });

  return (
    <div className="pt-[76px] overflow-x-hidden">
      <div className="h-[120px] lg:h-[150px] header-img-style pt-9 border-b-2 border-primary movie-margin">
        <motion.h1
          variants={headingAnimation}
          initial="init"
          whileInView="animate"
          className="text-[2rem] font-heading tracking-wider text-primary text-center lg:text-[2.5rem]"
        >
          HOW TO USE CINEMATE
        </motion.h1>
      </div>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={true}
        autoplay={{ delay: 5000 }}
        modules={[EffectCube, Pagination, Autoplay]}
        lazy="true"
        className="margin padding lg:w-[85%]"
        style={{
          "--swiper-navigation-color": "#29AB87",
          "--swiper-pagination-color": "#29AB87",
        }}
      >
        {stepsElement}
      </Swiper>
    </div>
  );
}
