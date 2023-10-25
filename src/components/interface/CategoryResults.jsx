import React from "react";
import Card from "./Cards/Card";
import "swiper/css";
import "swiper/css/navigation";
import { nanoid } from "nanoid";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function CategoryResults(props) {
  const settings = {
    dots: false,
    infinite: false,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    dots: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          dots: false,
        },
      },
    ],
  };

  const renderedResults = props.feedback.map((data) => {
    return (
      <div key={nanoid()}>
        <Card
          setResultsLoad={props.setResultsLoad}
          keyword={props.apiKeyword}
          data={data}
        />
      </div>
    );
  });

  return (
    <div>
      {props.feedback.length ? (
        <div className="padding w-[90%] lg:w-[100%] mx-auto">
          <Slider key={nanoid()} {...settings}>{renderedResults}</Slider>
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
