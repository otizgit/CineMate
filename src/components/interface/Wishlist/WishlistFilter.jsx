import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { headingAnimation } from "../../../animations/Animations";
import { Link } from "react-router-dom";

export default function WishlistFilter({ keyword }) {
  const [category, setCategory] = useState("Movies");
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  //   const [currentCategory, setCurrentCategory] = useState("Movies");

  const categories = [
    {
      name: "Movies",
      param: "movies",
      link: "/wishlist/movies",
    },
    {
      name: "TV shows",
      param: "tv_shows",
      link: "/wishlist/tv_shows",
    },
  ];

  useEffect(() => {
    const activeCategory = categories.filter((category) =>
      category.param === keyword ? category.name : null
    );
    setCategory(activeCategory[0].name);
  }, [keyword]);

  window.addEventListener("keydown", (e) => {
    if (e.keyCode === 27) {
      setCategoryOpen(false);
    }
  });

  useEffect(() => {
    document.title = "CineMate | Wishlist";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="lg:flex justify-between items-center mb-10">
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
        Wishlist
      </motion.h1>
      <div className="relative z-10 lg:w-[20rem]">
        <button
          onClick={() => setCategoryOpen((prevCategory) => !prevCategory)}
          className="border-2 w-full bg-black rounded-xl border-primary py-3 px-4"
        >
          <div className="flex justify-between items-center">
            <p className="text-white tracking-wider font-medium text-[.85rem]">
              {category}
            </p>
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`text-primary font ${
                isCategoryOpen ? "rotate-180" : ""
              } transition-all`}
            />
          </div>
        </button>
        <div
          className={`absolute z-[2] ${
            isCategoryOpen ? "block" : "hidden"
          } rounded-xl border-primary overflow-hidden block bg-black border-2 top-[110%] w-full left-0`}
        >
          {isCategoryOpen &&
            categories.map((category) => {
              return (
                <div key={category.id}>
                  <div>
                    <Link
                      onClick={() => setCategoryOpen(false)}
                      to={category.link}
                    >
                      <p
                        className={`${
                          category.param === keyword ? "bg-primary" : ""
                        } tracking-wider w-[100%] hover:bg-primary hover:text-white text-[.8rem] text-white py-5 pl-4 text-left`}
                      >
                        {category.name}
                      </p>
                    </Link>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
