import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClapperboard, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Card(props) {
  const ratingPercentage = Math.ceil((props.data.vote_average / 10) * 100);
  const [cardTitle, setCardTitle] = useState(null);
  const [cardDate, setCardDate] = useState(null);
  const [cardRole, setCardRole] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [originCountry, setOriginCountry] = useState(null);
  const [errorPhoto, setErrorPhoto] = useState(faClapperboard);
  const [searchTrigger, setSearchTrigger] = useState(false);

  let percentageColor;
  if (ratingPercentage >= 70) {
    percentageColor = "green";
  } else if (ratingPercentage < 70 && ratingPercentage >= 40) {
    percentageColor = "yellow";
  } else if (ratingPercentage < 40) {
    percentageColor = "red";
  }

  function toggleSearchTrigger() {
    setSearchTrigger((prevTrigger) => !prevTrigger);
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
    <Link
      onClick={toggleSearchTrigger}
      to={`/${props.keyword}/${cardTitle}/${props.data.id}`}
      state={{
        releaseYear: props.data.release_year
          ? props.data.release_date.slice(0, 4)
          : null,
        trigger: {searchTrigger}
      }}
      className="cursor-pointer border-0 w-full group"
    >
      {photo ? (
        <div className="rounded-tr-xl rounded-tl-xl overflow-hidden">
          {props.data.poster_path && (
            <img
              className="group-hover:scale-110 display-img transition-all w-full"
              src={`https://image.tmdb.org/t/p/w300${photo}`}
              alt="Movie Poster"
            />
          )}
          {props.data.logo_path && (
            <img
              className="display-img group-hover:scale-110 transition-all w-full"
              src={`https://image.tmdb.org/t/p/w300${photo}`}
              alt="logo image"
            />
          )}
          {props.data.profile_path && (
            <img
              className="display-img group-hover:scale-110 h-[300px] w-full mx-auto object-cover transition-all"
              src={`https://image.tmdb.org/t/p/w300${photo}`}
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
          <p className="text-red-600 text-[.85rem] font-semibold font-custom">
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
              className="h-full font-custom text-[.4rem] text-white font-extrabold text-center"
            ></div>
          </div>
        )}
      </div>
      <p
        className="mb-[3px] text-white text-[1.2rem] font-custom md:text-base font-medium text-center"
      >
        {cardTitle}
      </p>
      <p className="custom-fz lg:text-[.8rem] text-primary font-custom font-bold text-center">
        {cardDate}
        {cardRole}
        {(originCountry && !cardDate) && `Origin Country: ${originCountry}`}
      </p>
      {props.data.character && (
        <p className="custom-fz lg:text-[.8rem] text-priText-300 font-custom font-semibold text-center">
          as {props.data.character}
        </p>
      )}
      {props.data.department && (
        <p className="custom-fz lg:text-[.8rem] text-priText-300 font-custom font-semibold text-center">
          as {props.data.job}
        </p>
      )}
    </Link>
  );
}
