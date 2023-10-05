import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import SeasonsCard from "../components/interface/Cards/SeasonsCard";

export default function AllSeasons() {
  const { title } = useParams();
  const location = useLocation();
  const { seasons } = location.state;

  useEffect(() => {
    document.title = `${title} | Seasons`;
    window.scrollTo(0, 0);
  });

  return (
    <div className="pt-[140px] margin padding flex flex-col gap-10">
      {seasons.map((season) => {
        return <SeasonsCard key={season.id} seasonArray={season} />;
      })}
    </div>
  );
}
