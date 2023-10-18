import React from "react";
import { motion } from "framer-motion";
import { fadeAnimation } from "../../../animations/Animations";

export default function MovieInfo(props) {
  return (
    <motion.div
      variants={fadeAnimation}
      initial="init"
      whileInView="fade"
      custom={0}
      className="border-primary border-b-2 lg:border-0 pb-5 custom-fz flex flex-wrap lg:gap-y-7 mb-10 gap-x-10 gap-y-4"
    >
      {props.results.status ? (
        <div className="flex items-center">
          <div className="w-[8px] hidden md:block rounded-full mr-1 h-[8px] bg-primary"></div>
          <p className="text-primary font-semibold">
            Status:{" "}
            <span className="text-white font-normal">
              {props.results.status}
            </span>
          </p>
        </div>
      ) : null}
      {props.results.first_air_date ? (
        <div className="flex items-center">
          <div className="w-[8px] hidden md:block rounded-full mr-1 h-[8px] bg-primary"></div>
          <p className="text-primary font-semibold">
            First Air Date:{" "}
            <span className="text-white font-normal">
              {props.results.first_air_date}
            </span>
          </p>
        </div>
      ) : null}
      {props.results.last_air_date ? (
        <div className="flex items-center">
          <div className="w-[8px] hidden md:block rounded-full mr-1 h-[8px] bg-primary"></div>
          <p className="text-primary font-semibold">
            Last Air Date:{" "}
            <span className="text-white font-normal">
              {props.results.last_air_date}
            </span>
          </p>
        </div>
      ) : null}
      {props.results.number_of_seasons ? (
        <div className="flex items-center">
          <div className="w-[8px] hidden md:block rounded-full mr-1 h-[8px] bg-primary"></div>
          <p className="text-primary font-semibold">
            Number Of Seasons:{" "}
            <span className="text-white font-normal">
              {props.results.number_of_seasons}
            </span>
          </p>
        </div>
      ) : null}
      {props.results.number_of_episodes ? (
        <div className="flex items-center">
          <div className="w-[8px] hidden md:block rounded-full mr-1 h-[8px] bg-primary"></div>
          <p className="text-primary font-semibold">
            Number Of Episodes:{" "}
            <span className="text-white font-normal">
              {props.results.number_of_episodes}
            </span>
          </p>
        </div>
      ) : null}
      {props.imdbResults.Awards ? (
        <div className="flex items-center">
          <div className="w-[8px] hidden md:block rounded-full mr-1 h-[8px] bg-primary"></div>
          <p className="text-primary font-semibold">
            Awards:{" "}
            <span className="text-white font-normal">
              {props.imdbResults.Awards}
            </span>
          </p>
        </div>
      ) : null}
      {props.imdbResults.Language ? (
        <div className="flex items-center">
          <div className="w-[8px] hidden md:block rounded-full mr-1 h-[8px] bg-primary"></div>
          <p className="text-primary font-semibold">
            Language(s):{" "}
            <span className="text-white font-normal">
              {props.imdbResults.Language}
            </span>
          </p>
        </div>
      ) : null}
      {props.results.budget ? (
        <div className="flex items-center">
          <div className="w-[8px] hidden md:block rounded-full mr-1 h-[8px] bg-primary"></div>
          <p className="text-primary font-semibold">
            Budget:{" "}
            <span className="text-white font-normal">
              ${props.results.budget.toLocaleString()}
            </span>
          </p>
        </div>
      ) : null}
      {props.results.revenue ? (
        <div className="flex items-center">
          <div className="w-[8px] hidden md:block rounded-full mr-1 h-[8px] bg-primary"></div>
          <p className="text-primary font-semibold">
            Revenue:{" "}
            <span className="text-white font-normal">
              ${props.results.revenue.toLocaleString()}
            </span>
          </p>
        </div>
      ) : null}
      {props.imdbResults.BoxOffice ? (
        <div className="flex items-center">
          <div className="w-[8px] hidden md:block rounded-full mr-1 h-[8px] bg-primary"></div>
          <p className="text-primary font-semibold">
            Box Office:{" "}
            <span className="text-white font-normal">
              {props.imdbResults.BoxOffice}
            </span>
          </p>
        </div>
      ) : null}
      {props.imdbResults.imdbVotes ? (
        <div className="flex items-center">
          <div className="w-[8px] hidden md:block rounded-full mr-1 h-[8px] bg-primary"></div>
          <p className="text-primary font-semibold">
            IMDb Votes:{" "}
            <span className="text-white font-normal">
              {props.imdbResults.imdbVotes}
            </span>
          </p>
        </div>
      ) : null}
      {props.results.homepage ? (
        <div className="flex items-center">
          <div className="w-[8px] hidden md:block rounded-full mr-1 h-[8px] bg-primary"></div>
          <p className="text-primary font-semibold">
            Homepage:{" "}
            <span className="text-priText-300 font-normal">
              <a
                href={props.results.homepage}
                target="_blank"
                className="hover:text-blue-600"
              >
                {props.results.homepage}
              </a>
            </span>
          </p>
        </div>
      ) : null}
    </motion.div>
  );
}
