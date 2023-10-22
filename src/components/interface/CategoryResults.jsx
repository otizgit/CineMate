import React, { useEffect, useState, useRef } from "react";
import Card from "./Cards/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { nanoid } from "nanoid";
import { useWindowSize } from "@uidotdev/usehooks";

export default function CategoryResults(props) {
  const [innerWidth, setInnerWidth] = useState(null);
  const windowWidthSize = useWindowSize().width;
  const swiperRef = useRef(null);

  // useEffect(() => {
  //   if (windowWidthSize < 600) {
  //     setInnerWidth(1);
  //   } else if (windowWidthSize >= 600 && windowWidthSize < 1000) {
  //     setInnerWidth(2);
  //   } else if (windowWidthSize > 1000 && windowWidthSize < 1280) {
  //     setInnerWidth(3);
  //   } else {
  //     setInnerWidth(5);
  //   }
  // }, [windowWidthSize]);

  useEffect(() => {
    if (props.feedback.length) {
      swiperRef.current.swiper.slideTo(0);
    }
  });

  useEffect(() => {
    swiperRef.current.swiper.shouldSwiperUpdate = false;
  }, [])

  const renderedResults = props.feedback.map((data) => {
    return (
      <SwiperSlide key={nanoid()}>
        <Card
          setResultsLoad={props.setResultsLoad}
          keyword={props.apiKeyword}
          data={data}
        />
        {data.poster_path || data.profile_path || data.logo_path ? (
          <div className="swiper-lazy-preloader swiper-lazy-preloader-teal"></div>
        ) : null}
      </SwiperSlide>
    );
  });

  return (
    <div>
      {props.feedback.length ? (
        <div className="padding">
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            modules={[Navigation]}
            navigation
            lazy="true"
            ref={swiperRef}
            style={{
              '--swiper-navigation-color': '#29AB87',
            }}
          >
            {renderedResults}
          </Swiper>
        </div>
      ) : (
        <div className="margin">
          <h1 className="text-center text-[red] font-bold tracking-wide">
            Oops, No Match Found.
          </h1>
        </div>
      )}
    </div>
  );
}
