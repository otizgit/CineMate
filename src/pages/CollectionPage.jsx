import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import apiKey from "../assets/data/key";
import bgImage from "../assets/images/bg.avif";
import { useWindowSize } from "@uidotdev/usehooks";
import CollectionDetails from "../components/interface/CollectionDetails";
import CategoryResults from "../components/interface/CategoryResults";

export default function CollectionPage() {
  const { name, id } = useParams();
  const [collectionData, setCollectionData] = useState([]);

  const windowWidth = useWindowSize().width;

  const fetchCollectionData = () => {
    axios
      .get(
        `
    https://api.themoviedb.org/3/collection/${id}?api_key=${apiKey}`
      )
      .then((res) => setCollectionData(res.data))
      .catch(() => {
        alert(
          "Oops, an error occured, please check your internet connection and try again."
        );
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Cinemate | ${name}`;
  });

  useEffect(() => {
    fetchCollectionData();
  }, []);

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
    <div className="pt-[80px]">
      <div
        className="h-[350px] lg:h-[600px] padding relative mb-5 lg:mb-16"
        style={collectionData.backdrop_path ? backdropStyle : backdropStyleTwo}
      >
        <div className="lg:flex lg:py-[5rem] lg:items-center">
          {collectionData.poster_path && (
            <img
              className="w-[150px] md:w-[200px] lg:w-[300px] rounded-2xl lg:static absolute bottom-[20px] custom-shadow"
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
          <h2 className="padding font-sans text-[1.5rem] mb-4 text-white">
            Movies
          </h2>
          <CategoryResults apiKeyword="movie" feedback={collectionData.parts} />
        </div>
      ) : null}
    </div>
  );
}
