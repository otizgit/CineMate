import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKey from "../assets/data/key";
import { useParams } from "react-router-dom";

export default function SelectedSeason() {
  const { season, title, id } = useParams();
  const [seasonData, setSeasonData] = useState([]);

  const fetchSeasonData = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=${apiKey}`
      )
      .then((res) => setSeasonData(res.data))
      .catch(() => {
        alert(
          "Oops, an error occured, please check your internet connection and try again."
        );
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${title} | ${
      season !== "Specials" ? "Season " + season : season
    }`;
  });

  useEffect(() => {
    fetchSeasonData();
    console.log(seasonData);
  }, []);

  return (
    <div>
      <p></p>
    </div>
  );
}
