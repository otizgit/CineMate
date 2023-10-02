import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function SeasonsCard({ seasonArray }) {
  const {title, id} = useParams()

  return seasonArray.air_date ? (
    <Link
    to={`/seasons/${seasonArray.season_number ? seasonArray.season_number :  seasonArray.name}/${title}/${id}`}
     className="group border-2 rounded-xl custom-shadow overflow-hidden border-primary flex flex-col md:gap-0 md:flex-row md:w-[fit-content]">
      {seasonArray.poster_path ? (
        <img
          className="md:w-[13rem] group-hover:scale-110 transition-all object-cover"
          src={`https://image.tmdb.org/t/p/w780${seasonArray.poster_path}`}
          alt="season poster"
        />
      ) : null}
      {seasonArray.still_path ? (
        <img
          className="md:w-[13rem] object-cover"
          src={`https://image.tmdb.org/t/p/w780${seasonArray.still_path}`}
          alt="season poster"
        />
      ) : null}
      <div className="text-center pb-6 px-4 md:px-0 md:text-left md:pr-10 md:py-6 lg:ml-10 pt-8">
        <h2 className="font-sans text-[1.5rem] text-white tracking-wide">
          {seasonArray.name}
        </h2>
        {seasonArray.air_date ? (
          <p className="custom-fz mb-2 text-primary font-bold">
            Air Date:{" "}
            <span className="text-white font-normal">
              {seasonArray.air_date}
            </span>
          </p>
        ) : null}
        {seasonArray.episode_count ? (
          <p className="custom-fz mb-2 text-primary font-bold">
            {seasonArray.episode_count} episodes
          </p>
        ) : null}

        {seasonArray.still_path ? (
          <div className="mb-4">
            <p className="custom-fz text-primary inline-block mr-1 font-semibold">
              Season {seasonArray.season_number},
            </p>
            <p className="custom-fz text-primary inline-block font-semibold">
              Episode {seasonArray.episode_number}
            </p>
          </div>
        ) : null}
        {seasonArray.overview ? (
          <p className="text-priText-300 custom-fz leading-7 mb-4">
            {seasonArray.overview}
          </p>
        ) : null}
        <p className="custom-fz text-primary underline font-bold">Click to view</p>
      </div>
    </Link>
  ) : null;
}
