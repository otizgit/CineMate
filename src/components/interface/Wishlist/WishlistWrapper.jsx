import React from "react";
import WishlistCard from "./WishlistCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function WishlistWrapper({
  wishlistItems,
  category,
  wishList,
  setWishList,
}) {
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
          initialSlide: 0,
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

  const renderedResults = wishlistItems.map((items, index) => {
    return (
      <div key={index}>
        <WishlistCard
          wishListItem={items}
          wishList={wishList}
          setWishList={setWishList}
        />
      </div>
    );
  });

  return (
    <div className="w-[90%] lg:w-[100%] mx-auto margin">
      {wishList.length ? (
        <div>
          <Slider {...settings}>{renderedResults}</Slider>
        </div>
      ) : (
        <p className="text-[red] custom-fz text-center font-semibold">{`You don't have any ${
          category === "Movies" ? "movie" : "TV show"
        } in your wishlist yet`}</p>
      )}
    </div>
  );
}
