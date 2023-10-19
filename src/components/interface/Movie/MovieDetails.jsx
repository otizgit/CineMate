import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { fadeAnimation } from "../../../animations/Animations";

export default function MovieDetails(props) {
  return (
    <div className="padding text-white mb-5 lg:mb-0">
      <div className="flex items-center mb-2 lg:mb-1 flex-wrap gap-2">
        {props.results.title && (
          <motion.p
            variants={fadeAnimation}
            initial="init"
            whileInView="fade"
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
            whileInView="fade"
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
            whileInView="fade"
            custom={0}
            viewport={{
              once: true,
            }}
            className="hidden md:block custom-fz font-medium text-white"
          >{`(${props.results.release_date.slice(0, 4)})`}</motion.p>
        ) : null}
      </div>

      <div className="flex flex-col md:flex-row mb-4 items-start md:justify-between lg:justify-start lg:w-[fit-content] flex-wrap gap-x-4 gap-y-4">
        {props.imdbResults.Rated !== "N/A" && props.imdbResults.Rated ? (
          <motion.div
            variants={fadeAnimation}
            initial="init"
            whileInView="fade"
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
            whileInView="fade"
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
            whileInView="fade"
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
            whileInView="fade"
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
            whileInView="fade"
            custom={1}
            viewport={{
              once: true,
            }}
            className="flex"
          >
            <span className="md:hidden custom-fz text-primary font-medium tracking-wide mr-1">
              Country:
            </span>{" "}
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
                whileInView="fade"
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
                    icon={faStar}
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
          whileInView="fade"
          custom={4}
          viewport={{
            once: true,
          }}
          className="mb-2"
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
            whileInView="fade"
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

      <div className="lg:flex gap-10 border-primary border-b-2 lg:border-none lg:pb-0 pb-5">
        {props.imdbResults.Writer !== "N/A" && props.imdbResults.Writer ? (
          <motion.div
            variants={fadeAnimation}
            initial="init"
            whileInView="fade"
            custom={6}
            viewport={{
              once: true,
            }}
            className="mb-5"
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
            whileInView="fade"
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
    </div>
  );
}
