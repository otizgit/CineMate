import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClapperboard,
  faUser,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarReg } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Card(props) {
  const ratingPercentage = Math.ceil((props.data.vote_average / 10) * 100);
  const [cardTitle, setCardTitle] = useState(null);
  const [cardDate, setCardDate] = useState(null);
  const [cardRole, setCardRole] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [originCountry, setOriginCountry] = useState(null);
  const [errorPhoto, setErrorPhoto] = useState(faClapperboard);

  const [wishList, setWishList] = useState(
    JSON.parse(localStorage.getItem("wishlist"))
  );

  const [isMovieInWishlist, setMovieInWishList] = useState(
    wishList.some((movie) => movie.id === props.data.id)
  );

  useEffect(() => {}, [wishList]);

  const toggleWishListButton = () => {
    if (isMovieInWishlist) {
      const indexOfWishListMovie = wishList.findIndex(
        (movie) => movie === props.data.title || props.data.name
      );
      const slicedArray = wishList.splice(indexOfWishListMovie, 1);
      setWishList(slicedArray);

      localStorage.setItem("wishlist", JSON.stringify(wishList));

      setWishList(JSON.parse(localStorage.getItem("wishlist")));
      setMovieInWishList(false);

      toast.success("Removed from Wishlist", {
        position: "bottom-right",
        style: {
          color: "white",
          fontWeight: 600,
        },
        autoClose: 2000,
      });
    } else {
      const prevWishListArray = [
        ...JSON.parse(localStorage.getItem("wishlist")),
        {
          title: props.data.title || props.data.name,
          poster: props.data.poster_path,
          rating: props.data.vote_average,
          type: props.data.name ? "TV shows" : "Movies",
          link: props.data.name ? "tv_shows" : "movies",
          id: props.data.id,
          release_year: props.data.release_date
            ? props.data.release_date.slice(0, 4)
            : null,
        },
      ];

      localStorage.setItem("wishlist", JSON.stringify(prevWishListArray));

      setWishList(JSON.parse(localStorage.getItem("wishlist")));
      setMovieInWishList(true);

      toast.success("Added to Wishlist", {
        position: "bottom-right",
        style: {
          color: "white",
          fontWeight: 600,
        },
        autoClose: 2000,
      });
    }
  };

  let percentageColor;
  if (ratingPercentage >= 70) {
    percentageColor = "green";
  } else if (ratingPercentage < 70 && ratingPercentage >= 40) {
    percentageColor = "yellow";
  } else if (ratingPercentage < 40) {
    percentageColor = "red";
  }

  function toggleSearchTrigger() {
    if (props.setResultsLoad) {
      props.setResultsLoad(false);
    }
  }

  function HandleCardDisplay() {
    if (props.data.title) {
      setCardTitle(props.data.title);
    } else if (props.data.name) {
      setCardTitle(props.data.name);
    }
    if (props.data.first_air_date) {
      setCardDate(props.data.first_air_date);
    } else if (props.data.release_date) {
      setCardDate(props.data.release_date);
    }
    if (props.data.known_for_department && !props.data.character) {
      setCardRole(`Role: ${props.data.known_for_department}`);
    }
    if (props.data.poster_path) {
      setPhoto(props.data.poster_path);
    } else if (props.data.profile_path) {
      setPhoto(props.data.profile_path);
    } else if (props.data.logo_path) {
      setPhoto(props.data.logo_path);
    }
    if (props.data.profile_path === null) {
      setErrorPhoto(faUser);
    }
    if (props.data.origin_country) {
      setOriginCountry(props.data.origin_country);
    }
  }

  useEffect(() => {
    HandleCardDisplay();
  }, []);

  return (
    <div className="relative">
      <Link
        onClick={toggleSearchTrigger}
        to={`/${props.keyword}/${cardTitle}/${props.data.id}`}
        state={{
          releaseYear: props.data.release_year
            ? props.data.release_date.slice(0, 4)
            : null,
        }}
        className="cursor-pointer border-0 w-full group"
      >
        {photo ? (
          <div className="rounded-tr-xl rounded-tl-xl overflow-hidden">
            {props.data.poster_path && (
              <img
                loading="lazy"
                className="group-hover:scale-110 display-img transition-all w-full"
                src={`https://image.tmdb.org/t/p/w780${photo}`}
                alt="Movie Poster"
              />
            )}
            {props.data.logo_path && (
              <img
                loading="lazy"
                className="display-img group-hover:scale-110 transition-all w-full"
                src={`https://image.tmdb.org/t/p/w780${photo}`}
                alt="logo image"
              />
            )}
            {props.data.profile_path && (
              <img
                loading="lazy"
                className="display-img group-hover:scale-110 h-[280px] w-full mx-auto object-cover transition-all"
                src={`https://image.tmdb.org/t/p/w780${photo}`}
                alt="Profile Image"
              />
            )}
          </div>
        ) : (
          <div className="h-[15rem] lg:h-[10rem] md:h-[10rem] xl:h-[10rem] grid place-items-center">
            <FontAwesomeIcon
              icon={errorPhoto}
              className="text-primary text-[5rem]"
            />
            <p className="text-[red] text-[.85rem] font-semibold">
              No Image Found
            </p>
          </div>
        )}
        <div className="mb-4">
          {cardDate && (
            <div className="h-1 bg-black">
              <div
                style={{
                  width: `${ratingPercentage}%`,
                  background: percentageColor,
                }}
                className="h-full text-[.4rem] text-white font-extrabold text-center"
              ></div>
            </div>
          )}
        </div>
        <p className="text-white text-[1rem] md:text-[0.9rem] font-medium text-center">
          {cardTitle}
        </p>
        <p className="custom-fz lg:text-[.8rem] text-primary font-semibold text-center">
          {cardDate}
          {cardRole}
          {originCountry && !cardDate && `Origin Country: ${originCountry}`}
        </p>
        {props.data.character && (
          <p className="custom-fz lg:text-[.8rem] text-priText-300 font-semibold text-center">
            as {props.data.character}
          </p>
        )}
        {props.data.department && (
          <p className="custom-fz lg:text-[.8rem] text-priText-300 font-semibold text-center">
            as {props.data.job}
          </p>
        )}
      </Link>
      <button
        onClick={toggleWishListButton}
        className="absolute top-0 right-0 w-11 h-11 grid place-items-center bg-black rounded-bl-xl group"
      >
        <FontAwesomeIcon
          className="text-primary text-[1.1rem] group-hover:scale-110"
          icon={!isMovieInWishlist ? faStarReg : faStar}
        />
      </button>
    </div>
  );
}
