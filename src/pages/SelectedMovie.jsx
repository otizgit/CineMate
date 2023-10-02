import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import bgImage from "../assets/images/bg.avif";
import { useParams } from "react-router-dom";
import apiKey from "../assets/data/key";
import { searchToggleContext } from "../components/layout/Layout";
import MovieDetails from "../components/interface/MovieDetails";
import { useWindowSize } from "@uidotdev/usehooks";
import CategoryResults from "../components/interface/CategoryResults";
import MovieInfo from "../components/interface/MovieInfo";
import MovieExtraLinks from "../components/interface/MovieExtraLinks";
import MovieReviews from "../components/interface/MovieReviews";
import Networks from "../components/interface/Networks";
import Seasons from "../components/interface/Seasons";
import SeasonsCard from "../components/interface/Cards/SeasonsCard";

export default function SelectedMovie() {
  const { keyword, title, id } = useParams();
  const [results, setResults] = useState([]);
  const [imdbResults, setImdbResults] = useState([]);
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  const windowWidth = useWindowSize().width;

  const { setSearchOpen } = useContext(searchToggleContext);

  const location = useLocation();
  const { releaseYear, trigger } = location.state;

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
    axios
      .all([
        getResults,
        getImdbResults,
        getCredits,
        getKeywords,
        getReviews,
        getRecommendations,
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
  });

  useEffect(() => {
    fetchData();
    setSearchOpen(false);
    window.scrollTo(0, 0);
  }, [trigger]);

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
    <div className="pt-[80px]">
      <div
        className="h-[350px] lg:h-[600px] padding relative mb-5 lg:mb-16"
        style={results.backdrop_path ? backdropStyle : backdropStyleTwo}
      >
        <div className="lg:flex lg:py-[5rem] lg:items-center">
          {results.poster_path && (
            <img
              className="w-[150px] md:w-[200px] lg:w-[300px] rounded-2xl lg:static absolute bottom-[10px] custom-shadow"
              src={`https://image.tmdb.org/t/p/w500${results.poster_path}`}
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
          <h2 className="font-sans text-white text-[1.5rem] mb-2 tracking-wider">
            Last Episode To Air
          </h2>
          <SeasonsCard seasonArray={results.last_episode_to_air} />
        </div>
      )}

      {cast.length && (
        <div className="movie-margin">
          <h2 className="padding font-sans text-white text-[1.6rem] mb-2 tracking-wider">
            Cast
          </h2>
          <CategoryResults apiKeyword="person" feedback={cast.slice(0, 20)} />
          <Link
            to={`/${title}/all-cast`}
            state={{ allCast: cast, movieTitle: title, allCrew: crew }}
          >
            <p className="text-primary padding mt-4 font-bold text-center md:text-left">
              View All Cast and Crew
            </p>
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
              <p className="text-primary padding mt-4 font-bold text-center md:text-left">
                View All Reviews
              </p>
            </Link>
          ) : null}
        </div>
      ) : null}

      {results && <MovieExtraLinks results={results} keywords={keywords} />}

      {recommendations && (
        <div className="margin">
          <h2 className="padding font-sans text-white text-[1.6rem] mb-2 tracking-wider">
            You May Also Like
          </h2>
          <CategoryResults apiKeyword={keyword} feedback={recommendations} />
        </div>
      )}
    </div>
  );
}
