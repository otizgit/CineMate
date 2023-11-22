import React, { useEffect, useState } from "react";
import axios, { all } from "axios";
import { useParams } from "react-router-dom";
import apiKey from "../assets/data/key";
import bgImage from "../assets/images/bg.avif";
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

  const [resultsLoad, setResultsLoad] = useState(false);

  const fetchData = async () => {
    const getCollectionData = await axios.get(
      `https://api.themoviedb.org/3/collection/${id}?api_key=${apiKey}`
    );
    const getCollectionImages = await axios.get(
      `https://api.themoviedb.org/3/collection/${id}/images?api_key=${apiKey}`
    );

    await axios
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
    document.title = `CineMate | ${name}`;
    fetchData();
  }, []);

  function toggleImageOverlay() {
    document.body.style.overflow = "hidden";
    setOverlay(true);
  }

  const backdropStyle = {
    backgroundImage: `linear-gradient(240deg, rgba(0,0,0,0.6530987394957983) 15%, rgba(0,0,0,0.865983893557423) 28%, rgba(0,0,0,0.8799894957983193) 71%, rgba(0,0,0,0.5718662464985995) 100%),url(https://image.tmdb.org/t/p/w1280${collectionData.backdrop_path})`,
  };

  const backdropStyleTwo = {
    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.932), #00000090),url(${bgImage})`,
  };

  return (
    <>
      {resultsLoad ? (
        <div className="pt-[76px]">
          <div
            className="h-[350px] lg:h-[600px] padding relative mb-5 lg:mb-16 bg-no-repeat bg-cover bg-center"
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
              <div className="hidden lg:block">
                <CollectionDetails collectionData={collectionData} />
              </div>
            </div>
          </div>
            <div className="lg:hidden">
              <CollectionDetails collectionData={collectionData} />
            </div>

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
