import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import bgImage from "../assets/images/bg.avif";
import { useParams } from "react-router-dom";
import apiKey from "../assets/data/key";
import MovieDetails from "../components/interface/Movie/MovieDetails";
import { useWindowSize } from "@uidotdev/usehooks";
import CategoryResults from "../components/interface/CategoryResults";
import MovieInfo from "../components/interface/Movie/MovieInfo";
import MovieExtraLinks from "../components/interface/Movie/MovieExtraLinks";
import MovieReviews from "../components/interface/Movie/MovieReviews";
import Networks from "../components/interface/Networks";
import Seasons from "../components/interface/Seasons";
import SeasonsCard from "../components/interface/Cards/SeasonsCard";
import ImageOverlay from "../components/interface/ImageOverlay";
import TrendingTexts from "../components/TrendingTexts";
import { motion } from "framer-motion";
import { slideAnimation } from "../animations/Animations";
import Preloader from "../components/interface/Preloader";

export default function SelectedMovie() {
  const { keyword, title, id } = useParams();
  const [results, setResults] = useState([]);
  const [imdbResults, setImdbResults] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [images, setImages] = useState([]);
  const [overlay, setOverlay] = useState(false);

  const windowWidth = useWindowSize().width;

  const location = useLocation();
  const { releaseYear } = location.state;

  const [resultsLoad, setResultsLoad] = useState(false);

  if (!resultsLoad) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "scroll";
  }

  const fetchData = () => {
    const getResults = axios.get(
      `https://api.themoviedb.org/3/${keyword}/${id}?api_key=${apiKey}`
    );

    const getImdbResults = axios.get(
      `http://www.omdbapi.com/?t=${title}&y=${releaseYear}&apikey=25c51d62`
    );

    const getCredits = axios.get(
      `https://api.themoviedb.org/3/${keyword}/${id}/credits?api_key=${apiKey}`
    );

    const getKeywords = axios.get(
      `https://api.themoviedb.org/3/${keyword}/${id}/keywords?api_key=${apiKey}`
    );

    const getReviews = axios.get(`
    https://api.themoviedb.org/3/${keyword}/${id}/reviews?api_key=${apiKey}`);

    const getRecommendations = axios.get(
      `https://api.themoviedb.org/3/${keyword}/${id}/recommendations?api_key=${apiKey}`
    );

    const getImages = axios.get(
      `https://api.themoviedb.org/3/${keyword}/${id}/images?api_key=${apiKey}`
    );

    axios
      .all([
        getResults,
        getImdbResults,
        getCredits,
        getKeywords,
        getReviews,
        getRecommendations,
        getImages,
      ])
      .then(
        axios.spread((...allData) => {
          setResults(allData[0].data);
          setImdbResults(allData[1].data);
          setCast(allData[2].data.cast);
          setCrew(allData[2].data.crew);
          setKeywords(allData[3].data.keywords);
          setReviews(allData[4].data.results);
          setRecommendations(allData[5].data.results);
          setImages(allData[6].data);
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
    document.title = `Cinemate | ${title}`;
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    fetchData();
  }, [resultsLoad]);

  function toggleImageOverlay() {
    document.body.style.overflow = "hidden";
    setOverlay(true);
  }

  const backdropStyle = {
    backgroundImage: `${
      windowWidth < 1024
        ? "linear-gradient(to right, rgba(0, 0, 0, .8), transparent)"
        : "linear-gradient(to right, #000000cf 70%, #0000009d)"
    } ,url(https://image.tmdb.org/t/p/w1280${results.backdrop_path})`,
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
      {!resultsLoad ? <Preloader /> : null}

      <div className="pt-[76px] overflow-x-hidden">
        <div
          className="h-[350px] lg:h-[100vh] xl:h-[600px] padding relative mb-5 lg:mb-16"
          style={results.backdrop_path ? backdropStyle : backdropStyleTwo}
        >
          <div className="lg:flex lg:py-[5rem] lg:items-center">
            {results.poster_path && (
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
                src={`https://image.tmdb.org/t/p/w780${results.poster_path}`}
                alt="Movie Poster"
              />
            )}
            {windowWidth > 1023 && (
              <MovieDetails imdbResults={imdbResults} results={results} />
            )}
          </div>
        </div>
        {windowWidth < 1024 && (
          <MovieDetails imdbResults={imdbResults} results={results} />
        )}

        <div className="padding">
          <MovieInfo results={results} imdbResults={imdbResults} />
        </div>

        {results.seasons && (
          <div className="movie-margin padding">
            <Seasons seasons={results.seasons} title={title} id={id} />
          </div>
        )}

        {results.last_episode_to_air && (
          <div className="movie-margin padding">
            <TrendingTexts title="Last Episode To Air" />
            <SeasonsCard seasonArray={results.last_episode_to_air} />
          </div>
        )}

        {cast.length && (
          <div className="movie-margin">
            <div className="padding">
              <TrendingTexts title="Cast" />
            </div>
            <CategoryResults apiKeyword="person" feedback={cast.slice(0, 20)} />
            <Link
              to={`/${title}/all-cast-and-crew`}
              state={{ allCast: cast, movieTitle: title, allCrew: crew }}
            >
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  bounce: 0.5,
                }}
                whileHover={{
                  scale: 1.15,
                }}
                className="text-primary ml-6 md:ml-14 mt-4 font-medium inline-block"
              >
                View All Cast and Crew
              </motion.p>
            </Link>
          </div>
        )}

        {results.networks ? <Networks networks={results.networks} /> : null}

        {reviews ? (
          <div className="movie-margin">
            <MovieReviews reviews={reviews.slice(0, 3)} />
            {reviews.length >= 3 ? (
              <Link
                to={`/${title}/all-reviews`}
                state={{ allReviews: reviews, movieTitle: title }}
              >
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    bounce: 0.5,
                  }}
                  whileHover={{
                    scale: 1.15,
                  }}
                  className="text-primary ml-6 md:ml-14 mt-4 font-medium inline-block"
                >
                  View All Reviews
                </motion.p>
              </Link>
            ) : null}
          </div>
        ) : null}

        {results && <MovieExtraLinks results={results} keywords={keywords} />}

        {recommendations && (
          <div className="margin">
            <div className="padding">
              <TrendingTexts title="you may also like" />
            </div>
            <CategoryResults
              setResultsLoad={setResultsLoad}
              apiKeyword={keyword}
              feedback={recommendations}
            />
          </div>
        )}

        {overlay && (
          <ImageOverlay
            images={images.posters.slice(0, 20)}
            setOverlay={setOverlay}
          />
        )}
      </div>
    </>
  );
}