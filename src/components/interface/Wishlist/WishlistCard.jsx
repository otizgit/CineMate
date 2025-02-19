import React from "react";
import { Link } from "react-router-dom";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function WishlistCard({ wishListItem, wishList, setWishList }) {
  const ratingPercentage = Math.ceil((wishListItem.rating / 10) * 100);

  let percentageColor;
  if (ratingPercentage >= 70) {
    percentageColor = "green";
  } else if (ratingPercentage < 70 && ratingPercentage >= 40) {
    percentageColor = "yellow";
  } else if (ratingPercentage < 40) {
    percentageColor = "red";
  }

  const removeMovieFromWislist = () => {
    const indexOfWishListMovie = wishList.findIndex(
      (movie) => movie.id === wishListItem.id
    );
    console.log(indexOfWishListMovie);

    const slicedArray = wishList.splice(indexOfWishListMovie, 1);

    console.log(slicedArray);

    setWishList(slicedArray);

    localStorage.setItem("wishlist", JSON.stringify(wishList));
    setWishList(JSON.parse(localStorage.getItem("wishlist")));
  };

  return (
    <div className="relative rounded-tr-xl rounded-tl-xl overflow-hidden">
      <Link
        to={
          wishListItem.link === "movies"
            ? `/movie/${wishListItem.title}/${wishListItem.id}`
            : `/tv/${wishListItem.title}/${wishListItem.id}`
        }
        state={{
          releaseYear: wishListItem.release_year
            ? wishListItem.relase_year
            : null,
        }}
      >
        <div>
          <img
            loading="lazy"
            className="group-hover:scale-110 display-img transition-all w-full"
            src={`https://image.tmdb.org/t/p/w780${wishListItem.poster}`}
            alt="Movie Poster"
          />
          <div className="h-1 bg-black mb-4">
            <div
              style={{
                width: `${ratingPercentage}%`,
                background: percentageColor,
              }}
              className="h-full text-[.4rem] text-white font-extrabold text-center"
            ></div>
          </div>
        </div>
        <p className="text-white text-[1rem] md:text-[0.9rem] font-medium text-center mb-4">
          {wishListItem.title}
        </p>
      </Link>
      <button
        onClick={removeMovieFromWislist}
        className="absolute top-0 right-0 p-3 bg-black rounded-bl-xl group"
      >
        <FontAwesomeIcon
          className="text-primary text-[1.1rem] group-hover:scale-110"
          icon={faStar}
        />
      </button>
    </div>
  );
}
