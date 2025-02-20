import React, { useState } from "react";
import searchLinks from "../../assets/data/searchLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { headingAnimation } from "../../animations/Animations";

export default function ResultsFilter(props) {
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState("Movies");

  function toggleCategoryView() {
    setCategoryOpen((prevCategory) => !prevCategory);
  }

  function handleFilterClick(link) {
    setCategoryOpen(false);
    props.setCategory(link);
  }

  window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
      setCategoryOpen(false);
    }
  });

  return (
    <div className="paddingX max-width lg:flex justify-between items-center mb-10">
      <div
        onClick={() => setCategoryOpen(false)}
        className={`fixed inset-0 z-10 ${isCategoryOpen ? "block" : "hidden"}`}
      ></div>
      <motion.h1
        variants={headingAnimation}
        initial="init"
        whileInView="animate"
        className="text-[1.7rem] mb-2 lg:mb-0 font-heading tracking-wider text-primary text-center md:text-left"
      >
        Search Results
      </motion.h1>
      <div className="relative z-10 lg:w-[20rem] group">
        <button
          onClick={toggleCategoryView}
          className="border-2 w-full bg-black rounded-tr-xl rounded-tl-xl border-primary py-3 px-4"
        >
          <div className="flex justify-between items-center">
            <p className="tracking-wider font-medium text-[.85rem]">
              {currentCategory}
            </p>
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`text-primary font group-hover:rotate-180 transition-all`}
            />
          </div>
        </button>
        <div
          className={`absolute z-[2] hidden group-hover:block rounded-br-xl rounded-bl-xl border-primary overflow-hidden bg-black border-2 top-[10z0%] w-full left-0`}
        >
          {searchLinks.map((links, index) => {
            return (
              <div key={links.id}>
                <div>
                  <button
                    onClick={() => {
                      handleFilterClick(links.keyword);
                      setCurrentCategory(links.link);
                    }}
                    className={`${
                      props.category === links.keyword ? "bg-primary" : ""
                    } 
                    ${
                      props.category && index !== 0 ? "my-[0.07rem]" : "mb-[0.03rem]"
                    }
                      tracking-wider w-[100%] hover:bg-primary hover:text-white text-[.8rem] text-white py-5 pl-4 text-left`}
                  >
                    {links.link}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
