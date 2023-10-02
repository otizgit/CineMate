import React, { useEffect, useState } from "react";
import axios from "axios";
import apiKey from "../assets/data/key";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import PersonFeatures from "../components/interface/PersonFeatures";
import PersonPersonalInfo from "../components/interface/PersonPersonalInfo";

export default function PersonPage() {
  const [personData, setPersonData] = useState([]);
  const [personCredits, setPersonCredits] = useState([]);
  const [isFilterOpen, setFilter] = useState(false);
  const [credit, setCredit] = useState("movie");
  const [category, setCategory] = useState("Movies");

  const { id } = useParams();
  const fetchPersonData = () => {
    const getPersonData = axios.get(
      `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`
    );
    const getPersonCredits = axios.get(
      `https://api.themoviedb.org/3/person/${id}/${credit}_credits?api_key=${apiKey}`
    );
    axios
      .all([getPersonData, getPersonCredits])
      .then(
        axios.spread((...allData) => {
          setPersonData(allData[0].data);
          setPersonCredits(allData[1].data);
        })
      )
      .catch(() => {
        alert(
          "Oops, an error occured, please check your internet connection and try again."
        );
      });
  };

  useEffect(() => {
    document.title = `Cinemate | ${personData.name}`;
    window.scrollTo(0, 0);
  });

  useEffect(() => {
    fetchPersonData();
  }, [credit]);

  function toggleFilter() {
    setFilter((prevFilter) => !prevFilter);
  }

  return (
    <div className="pt-[110px]">
      <div className="padding lg:hidden">
        <PersonPersonalInfo personData={personData} />
      </div>

      <div className="px-6 hidden lg:block side-bar absolute w-[27%] top-[80px] pb-10 bottom-0 overflow-y-scroll">
        <PersonPersonalInfo personData={personData} />
      </div>

      <div className="lg:w-[73%] lg:ml-auto">
        {personData.biography ? (
          <div className="text-center lg:text-left border-b-2 border-primary pb-6 mb-6 padding">
            <p className="text-primary font-bold mb-2 text-[1.2rem]">Biography</p>
            <p className="custom-fz text-priText-300">{personData.biography}</p>
          </div>
        ) : null}
        <div className="flex justify-between items-center mb-4 padding">
          <h2 className="font-sans text-white text-[1.5rem] mb-2">Features</h2>
          <button
            onClick={toggleFilter}
            className="bg-black px-5 rounded-sm py-2 relative"
          >
            <div className="flex items-center gap-6">
              <p className="custom-fz text-white font-bold">{category}</p>
              <FontAwesomeIcon
                icon={faCaretDown}
                className="text-primary custom-fz"
              />
            </div>
            <div
              className={`absolute z-10 top-[100%] bg-black border-2 border-primary left-0 py-3 right-0 ${
                isFilterOpen ? "block" : "hidden"
              }`}
            >
              <div
                onClick={() => {
                  setCredit("movie");
                  setCategory("Movies");
                }}
                className="custom-fz text-white font-bold mb-3"
              >
                Movies
              </div>
              <div
                onClick={() => {
                  setCredit("tv");
                  setCategory("TV Shows");
                }}
                className="custom-fz text-white font-bold"
              >
                TV Shows
              </div>
            </div>
          </button>
        </div>

        <PersonFeatures credits={personCredits} creditKeyword={credit} />
      </div>
    </div>
  );
}
