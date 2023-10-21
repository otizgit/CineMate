import React from "react";
import SeasonsCard from "./Cards/SeasonsCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import TrendingTexts from "../TrendingTexts";
import { fadeAnimation } from "../../animations/Animations";

export default function Seasons(props) {
  const seasonOne = props.seasons.filter((season) => {
    return season.season_number === 1;
  });

  return (
    <div>
      <TrendingTexts title="Seasons" />
      {seasonOne.map((seasonArray, index) => {
        return (
          <SeasonsCard
            index={index}
            key={seasonArray.id}
            seasonArray={seasonArray}
          />
        );
      })}
      {props.seasons.length > 1 && (
        <Link
          to={`/seasons/${props.title}/${props.id}`}
          state={{ seasons: props.seasons }}
        >
          <motion.p
            variants={fadeAnimation}
            initial="init"
            whileInView="fade"
            viewport={{
              once: true
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              bounce: 0.5,
            }}
            whileHover={{
              scale: 1.15,
            }}
            className="text-primary mt-4 font-medium inline-block"
          >
            View All Seasons
          </motion.p>
        </Link>
      )}
    </div>
  );
}
