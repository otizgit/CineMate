import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function MovieDetails(props) {
  return (
    <div className="padding text-white mb-5 lg:mb-0">
      <div className="flex items-center mb-2 lg:mb-0 flex-wrap gap-2">
        {props.results.title && (
          <p className="text-[2.1rem] font-sans text-white">
            {`${props.results.title}`}
          </p>
        )}
        {props.results.name && (
          <p className="text-[2.1rem] font-sans text-white">
            {`${props.results.name}`}
          </p>
        )}
        {props.results.release_date ? (
          <p className="custom-fz font-bold font-custom text-primary">{`(${props.results.release_date.slice(
            0,
            4
          )})`}</p>
        ) : null}
      </div>

      <div className="flex mb-4 items-start md:justify-between lg:justify-start lg:w-[fit-content] flex-wrap gap-x-4 gap-y-4">
        {props.imdbResults.Rated !== "N/A" && props.imdbResults.Rated ? (
          <div className="border-2 bg-black px-2 w-[fit-content] border-priText-300 font-bold text-primary rounded-md custom-fz">
            {props.imdbResults.Rated}
          </div>
        ) : null}
        {props.results.runtime ? (
          <div className="lg:border-r-2 lg:border-primary lg:pr-4">
            <p className="custom-fz text-white-300">
              {props.results.runtime}mins
            </p>
          </div>
        ) : null}
        {props.results.genres ? (
          <div className="lg:border-r-2 lg:border-primary lg:pr-4"> 
            <div className="flex">
              {props.results.genres.map((genre) => {
                return (
                  <p
                    key={genre.id}
                    className="list-style text-center custom-fz text-white-300"
                  >
                    {genre.name}
                  </p>
                );
              })}
            </div>
          </div>
        ) : null}
        {props.results.release_date ? (
          <div className="lg:border-r-2 lg:border-primary lg:pr-4">
            <p className="custom-fz text-white-300">
              {props.results.release_date}
            </p>
          </div>
        ) : null}
        {props.results.production_countries ? (
          <div className="flex">
            {props.results.production_countries.map((country, index) => {
              return (
                <p key={index} className="list-style custom-fz text-white-300">
                  {country.name}
                </p>
              );
            })}
          </div>
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
              <div key={index}>
                {rating.Source === "Internet Movie Database" ? (
                  <p className="custom-fz tracking-wide text-center font-extrabold">
                    IMDb
                  </p>
                ) : (
                  <p className="custom-fz tracking-wide text-center font-extrabold">
                    {rating.Source}
                  </p>
                )}
                <div className="flex justify-center items-center gap-1">
                  <FontAwesomeIcon icon={faStar} className="text-[gold]" />
                  <p className="custom-fz text-primary font-bold">
                    {rating.Value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {props.results.tagline ? (
        <div className="mb-2">
          <p className="custom-fz italic custom-fz font-bold text-priText-300">
            {props.results.tagline}
          </p>
        </div>
      ) : null}

      <div className="mb-4">
        {props.results.overview ? (
          <p className="custom-fz text-white leading-7">
            {props.results.overview}
          </p>
        ) : null}
      </div>

      <div className="lg:flex gap-10 border-primary border-b-2 lg:border-none lg:pb-0 pb-5">
        {props.imdbResults.Writer !== "N/A" && props.imdbResults.Writer ? (
          <div className="mb-5">
            <p className="custom-fz font-bold">{props.imdbResults.Writer}</p>
            <p className="custom-fz text-primary font-semibold">Writer(s)</p>
          </div>
        ) : null}
        {props.imdbResults.Director !== "N/A" && props.imdbResults.Writer ? (
          <div>
            <p className="custom-fz font-bold">{props.imdbResults.Director}</p>
            <p className="custom-fz text-primary font-semibold">Director</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
