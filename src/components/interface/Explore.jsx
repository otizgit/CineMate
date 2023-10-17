import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function Explore() {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const exploreAnimation = useAnimation();

  useEffect(() => {
    if (inView) {
      exploreAnimation.start({
        x: 0,
        y: 0,
        transition: {
          type: "tween",
          duration: 0.5,
          bounce: 0.3,
        },
      });
    }
    if (!inView) {
      exploreAnimation.start({
        x: "-100%",
        y: 0,
      });
    }
  }, [inView]);

  return (
    <div ref={ref} className="background-style h-[35rem] md:h-[33rem] relative">
      <motion.div
        animate={exploreAnimation}
        className="padding pt-14 lg:absolute lg:top-[30%] lg:translate-y-[-50%] lg:pt-0"
      >
        <h1 className="text-white text-center lg:text-left font-bold font-heading md:text-[4rem] tracking-wide text-[2.3rem] leading-[1.3]">
          Explore Your <br /> Favorite
          <span>
            <Swiper
              className="h-[3rem] md:h-[4rem] md:inline-block ml-4 xl:ml-4"
              direction={"vertical"}
              modules={[Autoplay]}
              autoplay={{ delay: 3000 }}
            >
              <SwiperSlide className="text-primary font-heading md:text-[4rem] font-bold tracking-wide">
                Movies
              </SwiperSlide>
              <SwiperSlide className="text-primary font-heading md:text-[4rem] font-bold tracking-wide">
                TV Shows
              </SwiperSlide>
              <SwiperSlide className="text-primary font-heading md:text-[4rem] font-bold tracking-wide">
                Cast/Crew
              </SwiperSlide>
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
      </motion.div>
    </div>
  );
}
