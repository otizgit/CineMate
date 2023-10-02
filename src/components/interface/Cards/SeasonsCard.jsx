import React from "react";

export default function SeasonsCard({ seasonArray }) {
  return (
    <div className="border-2 rounded-xl custom-shadow overflow-hidden border-primary flex flex-col md:gap-0 md:flex-row md:w-[fit-content]">
      {seasonArray.poster_path && (
        <img
          className="md:w-[13rem] object-cover"
          src={`https://image.tmdb.org/t/p/w780${seasonArray.poster_path}`}
          alt="season poster"
        />
      )}
      {seasonArray.still_path && (
        <img
          className="md:w-[13rem] object-cover"
          src={`https://image.tmdb.org/t/p/w780${seasonArray.still_path}`}
          alt="season poster"
        />
      )}
      <div className="text-center pb-6 px-4 md:px-0 md:text-left md:pr-10 md:py-6 lg:ml-10 pt-10">
        <h2 className="font-sans text-[1.5rem] text-white tracking-wide">
          {seasonArray.name}
        </h2>
        {seasonArray.air_date && (
          <p className="custom-fz mb-2 text-primary font-bold">
            Air Date:{" "}
            <span className="text-white font-normal">
              {seasonArray.air_date}
            </span>
          </p>
        )}
        {seasonArray.episode_count && (
          <p className="custom-fz mb-2 text-primary font-bold">
            {seasonArray.episode_count} episodes
          </p>
        )}

        {seasonArray.still_path && (
          <div className="mb-2">
            <p className="custom-fz text-primary inline-block mr-1">
              Season {seasonArray.season_number},
            </p>
            <p className="custom-fz text-primary inline-block">
              Episode {seasonArray.episode_number}
            </p>
          </div>
        )}
        {seasonArray.overview && (
          <p className="text-priText-300 custom-fz leading-7">
            {seasonArray.overview}
          </p>
        )}
        {seasonArray.air_date === null && (
          <p className="text-primary text-center custom-fz leading-7">
            Airing Soon...
          </p>
        )}
      </div>
    </div>
  );
}
