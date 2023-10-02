import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "boxicons";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";

export default function Explore() {
  return (
    <div className="background-style h-[35rem] md:h-[33rem] relative">
      <div className="padding pt-14 lg:absolute lg:top-[50%] lg:translate-y-[-50%] lg:pt-0">
        <h1 className="text-white text-center lg:text-left font-comic md:text-[3.5rem] text-[2.3rem] leading-[1.3]">
          Explore Your <br /> Favorite
          <span>
            <Swiper
              className="h-[3rem] md:h-[3.7rem] md:inline-block ml-4 xl:ml-4"
              direction={"vertical"}
              modules={[Autoplay]}
              autoplay={{ delay: 3000 }}
            >
              <SwiperSlide className="text-primary font-comic">Movies</SwiperSlide>
              <SwiperSlide className="text-primary font-comic">TV Shows</SwiperSlide>
              <SwiperSlide className="text-primary font-comic">Cast/Crew</SwiperSlide>
            </Swiper>
          </span>
        </h1>
        {/* <div className="flex justify-center md:block">
          <button className="flex justify-center text-[.8rem] font-custom items-center gap-1 button spacing rounded-[3rem] text-base w-[11rem] backdrop-blur">
            Search Now
            <span className="mt-2">
              <box-icon name="search-alt" color="#29AB87"></box-icon>
            </span>
          </button>
        </div> */}
      </div>
    </div>
  );
}
