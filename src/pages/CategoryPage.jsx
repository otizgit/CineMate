import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import apiKey from "../assets/data/key";
import CategoryResults from "../components/interface/CategoryResults";
import Explore from "../components/interface/Explore";
import TrendingTexts from "../components/TrendingTexts";
import Preloader from "../components/interface/Preloader";

export default function CategoryPage() {
  const keyword = useParams().id;
  const [feedback, setFeedback] = useState([]);
  const location = useLocation();
  const { apiKeyword, apistate } = location.state;
  const [title, setTitle] = useState("");
  const [resultsLoad, setResultsLoad] = useState(false);

  if (!resultsLoad) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "scroll";
  }

  useEffect(() => {
    setTitle(location.state.title);
  }, [apistate]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Cinemate | Categories";
  });

  const fetchMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/${apiKeyword}/${keyword}?api_key=${apiKey}`
      )
      .then((res) => {
        setFeedback(res.data.results);
        setResultsLoad(true);
      })
      .catch(() => {
        alert(
          "Oops, an error occured, please check your internet connection and try again."
        );
      });
  };

  useEffect(() => {
    fetchMovies();
  }, [apistate]);

  return (
    <>
      {resultsLoad ? (
        <div className="padding-top md:pt-[10rem]">
          <div className="padding">
            <TrendingTexts title={title} />
          </div>
          <div className="margin">
            <CategoryResults apiKeyword={apiKeyword} feedback={feedback} />
          </div>
          <Explore />
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
}
