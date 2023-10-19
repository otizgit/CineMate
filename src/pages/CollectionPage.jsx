import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import { useParams } from "react-router-dom";
import apiKey from "../assets/data/key";
import bgImage from "../assets/images/bg.avif";
import { useWindowSize } from "@uidotdev/usehooks";
import CollectionDetails from "../components/interface/CollectionDetails";
import CategoryResults from "../components/interface/CategoryResults";
import Preloader from "../components/interface/Preloader";
import { motion } from "framer-motion";
import { slideAnimation } from "../animations/Animations";
import TrendingTexts from "../components/TrendingTexts";
import ImageOverlay from "../components/interface/ImageOverlay";

export default function CollectionPage() {
  const { name, id } = useParams();
  const [collectionData, setCollectionData] = useState([]);
  const [collectionImages, setCollectionImages] = useState([]);
  const [overlay, setOverlay] = useState(false);

  const windowWidth = useWindowSize().width;

  const [resultsLoad, setResultsLoad] = useState(false);

  const fetchData = () => {
    const getCollectionData = axios.get(
      `https://api.themoviedb.org/3/collection/${id}?api_key=${apiKey}`
    );
    const getCollectionImages = axios.get(
      `https://api.themoviedb.org/3/collection/${id}/images?api_key=${apiKey}`
    );

    axios
      .all([getCollectionData, getCollectionImages])
      .then(
        axios.spread((...allData) => {
          setCollectionData(allData[0].data);
          setCollectionImages(allData[1].data);
          setResultsLoad(true);
        })
      )
      .catch(() => {
        alert(
          "Oops, an error occured, please check your internet connection and try again."
        );
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Cinemate | ${name}`;
  }, []);

  useEffect(() => {
    fetchData();
    console.log(collectionImages)
  }, []);

  function toggleImageOverlay() {
    document.body.style.overflow = "hidden";
    setOverlay(true);
  }

  const backdropStyle = {
    backgroundImage: `${
      windowWidth < 1024
        ? "linear-gradient(to right, rgba(0, 0, 0, .8), #00808086)"
        : "linear-gradient(to right, #000000cf 70%, #0000009d)"
    } ,url(https://image.tmdb.org/t/p/w1280${collectionData.backdrop_path})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const backdropStyleTwo = {
    backgroundImage: `${
      windowWidth < 1024
        ? "linear-gradient(to right, rgba(0, 0, 0, 0.932), #00000090)"
        : "linear-gradient(to right, #000000cf 70%, #000000d1)"
    } ,url(${bgImage})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  return (
    <>
      {resultsLoad ? (
        <div className="pt-[80px]">
          <div
            className="h-[350px] lg:h-[600px] padding relative mb-5 lg:mb-16"
            style={
              collectionData.backdrop_path ? backdropStyle : backdropStyleTwo
            }
          >
            <div className="lg:flex lg:py-[5rem] lg:items-center">
              {collectionData.poster_path && (
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
                  className="w-[150px] md:w-[200px] lg:w-[300px] rounded-2xl lg:static absolute bottom-[20px] custom-shadow cursor-pointer"
                  src={`https://image.tmdb.org/t/p/w780${collectionData.poster_path}`}
                  alt="Movie Poster"
                />
              )}
              {windowWidth > 1023 && (
                <div>
                  <CollectionDetails collectionData={collectionData} />
                </div>
              )}
            </div>
          </div>
          {windowWidth < 1024 && (
            <CollectionDetails collectionData={collectionData} />
          )}

          {collectionData.parts ? (
            <div className="margin">
              <div className="padding">
                <TrendingTexts title="movies" />
              </div>
              <CategoryResults
                apiKeyword="movie"
                feedback={collectionData.parts}
              />
            </div>
          ) : null}

          {overlay && (
            <ImageOverlay
              images={collectionImages.posters.slice(0, 20)}
              setOverlay={setOverlay}
            />
          )}
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
}
