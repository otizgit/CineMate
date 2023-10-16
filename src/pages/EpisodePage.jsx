import React, { useEffect, useState } from "react";
import axios from "axios";
import apiKey from "../assets/data/key";
import { useParams } from "react-router-dom";
import CategoryResults from "../components/interface/CategoryResults";
import ImageOverlay from "../components/interface/ImageOverlay";

export default function EpisodePage() {
  const { season, episode, title, id } = useParams();
  const [episodeData, setEpisodeData] = useState([]);
  const [episodeImages, setEpisodeImages] = useState([]);
  const [overlay, setOverlay] = useState(false);

  const fetchEpisodeData = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}?api_key=${apiKey}`
      )
      .then((res) => setEpisodeData(res.data))
      .catch(() => {
        alert(
          "Oops, an error occured, please check your internet connection and try again."
        );
      });
  };

  const fetchEpisodeImages = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}/images?api_key=${apiKey}`
      )
      .then((res) => setEpisodeImages(res.data))
      .catch(() => {
        alert(
          "Oops, an error occured, please check your internet connection and try again."
        );
      });
  };

  function toggleImageOverlay() {
    document.body.style.overflow = "hidden";
    setOverlay(true);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${title} | ${`Season${season}- Episode${episode}`}`;
  });

  useEffect(() => {
    fetchEpisodeData();
    fetchEpisodeImages();
  }, []);

  return (
    <div className="pt-[77px] margin">
      <div className="flex flex-col gap-6 lg:flex-row border-b-2 lg:border-x-2 border-primary pb-10 lg:pb-0 mb-14 mx-6 md:mx-14">
        <img
          onClick={toggleImageOverlay}
          className="w-full lg:w-[19rem] object-cover cursor-pointer"
          src={`https://image.tmdb.org/t/p/w780${episodeData.still_path}`}
          alt="season poster"
        />

        <div>
          <div className="padding lg:px-0 text-center lg:text-left lg:pt-10 lg:mb-6">
            {episodeData.name ? (
              <div className="flex flex-wrap mb-4 lg:mb-0 items-center gap-2 justify-center">
                <h2 className="text-[1.7rem] font-heading tracking-wider text-primary">
                  {episodeData.name}
                </h2>
                <p className="custom-fz text-white font-semibold">
                  ({episodeData.air_date.slice(0, 4)})
                </p>
              </div>
            ) : null}
            {episodeData.overview ? (
              <p className="custom-fz padding text-priText-300 mb-4">
                {episodeData.overview}
              </p>
            ) : null}
          </div>

          <div className="padding flex flex-col lg:flex-row lg:justify-center lg:gap-6 items-center gap-3 lg:pb-10">
            {episodeData.air_date ? (
              <p className="text-primary custom-fz font-medium">
                Air Date:{" "}
                <span className="text-white font-normal">
                  {episodeData.air_date}
                </span>
              </p>
            ) : null}
            <div className="flex gap-6">
              {episodeData.season_number ? (
                <p className="text-primary custom-fz font-medium">
                  Season:{" "}
                  <span className="text-white font-normal">
                    {episodeData.season_number}
                  </span>
                </p>
              ) : null}
              {episodeData.episode_number ? (
                <p className="text-primary custom-fz font-medium">
                  Episode:{" "}
                  <span className="text-white font-normal">
                    {episodeData.episode_number}
                  </span>
                </p>
              ) : null}
            </div>
            {episodeData.runtime ? (
              <p className="text-primary custom-fz font-medium">
                Runtime:{" "}
                <span className="text-white font-normal">
                  {episodeData.runtime}mins
                </span>
              </p>
            ) : null}
            <div className="flex">
              {episodeData.vote_average ? (
                <p className="text-primary custom-fz font-medium">
                  TMDb Vote Average:{" "}
                  <span className="text-white font-normal">
                    {episodeData.vote_average.toFixed(1) * 10 + "%"}
                  </span>
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {episodeData.guest_stars && episodeData.guest_stars.length ? (
        <div className="movie-margin">
          <h2 className="text-[1.7rem] font-heading tracking-wider text-primary padding mb-6 text-center md:text-left">
            Guest Stars
          </h2>
          <div>
            <CategoryResults
              apiKeyword="person"
              feedback={episodeData.guest_stars}
            />
          </div>
        </div>
      ) : null}

      <div>
        <h2 className="text-[1.7rem] font-heading tracking-wider text-primary padding mb-6 text-center md:text-left">
          Crew
        </h2>
        {episodeData.crew ? (
          <div>
            <CategoryResults apiKeyword="person" feedback={episodeData.crew} />
          </div>
        ) : null}
      </div>

      {overlay && (
        <ImageOverlay
          images={episodeImages.stills.slice(0, 20)}
          setOverlay={setOverlay}
        />
      )}
    </div>
  );
}
