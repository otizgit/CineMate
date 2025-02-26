import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faStar as faStarSolid,
  faHeart as faHeartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import { fadeAnimation } from "../../../animations/Animations";
import TrailerOverlay from "../TrailerOverlay";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MovieDetails(props) {
  const trailerVideo = props.videos.filter((video) => {
    return video.name === "Official Trailer";
  });

  const [trailerOverlay, setTrailerOverlay] = useState(false);

  const [wishList, setWishList] = useState(
    JSON.parse(localStorage.getItem("wishlist"))
  );

  const [isMovieInWishlist, setMovieInWishlist] = useState(
    wishList.some((movie) => {
      return movie.title.includes(props.results.title || props.results.name);
    })
  );

  const addMovieToWishlist = () => {
    if (isMovieInWishlist) {
      const indexOfWishListMovie = wishList.findIndex(
        (movie) => movie === props.results.title || props.results.name
      );
      const slicedArray = wishList.splice(indexOfWishListMovie, 1);
      setWishList(slicedArray);

      localStorage.setItem("wishlist", JSON.stringify(wishList));

      setWishList(JSON.parse(localStorage.getItem("wishlist")));
      setMovieInWishlist(false);

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
          title: props.results.title || props.results.name,
          poster: props.results.poster_path,
          rating: props.results.vote_average,
          type: props.results.name ? "TV shows" : "Movies",
          link: props.results.name ? "tv_shows" : "movies",
          id: props.results.id,
          release_year: props.results.release_date
            ? props.results.release_date.slice(0, 4)
            : null,
        },
      ];

      localStorage.setItem("wishlist", JSON.stringify(prevWishListArray));

      setWishList(JSON.parse(localStorage.getItem("wishlist")));
      setMovieInWishlist(true);

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

  function toggleTrialerOverlay() {
    document.body.style.overflow = "hidden";
    setTrailerOverlay(true);
  }

  return (
    <div className="paddingX text-white mb-8 lg:mb-0 pt-5 lg:pt-0">
      <div className="flex items-center mb-5 lg:mb-4 flex-wrap gap-2">
        {props.results.title && (
          <motion.p
            variants={fadeAnimation}
            initial="init"
            animate="fade"
            custom={0}
            viewport={{
              once: true,
            }}
            className="text-[2.1rem] font-heading tracking-wider text-primary"
          >
            {`${props.results.title}`}
          </motion.p>
        )}
        {props.results.name && (
          <motion.p
            variants={fadeAnimation}
            initial="init"
            animate="fade"
            custom={0}
            viewport={{
              once: true,
            }}
            className="text-[2.1rem] font-heading tracking-wider text-primary"
          >
            {`${props.results.name}`}
          </motion.p>
        )}
        {props.results.release_date ? (
          <motion.p
            variants={fadeAnimation}
            initial="init"
            animate="fade"
            custom={0}
            viewport={{
              once: true,
            }}
            className="hidden md:block custom-fz font-medium text-white"
          >{`(${props.results.release_date.slice(0, 4)})`}</motion.p>
        ) : null}
      </div>

      <div className="flex flex-col md:flex-row mb-4 items-start md:gap-x-10 lg:justify-start lg:w-[fit-content] flex-wrap gap-x-4 lg:gap-x-4 gap-y-4">
        {props.imdbResults.Rated !== "N/A" && props.imdbResults.Rated ? (
          <motion.div
            variants={fadeAnimation}
            initial="init"
            animate="fade"
            custom={1}
            viewport={{
              once: true,
            }}
            className="border-2 bg-black px-2 w-[fit-content] border-priText-300 font-bold text-primary rounded-md custom-fz"
          >
            {props.imdbResults.Rated}
          </motion.div>
        ) : null}
        {props.results.runtime ? (
          <motion.div
            variants={fadeAnimation}
            initial="init"
            animate="fade"
            custom={1}
            viewport={{
              once: true,
            }}
            className="lg:border-r-2 lg:border-primary lg:pr-4"
          >
            <p className="custom-fz text-white-300 font-medium">
              <span className="md:hidden custom-fz text-primary font-medium tracking-wide">
                Runtime:
              </span>{" "}
              {props.results.runtime}mins
            </p>
          </motion.div>
        ) : null}
        {props.results.genres ? (
          <motion.div
            variants={fadeAnimation}
            initial="init"
            animate="fade"
            custom={1}
            viewport={{
              once: true,
            }}
            className="lg:border-r-2 lg:border-primary lg:pr-4"
          >
            <div className="flex flex-wrap">
              <span className="md:hidden custom-fz text-primary font-medium tracking-wide mr-1">
                Genre(s):
              </span>{" "}
              {props.results.genres.map((genre) => {
                return (
                  <p
                    key={genre.id}
                    className="list-style text-center custom-fz text-white-300 font-medium"
                  >
                    {genre.name}
                  </p>
                );
              })}
            </div>
          </motion.div>
        ) : null}
        {props.results.release_date ? (
          <motion.div
            variants={fadeAnimation}
            initial="init"
            animate="fade"
            custom={1}
            viewport={{
              once: true,
            }}
            className="lg:border-r-2 lg:border-primary lg:pr-4"
          >
            <p className="custom-fz text-white-300 font-medium">
              <span className="md:hidden custom-fz text-primary font-medium tracking-wide mr-1">
                Release Date:
              </span>
              {props.results.release_date}
            </p>
          </motion.div>
        ) : null}
        {props.results.production_countries ? (
          <motion.div
            variants={fadeAnimation}
            initial="init"
            animate="fade"
            custom={1}
            viewport={{
              once: true,
            }}
            className="flex items-center"
          >
            <span className="md:hidden custom-fz text-primary font-medium tracking-wide mr-1">
              Country:
            </span>{" "}
            <div className="flex flex-wrap gap-1 lg:gap-0">
              {props.results.production_countries.map((country, index) => {
                return (
                  <p
                    key={index}
                    className="list-style custom-fz text-white-300 font-medium"
                  >
                    {country.name}
                  </p>
                );
              })}
            </div>
          </motion.div>
        ) : null}
      </div>

      {props.imdbResults.Ratings && (
        <div
          className={`mb-4 flex flex-wrap ${
            props.imdbResults.Ratings.length > 2 &&
            "justify-between lg:justify-start"
          } gap-7 lg:gap-10`}
        >
          {props.imdbResults.Ratings.map((rating, index) => {
            return (
              <motion.div
                variants={fadeAnimation}
                initial="init"
                animate="fade"
                custom={index + 2}
                viewport={{
                  once: true,
                }}
                key={index}
              >
                {rating.Source === "Internet Movie Database" ? (
                  <p className="custom-fz tracking-wider text-center font-semibold">
                    IMDb
                  </p>
                ) : (
                  <p className="custom-fz tracking-wider text-center font-semibold">
                    {rating.Source}
                  </p>
                )}
                <div className="flex justify-center items-center gap-1">
                  <FontAwesomeIcon
                    icon={faStarSolid}
                    className="text-[gold] custom-fz pb-1"
                  />
                  <p className="custom-fz text-primary font-bold">
                    {rating.Value}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {props.results.tagline ? (
        <motion.div
          variants={fadeAnimation}
          initial="init"
          animate="fade"
          custom={4}
          viewport={{
            once: true,
          }}
          className="mb-3"
        >
          <p className="custom-fz italic custom-fz font-medium text-priText-300">
            {props.results.tagline}
          </p>
        </motion.div>
      ) : null}

      <div className="mb-4">
        {props.results.overview ? (
          <motion.p
            variants={fadeAnimation}
            initial="init"
            animate="fade"
            custom={5}
            viewport={{
              once: true,
            }}
            className="custom-fz text-white leading-7"
          >
            {props.results.overview}
          </motion.p>
        ) : null}
      </div>

      <div>
        <div className="lg:flex gap-10 mb-4 lg:mb-0">
          {props.imdbResults.Writer !== "N/A" && props.imdbResults.Writer ? (
            <motion.div
              variants={fadeAnimation}
              initial="init"
              animate="fade"
              custom={6}
              viewport={{
                once: true,
              }}
              className="mb-4"
            >
              <p className="custom-fz font-semibold">
                {props.imdbResults.Writer}
              </p>
              <p className="custom-fz text-primary font-medium">Writer(s)</p>
            </motion.div>
          ) : null}
          {props.imdbResults.Director !== "N/A" && props.imdbResults.Writer ? (
            <motion.div
              variants={fadeAnimation}
              initial="init"
              animate="fade"
              custom={7}
              viewport={{
                once: true,
              }}
            >
              <p className="custom-fz font-semibold">
                {props.imdbResults.Director}
              </p>
              <p className="custom-fz text-primary font-medium">Director</p>
            </motion.div>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-3 lg:pb-0">
          {trailerVideo.length ? (
            <motion.button
              onClick={toggleTrialerOverlay}
              variants={fadeAnimation}
              initial="init"
              animate="fade"
              custom={8}
              viewport={{
                once: true,
              }}
              whileHover={{
                scale: 1.1,
              }}
              className="text-primary inline font-bold custom-fz"
            >
              <FontAwesomeIcon className="text-[1rem] mr-1" icon={faPlay} />
              Watch Trailer
            </motion.button>
          ) : null}
          <motion.button
            onClick={addMovieToWishlist}
            variants={fadeAnimation}
            initial="init"
            animate="fade"
            custom={9}
            viewport={{
              once: true,
            }}
            whileHover={{
              scale: 1.1,
            }}
            className={`${
              trailerVideo.length ? "" : "mb-5 lg:mb-0"
            } flex items-center gap-1`}
          >
            <FontAwesomeIcon
              className=" text-primary mb-[0.2rem]"
              icon={isMovieInWishlist ? faHeartSolid : faHeart}
            />
            <p className="custom-fz text-primary font-bold">
              {isMovieInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            </p>
          </motion.button>
        </div>
        {trailerOverlay && (
          <TrailerOverlay
            setTrailerOverlay={setTrailerOverlay}
            trailerVideo={trailerVideo}
          />
        )}
      </div>
    </div>
  );
}
