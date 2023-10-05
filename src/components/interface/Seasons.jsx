import React from "react";
import SeasonsCard from "./Cards/SeasonsCard";
import { Link } from "react-router-dom";

export default function Seasons(props) {
  const seasonOne = props.seasons.filter((season) => {
    return season.season_number === 1;
  });

  return (
    <div>
      <h2 className="text-[1.7rem] font-heading tracking-wider text-primary mb-6">
        Seasons
      </h2>
      {seasonOne.map((seasonArray) => {
        return <SeasonsCard key={seasonArray.id} seasonArray={seasonArray} />;
      })}
      {props.seasons.length > 1 && (
        <Link
          to={`/seasons/${props.title}/${props.id}`}
          state={{ seasons: props.seasons }}
        >
          <p className="text-primary mt-4 font-bold text-center md:text-left">
            View All Seasons
          </p>
        </Link>
      )}
    </div>
  );
}
