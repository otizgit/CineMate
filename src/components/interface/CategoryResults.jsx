import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (windowWidthSize < 600) {
      setInnerWidth(1);
    } else if (windowWidthSize >= 600 && windowWidthSize < 1000) {
      setInnerWidth(2);
    } else if (windowWidthSize > 1000 && windowWidthSize < 1280) {
      setInnerWidth(3);
    } else {
      setInnerWidth(5);
    }
  }, [windowWidthSize]);

  const renderedResults = props.feedback.map((data) => {
    return (
      <SwiperSlide key={nanoid()}>
        <Card keyword={props.apiKeyword} data={data} />
        <div className="swiper-lazy-  preloader swiper-lazy-prelroader-white"></div>
      </SwiperSlide>
    );
  });

  return (
    <div>
      {props.feedback.length ? (
        <div className="padding">
          <Swiper
            slidesPerView={innerWidth}
            spaceBetween={30}
            modules={[Navigation]}
            navigation
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
