import React from "react";
import { nanoid } from "nanoid";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import { bopAnimation } from "../../animations/Animations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

export default function ImageOverlay({ images, setOverlay }) {
  function hideOverlay() {
    document.body.style.overflowY = "scroll";
    setOverlay(false);
  }

  return (
    <motion.div
      variants={bopAnimation}
      initial="init"
      animate="bop"
      className="fixed inset-0 w-full h-full z-[10000] padding overflow-y-auto pb-10"
    >
      <div className="padding absolute z-[14000] pt-7 mb-4 w-full right-0 flex justify-end">
        <FontAwesomeIcon
          onClick={hideOverlay}
          icon={faX}
          className="text-[red] text-[1.5rem] cursor-pointer hover:scale-110 transition-all"
        />
      </div>

      <div
        onClick={hideOverlay}
        className="absolute w-full h-full left-0 header-style"
      ></div>
      <Swiper
        spaceBetween={30}
        modules={[Navigation]}
        slidesPerView={1}
        navigation
        className="w-[90%] md:w-[70%] lg:w-[55%] absolute inset-0 m-auto z-[12000] h-[fit-content] padding"
        style={{
          "--swiper-navigation-color": "#29AB87",
        }}
      >
        {images.map((imgs) => {
          return (
            <SwiperSlide
              key={nanoid()}
              className="grid place-items-center z-[12000]"
              lazy="true"
            >
              <img
                className="w-full object-cover rounded-xl md:w-[250px] lg:w-[300px]"
                src={`https://image.tmdb.org/t/p/w780${imgs.file_path}`}
                alt="movie images"
              />
              <div className="swiper-lazy-preloader swiper-lazy-preloader-teal"></div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </motion.div>
  );
}
