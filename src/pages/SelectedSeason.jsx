import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKey from "../assets/data/key";
import { useParams } from "react-router-dom";
import SeasonsCard from "../components/interface/Cards/SeasonsCard";
import ImageOverlay from "../components/interface/ImageOverlay";
import { motion } from "framer-motion";
import { headingAnimation, slideAnimation } from "../animations/Animations";
import Preloader from "../components/interface/Preloader";

export default function SelectedSeason() {
  const { season, title, id } = useParams();
  const [seasonData, setSeasonData] = useState([]);
  const [seasonImages, setSeasonImages] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const [resultsLoad, setResultsLoad] = useState(false);

  if (!resultsLoad) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "scroll";
  }

  const fetchData = () => {
    const fetchSeasonData = axios.get(
      `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${apiKey}`
    );
    const fetchSeasonImages = axios.get(
      `https://api.themoviedb.org/3/tv/${id}/season/${season}/images?api_key=${apiKey}`
    );

    axios
      .all([fetchSeasonData, fetchSeasonImages])
      .then(
        axios.spread((...allData) => {
          setSeasonData(allData[0].data);
          setSeasonImages(allData[1].data);
          setResultsLoad(true);
        })
      )
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
    fetchData();

    window.scrollTo(0, 0);
    document.title = `${title} | ${`Season${season}`}`;
  }, []);

  return (
    <>
      {!resultsLoad ? <Preloader /> : null}
      <div className="lg:pt-[77px] overflow-x-hidden">
        <div className="flex flex-col gap-6 lg:flex-row border-b-2 lg:border-x-2 border-primary pb-10 lg:pb-0 mb-14 mx-6 md:mx-14 overflow-hidden">
          <motion.img
            variants={slideAnimation}
            initial="init"
            animate="slide"
            transition={{
              type: "spring",
              stiffness: 500,
            }}
            whileHover={{
              scale: 1.07,
            }}
            onClick={toggleImageOverlay}
            className="w-full lg:mb-0 lg:w-[13rem] object-cover cursor-pointer"
            src={`https://image.tmdb.org/t/p/w780${seasonData.poster_path}`}
            alt="season poster"
          />
          <motion.div
            variants={headingAnimation}
            initial="init"
            whileInView="animate"
            viewport={{
              once: true,
            }}
            className="text-center lg:text-left lg:pt-10"
          >
            {seasonData.name ? (
              <div className="flex flex-wrap padding lg:p-0 mb-4 items-center gap-2 justify-center">
                <h2 className="text-[1.7rem] font-heading tracking-wider text-primary">
                  {seasonData.name}
                </h2>
                <p className="custom-fz text-white font-semibold">
                  ({seasonData.air_date.slice(0, 4)})
                </p>
              </div>
            ) : null}
            {seasonData.overview ? (
              <p className="custom-fz padding text-priText-300 lg:pb-10">
                {seasonData.overview}
              </p>
            ) : null}
          </motion.div>
        </div>

        {seasonData.episodes ? (
          <div>
            <h2 className="text-[1.7rem] font-heading tracking-wider text-primary mb-6 padding">
              Episodes{" "}
            </h2>
            <div className="padding flex flex-col gap-14 margin">
              {seasonData.episodes
                ? seasonData.episodes.map((episode, index) => {
                    return (
                      <SeasonsCard
                        key={episode.id}
                        index={index}
                        seasonArray={episode}
                      />
                    );
                  })
                : null}
            </div>
          </div>
        ) : null}

        {overlay && (
          <ImageOverlay
            images={seasonImages.posters.slice(0, 20)}
            setOverlay={setOverlay}
          />
        )}
      </div>
    </>
  );
}
