import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import apiKey from "../assets/data/key";
import ResultsFilter from "../components/interface/ResultsFilter";
import Explore from "../components/interface/Explore";
import CategoryResults from "../components/interface/CategoryResults";
import Preloader from "../components/interface/Preloader";

export default function SearchResultsPage() {
  const [searchData, setSearchData] = useState([]);
  let { id } = useParams();
  const encodedTitle = encodeURIComponent(id);
  const [category, setCategory] = useState("movie");
  const [searchResultsLoad, setSearchResultsLoad] = useState(false);

  if (!searchResultsLoad) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "scroll";
  }

  const fetchData = async () => {
    await axios
      .get(
        `https://api.themoviedb.org/3/search/${category}?api_key=${apiKey}&query=${encodedTitle}`
      )
      .then((res) => {
        setSearchData(res.data.results);
        setSearchResultsLoad(true);
      })
      .catch(() => {
        "Oops, an error occured, please check your internet connection and try again.";
      });
  };

  useEffect(() => {
    fetchData();
  }, [category, id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `CineMate | "${id}" Search Results`;
  }, [id]);

  return (
    <>
      {searchResultsLoad ? (
        <div className="padding-top text-white max-width">
          <ResultsFilter category={category} setCategory={setCategory} />
          <div className="margin">
            <CategoryResults
              apiKeyword={category}
              feedback={searchData}
            />
          </div>
          <Explore />
        </div>
      ) : (
        <Preloader />
      )}
    </>
  );
}
