import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKey from "../assets/data/key";
import { useParams } from "react-router-dom";
import SeasonsCard from "../components/interface/Cards/SeasonsCard";

export default function SelectedSeason() {
  const { season, title, id } = useParams();
  const [seasonData, setSeasonData] = useState([]);

  const fetchSeasonData = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${apiKey}`
      )
      .then((res) => setSeasonData(res.data))
      .catch(() => {
        alert(
          "Oops, an error occured, please check your internet connection and try again."
        );
      });
  };

  useEffect(() => {
    fetchSeasonData();
    window.scrollTo(0, 0);
    document.title = `${title} | ${`Season${season}`}`;
  }, []);

  return (
    <div className="lg:pt-[72px]">
      <div className="flex flex-col gap-2 lg:flex-row border-b-2 border-primary pb-10 lg:pb-0  mb-14">
        <img
          className="w-full mb-4 lg:mb-0 lg:w-[13rem] object-cover"
          src={`https://image.tmdb.org/t/p/w780${seasonData.poster_path}`}
          alt="season poster"
        />
        <div className="text-center lg:text-left lg:pt-10">
          {seasonData.name ? (
            <div className="flex flex-wrap padding lg:p-0 mb-4 items-center gap-2 justify-center">
              <h2 className="text-[1.7rem] font-heading tracking-wider text-white">
                {seasonData.name}
              </h2>
              <p className="custom-fz text-primary font-semibold">
                ({seasonData.air_date.slice(0, 4)})
              </p>
            </div>
          ) : null}
          {seasonData.overview ? (
            <p className="custom-fz padding text-priText-300 lg:pb-10">
              {seasonData.overview}
            </p>
          ) : null}
        </div>
      </div>

      {seasonData.episodes ? (
        <div>
          <h2 className="text-[1.7rem] font-heading tracking-wider text-primary mb-6 padding">
            Episodes{" "}
          </h2>
          <div className="padding flex flex-col gap-14 margin">
            {seasonData.episodes
              ? seasonData.episodes.map((episode) => {
                  return <SeasonsCard key={episode.id} seasonArray={episode} />;
                })
              : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
