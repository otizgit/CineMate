import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { headingAnimation } from "../../../animations/Animations";
import { Link } from "react-router-dom";

export default function WishlistFilter({ category, categories, keyword }) {
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isFilterOpen, setFilter] = useState(true);

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
      <div
        onMouseEnter={() => setFilter(true)}
        onMouseLeave={() => setFilter(false)}
        className="relative z-10 lg:w-[20rem] group"
      >
        <button
          onClick={() => setCategoryOpen((prevCategory) => !prevCategory)}
          className="border-2 w-full bg-black rounded-tr-xl rounded-tl-xl border-primary py-3 px-4"
        >
          <div className="flex justify-between items-center">
            <p className="text-white tracking-wider font-medium text-[.85rem]">
              {category}
            </p>
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`text-primary font group-hover:rotate-180 transition-all`}
            />
          </div>
        </button>
        <div
          className={`absolute group-hover:block z-[2] rounded-br-xl rounded-bl-xl border-primary overflow-hidden hidden bg-black border-2 top-[100%] w-full left-0`}
        >
          {isFilterOpen
            ? categories.map((category, index) => {
                return (
                  <div key={index}>
                    <div>
                      <Link onClick={() => setFilter(false)} to={category.link}>
                        <p
                          className={`${
                            category.param === keyword ? "bg-primary" : ""
                          } ${
                            index === 0 ? "mb-[0.13rem]" : ""
                          } tracking-wider w-[100%] hover:bg-primary hover:text-white text-[.8rem] text-white py-5 pl-4 text-left`}
                        >
                          {category.name}
                        </p>
                      </Link>
                    </div>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </div>
  );
}
