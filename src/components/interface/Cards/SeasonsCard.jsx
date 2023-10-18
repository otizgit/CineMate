import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function SeasonsCard({ seasonArray, index }) {
  const { title, id } = useParams();

  return seasonArray.air_date ? (
    <motion.div
      initial={{
        opacity: 0,
        x: index % 2 === 0 ? 50 : -50,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        duration: 0.5,
      }}
    >
      <Link
        to={`/seasons/${seasonArray.season_number}/${
          seasonArray.episode_number ? seasonArray.episode_number : "season"
        }/${title}/${id}`}
        className="group border-2 rounded-xl custom-shadow overflow-hidden border-primary flex flex-col md:gap-0 md:flex-row md:w-[fit-content]"
      >
        {seasonArray.poster_path ? (
          <img
            className="md:w-[13rem] group-hover:scale-110 transition-all object-cover"
            src={`https://image.tmdb.org/t/p/w780${seasonArray.poster_path}`}
            alt="season poster"
          />
        ) : null}
        {seasonArray.still_path ? (
          <img
            className="w-full md:w-[13rem] object-cover group-hover:scale-110 transition-all"
            src={`https://image.tmdb.org/t/p/w780${seasonArray.still_path}`}
            alt="season poster"
          />
        ) : null}
        <div className="text-center pb-6 px-4 md:px-0 md:text-left md:pr-10 md:py-6 md:ml-10 pt-8">
          <h2 className="text-[1.4rem] font-heading tracking-wider text-white mb-2">
            {seasonArray.name}
          </h2>
          {seasonArray.air_date ? (
            <p className="custom-fz mb-2 text-primary font-semibold">
              Air Date:{" "}
              <span className="text-white font-normal">
                {seasonArray.air_date}
              </span>
            </p>
          ) : null}
          {seasonArray.episode_count ? (
            <p className="custom-fz mb-2 text-primary font-semibold">
              {seasonArray.episode_count} episodes
            </p>
          ) : null}

          {seasonArray.still_path ? (
            <div className="mb-4">
              <p className="custom-fz text-primary font-medium  inline-block mr-1 font-semisemibold">
                {seasonArray.season_number
                  ? "Season" + seasonArray.season_number + "-"
                  : "Specials,"}
              </p>
              <p className="custom-fz text-priText-300 font-medium inline-block font-semisemibold">
                Episode {seasonArray.episode_number}
              </p>
            </div>
          ) : null}
          {seasonArray.overview ? (
            <p className="text-priText-300 custom-fz leading-7 mb-4">
              {seasonArray.overview}
            </p>
          ) : null}
          <p className="custom-fz text-primary underline font-semibold">
            Click to view
          </p>
        </div>
      </Link>
    </motion.div>
  ) : null;
}
