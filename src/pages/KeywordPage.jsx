import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiKey from "../assets/data/key";
import CategoryResults from "../components/interface/CategoryResults";

export default function KeywordPage() {
  const { name, id } = useParams();
  const [keywordData, setKeywordData] = useState([]);

  const fetchKeywordData = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/keyword/${id}/movies?api_key=${apiKey}`
      )
      .then((res) => setKeywordData(res.data.results))
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
    document.title = `Cinemate | "${name}"`;
  }, []);

  return (
    <div className="pt-[120px] margin">
      <h1 className="text-[1.7rem] font-heading tracking-wider text-primary padding mb-6 text-center md:text-left">
        {name.toUpperCase()}
      </h1>
      <CategoryResults apiKeyword="movie" feedback={keywordData} />
    </div>
  );
}
