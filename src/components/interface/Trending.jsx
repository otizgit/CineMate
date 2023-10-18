import React, { useEffect, useState } from "react";
import axios from "axios";
import apiKey from "../../assets/data/key";

import CategoryResults from "./CategoryResults";
import TrendingTexts from "../TrendingTexts";

export default function Trending(props) {
  const [feedback, setFeedback] = useState([]);

  const fetchMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/discover/${props.apiWord}?api_key=${apiKey}`
      )
      .then((res) => {
        setFeedback(res.data.results);
        if (props.setMovieLoad) {
          props.setMovieLoad(true);
        }
        if (props.setTvShowLoad) {
          props.setTvShowLoad(true);
        }
      })
      .catch(() => {
        alert(
          "Oops, an error occured, please check your internet connection and try again."
        );
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="margin">
      <div className="padding">
        <TrendingTexts title={props.title} subTitle={props.subTitle} />
      </div>
      {feedback && (
        <CategoryResults
          apiKeyword={props.apiWord}
          feedback={feedback}
          searchWord={props.searchWord}
        />
      )}
    </div>
  );
}
