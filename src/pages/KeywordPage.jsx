import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiKey from "../assets/data/key";
import CategoryResults from "../components/interface/CategoryResults";
import TrendingTexts from "../components/TrendingTexts";
import Preloader from "../components/interface/Preloader";

export default function KeywordPage() {
  const { name, id } = useParams();
  const [keywordData, setKeywordData] = useState([]);
  const [resultsLoad, setResultsLoad] = useState(false);

  if (!resultsLoad) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "scroll";
  }

  const fetchKeywordData = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/keyword/${id}/movies?api_key=${apiKey}`
      )
      .then((res) => {
        setKeywordData(res.data.results);
        setResultsLoad(true);
      })
      .catch(() => {
        alert(
          "Oops, an error occured, please check your internet connection and try again."
        );
      });
  };

  useEffect(() => {
    fetchKeywordData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `CineMate | "${name}"`;
  }, []);

  return (
    <>
      {resultsLoad ? (
        <div className="pt-[120px] margin">
          <div className="paddingX">
            <TrendingTexts title={name.toUpperCase() + " related"} />
          </div>

          <CategoryResults apiKeyword="movie" feedback={keywordData} />
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
}
