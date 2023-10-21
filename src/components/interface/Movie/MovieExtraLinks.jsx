import React from "react";
import { Link } from "react-router-dom";
import TrendingTexts from "../../TrendingTexts";
import { motion } from "framer-motion";
import { fadeAnimation } from "../../../animations/Animations";

export default function MovieExtraLinks(props) {
  return props.results.production_companies || props.keywords ? (
    <div className="flex gap-12 lg:flex-row flex-col movie-margin padding">
      {props.results.production_companies ? (
        <div className="flex-1">
          {props.results.production_companies.length ? (
            <TrendingTexts title="Production companies" />
          ) : null}
          <div className="flex gap-4 flex-wrap">
            {props.results.production_companies.map((company, index) => {
              return (
                <motion.div
                  variants={fadeAnimation}
                  initial="init"
                  whileInView="fade"
                  viewport={{
                    once: true,
                  }}
                  custom={index}
                  key={company.id}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    bounce: 0.5,
                  }}
                  whileHover={{
                    scale: 1.07,
                  }}
                >
                  <Link
                    to={`/company/${company.name}/${company.id}`}
                    className="py-1 px-3 rounded-lg border-2 border-primary bg-black w-[fit-content] flex"
                  >
                    <p className="custom-fz text-priText-300">{company.name}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : null}
      {props.keywords ? (
        <div className="flex-1">
          {props.keywords.length ? <TrendingTexts title="Keywords" /> : null}
          <div className="flex gap-4 flex-wrap">
            {props.keywords.map((movieKeyword, index) => {
              return (
                <motion.div
                  variants={fadeAnimation}
                  initial="init"
                  whileInView="fade"
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    bounce: 0.5,
                  }}
                  whileHover={{
                    scale: 1.07,
                  }}
                  custom={index}
                  key={movieKeyword.id}
                >
                  <Link
                    to={`/keyword/${movieKeyword.name}/${movieKeyword.id}`}
                    className="py-1 px-3 rounded-lg border-2 border-primary bg-black w-[fit-content] flex"
                  >
                    <p className="custom-fz text-priText-300">{movieKeyword.name}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  ) : null;
}
