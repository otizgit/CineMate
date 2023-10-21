import React from "react";
import YouTube from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { bopAnimation } from "../../animations/Animations";

export default function TrailerOverlay({ trailerVideo, setTrailerOverlay }) {
  function hideOverlay() {
    setTrailerOverlay(false);
    document.body.style.overflowY = "scroll";
  }

  return (
    <motion.div
      variants={bopAnimation}
      initial="init"
      animate="bop"
      className="fixed inset-0 w-full h-full z-[10000] padding overflow-y-auto"
    >
      <div className="padding absolute z-[12000] pt-7 w-full right-0 flex justify-end">
        <FontAwesomeIcon
          onClick={hideOverlay}
          icon={faX}
          className="text-[red] text-[1.5rem] cursor-pointer hover:scale-110 transition-all"
        />
      </div>

      <div
        onClick={hideOverlay}
        className="absolute w-full h-full left-0 header-style"
      ></div>

      <div className="padding absolute w-full left-0 lg:w-[70%] max-w-[1400px] lg:left-[50%] top-[50%] lg:translate-x-[-50%] translate-y-[-50%]">
        <YouTube
          videoId={trailerVideo[0].key}
          opts={{
            width: '100%',
            playerVars: {
              autoplay: 1,
            },
          }}
          className="border-2 border-primary rounded-xl overflow-hidden"
        />
      </div>
    </motion.div>
  );
}
