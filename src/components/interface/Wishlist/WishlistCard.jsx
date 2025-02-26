import React from "react";
import { Link } from "react-router-dom";
import { faClapperboard, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const removeMovieFromWishlist = () => {
    const indexOfWishListMovie = wishList.findIndex(
      (movie) => movie.id === wishListItem.id
    );
    const slicedArray = wishList.splice(indexOfWishListMovie, 1);
    setWishList(slicedArray);

    localStorage.setItem("wishlist", JSON.stringify(wishList));
    setWishList(JSON.parse(localStorage.getItem("wishlist")));

    toast.success("Removed to Wishlist", {
      position: "bottom-right",
      style: {
        color: "white",
        fontWeight: 600,
      },
      autoClose: 2000,
    });
  };

  return (
    <div className="relative rounded-tr-xl rounded-tl-xl">
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
          <div className="group overflow-hidden">
            {wishListItem.poster === null ? (
              <div className="h-[15rem] lg:h-[10rem] md:h-[10rem] xl:h-[15rem] grid place-items-center">
                <FontAwesomeIcon
                  icon={faClapperboard}
                  className="text-primary text-[5rem]"
                />
                <p className="text-[red] text-[.85rem] font-semibold">
                  No Image Found
                </p>
              </div>
            ) : (
              <img
                loading="lazy"
                className="group-hover:scale-110 display-img transition-all w-full"
                src={`https://image.tmdb.org/t/p/w780${wishListItem.poster}`}
                alt="Movie Poster"
              />
            )}
          </div>
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
        onClick={removeMovieFromWishlist}
        className="absolute top-0 right-0 w-11 h-11 grid place-items-center bg-black rounded-bl-xl group"
      >
        <FontAwesomeIcon
          className="text-primary text-[1.1rem] group-hover:scale-110"
          icon={faHeart}
        />
        <span className="hidden lg:group-hover:block absolute -bottom-[4.5rem] bg-white px-4 py-1 z-10 custom-fz font-semibold rounded-xl">
          Remove from wishlist 
        </span>
      </button>
    </div>
  );
}
