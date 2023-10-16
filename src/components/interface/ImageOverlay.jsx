import React from "react";
import { nanoid } from "nanoid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function ImageOverlay({ images, setOverlay }) {
  function hideOverlay() {
    document.body.style.overflowY = "scroll";
    setOverlay(false);
  }

  return (
    <div className="fixed inset-0 w-full h-full z-[10000] padding overflow-y-auto pb-10">
      <div
        onClick={hideOverlay}
        className="absolute w-full h-full left-0 header-style"
      ></div>
      <Swiper
        spaceBetween={30}
        modules={[Navigation]}
        slidesPerView={1}
        navigation
        className="w-[90%] md:w-[70%] lg:w-[55%] absolute inset-0 m-auto z-[12000]"
      >
        {images.map((imgs) => {
          return (
            <SwiperSlide
              key={nanoid()}
              className="grid place-items-center z-[12000]"
            >
              <img
                className="w-full object-cover rounded-xl md:w-[250px] lg:w-[300px]"
                src={`https://image.tmdb.org/t/p/w780${imgs.file_path}`}
                alt="movie images"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
