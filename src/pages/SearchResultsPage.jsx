import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import apiKey from "../assets/data/key";
import ResultsFilter from "../components/interface/ResultsFilter";
import Explore from "../components/interface/Explore";
import CategoryResults from "../components/interface/CategoryResults";

export default function SearchResultsPage() {
  const [searchData, setSearchData] = useState([]);
  let { id } = useParams();
  const encodedTitle = encodeURIComponent(id);
  const location = useLocation();
  const { trigger } = location.state;
  const [category, setCategory] = useState("movie");

  const fetchData = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/${category}?api_key=${apiKey}&query=${encodedTitle}`
      )
      .then((res) => {
        setSearchData(res.data.results);
      })
      .catch(() => {
        "Oops, an error occured, please check your internet connection and try again.";
      });
  };

  useEffect(() => {
    fetchData();
  }, [category, trigger]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `Cinemate | ${id} Search Results`;
  });

  return (
    <div className="padding-top text-white">
      <ResultsFilter category={category} setCategory={setCategory} />
      <div className="margin">
        <CategoryResults
          apiKeyword={category}
          feedback={searchData}
          searchWord={`${category}`}
        />
      </div>
      <Explore />
    </div>
  );
}
