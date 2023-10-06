import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

export default function PersonFeaturesFilter({ setCredit }) {
  const [isFilterOpen, setFilter] = useState(false);
  const [category, setCategory] = useState("Movies");

  function toggleFilter() {
    setFilter((prevFilter) => !prevFilter);
  }

  return (
    <div className="flex justify-between items-center mb-4 padding">
      <h2 className="text-[1.7rem] font-heading tracking-wider text-white mb-2">
        Features
      </h2>
      <button
        onClick={toggleFilter}
        className="bg-black px-5 rounded-sm py-2 relative"
      >
        <div className="flex items-center gap-6">
          <p className="custom-fz text-white font-semibold">{category}</p>
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
            className="text-[.9rem] text-white font-medium mb-3"
          >
            Movies
          </div>
          <div
            onClick={() => {
              setCredit("tv");
              setCategory("TV Shows");
            }}
            className="text-[.9rem] text-white font-medium"
          >
            TV Shows
          </div>
        </div>
      </button>
    </div>
  );
}
