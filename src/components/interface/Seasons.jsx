import React from "react";
import SeasonsCard from "./Cards/SeasonsCard";
import { Link } from "react-router-dom";
import TrendingTexts from "../TrendingTexts";

export default function Seasons(props) {
  const seasonOne = props.seasons.filter((season) => {
    return season.season_number === 1;
  });

  return (
    <div>
      <TrendingTexts title="Seasons" />
      {seasonOne.map((seasonArray) => {
        return <SeasonsCard key={seasonArray.id} seasonArray={seasonArray} />;
      })}
      {props.seasons.length > 1 && (
        <Link
          to={`/seasons/${props.title}/${props.id}`}
          state={{ seasons: props.seasons }}
        >
          <p className="text-primary mt-6 font-medium text-center md:text-left">
            View All Seasons
          </p>
        </Link>
      )}
    </div>
  );
}
