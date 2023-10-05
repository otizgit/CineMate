import React, { useEffect, useState } from "react";
import axios from "axios";
import apiKey from "../../assets/data/key";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import CategoryResults from "./CategoryResults";

export default function Trending(props) {
  const [feedback, setFeedback] = useState([]);

  const fetchMovies = async () => {
    const {
      data: { results },
  } = await axios.get(
      `https://api.themoviedb.org/3/discover/${props.apiWord}?api_key=${apiKey}`
    );
    setFeedback(results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="margin">
      <div className="padding">
        <div className="mb-6">
          <h1 className="text-[1.7rem] font-heading tracking-wider text-primary text-center md:text-left">
            {props.title}
          </h1>
          <p className="custom-fz text-priText-300 text-center md:text-left">
            <FontAwesomeIcon
              icon={faCaretRight}
              className="text-primary mr-2"
            />
            {props.subTitle}
          </p>
        </div>
      </div>
      <CategoryResults apiKeyword={props.apiWord} feedback={feedback} searchWord={props.searchWord} />
    </div>
  );
}
