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
                <motion.p
                  variants={fadeAnimation}
                  initial="init"
                  whileInView="fade"
                  viewport={{
                    once: true,
                  }}
                  custom={index}
                >
                  <Link
                    to={`/company/${company.name}/${company.id}`}
                    key={company.id}
                    className="py-1 px-3 rounded-lg border-2 border-primary w-[fit-content] flex"
                  >
                    <p className="custom-fz text-white">{company.name}</p>
                  </Link>
                </motion.p>
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
                <motion.p
                  variants={fadeAnimation}
                  initial="init"
                  whileInView="fade"
                  viewport={{
                    once: true,
                  }}
                  custom={index}
                >
                  <Link
                    to={`/keyword/${movieKeyword.name}/${movieKeyword.id}`}
                    key={movieKeyword.id}
                    className="py-1 px-3 rounded-lg border-2 border-primary w-[fit-content] flex"
                  >
                    <p className="custom-fz text-white">{movieKeyword.name}</p>
                  </Link>
                </motion.p>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  ) : null;
}
