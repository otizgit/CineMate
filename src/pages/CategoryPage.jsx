import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import apiKey from "../assets/data/key";
import CategoryResults from "../components/interface/CategoryResults";
import Explore from "../components/interface/Explore";
import { searchToggleContext } from "../components/layout/Layout";

export default function CategoryPage() {
  const keyword = useParams().id;
  const [feedback, setFeedback] = useState([]);
  const location = useLocation();
  const { apiKeyword, apistate } = location.state;
  const [title, setTitle] = useState("");
  const { setSearchOpen } = useContext(searchToggleContext);

  useEffect(() => {
    setTitle(location.state.title);
    setSearchOpen(false);
  }, [apistate]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Cinemate | Categories";
  }, [])

  const fetchMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/${apiKeyword}/${keyword}?api_key=${apiKey}`
      )
      .then((res) => {
        setFeedback(res.data.results);
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
    <div className="padding-top md:pt-[10rem]">
      <div className="flex padding flex-col-reverse gap-10 md:flex-row items-center justify-between mb-10">
        <p className="uppercase font-sans text-center text-white text-[1.75rem]">
          {title}
        </p>
      </div>
      <div className="margin">
        <CategoryResults apiKeyword={apiKeyword} feedback={feedback} />
      </div>
      <Explore />
    </div>
  );
}
