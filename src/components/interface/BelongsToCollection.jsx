import React from "react";
import { motion } from "framer-motion";
import {
  headingAnimation,
  opacityAnimation,
} from "../../animations/Animations";
import { Link } from "react-router-dom";

export default function BelongsToCollection({ collection }) {
  const collectionStyle = {
    backgroundImage: `linear-gradient(to right, #000000e1, rgba(0, 0, 0, .8)), url(https://image.tmdb.org/t/p/w1280${collection.backdrop_path})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
  return (
    <div
      className="h-[350px] md:h-[300px] py-5 lg:py-20 padding rounded-xl text-center lg:text-left"
      style={collectionStyle}
    >
      <motion.h1
        variants={headingAnimation}
        initial="init"
        whileInView="animate"
        className="text-[1.7rem] font-heading tracking-wider mb-5 lg:mb-2 text-primary text-center lg:text-left lg:text-[2.3rem]"
      >{`Part of ${collection.name}`}</motion.h1>
      <motion.div
        variants={opacityAnimation}
        initial="init"
        whileInView="opacity"
        viewport={{
          once: true,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          bounce: 0.5,
        }}
        whileHover={{
          scale: 1.07,
          originX: 0,
        }}
        className="w-[fit-content] mx-auto lg:mx-0"
      >
        <Link to={`/collection/${collection.name}/${collection.id}`} className="bg-black py-2 px-3 rounded-lg border-2 border-primary text-priText-300 custom-fz">
          View The Collection
        </Link>
      </motion.div>
    </div>
  );
}
