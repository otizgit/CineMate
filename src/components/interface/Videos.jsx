import React from "react";
import TrendingTexts from "../TrendingTexts";
import YouTube from "react-youtube";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeAnimation } from "../../animations/Animations";

export default function Videos({ videos, title }) {
  const validVideos = [];
  videos.map((video) => {
    if (video.name.indexOf("(removed)") !== 0) {
      validVideos.push(video);
    } else {
      return null;
    }
  });

  return (
    <div className="padding">
      <TrendingTexts title="Related video(s)" />
      <div>
        <YouTube
          className="rounded-xl overflow-hidden"
          opts={{
            width: "100%",
            height: 350,
          }}
          videoId={validVideos[0].key}
        />
      </div>
      {validVideos.length >= 1 ? (
        <Link
          to={`/${title}/all-videos`}
          state={{
            allVideos: validVideos.slice(0, 10),
            movieTitle: title,
          }}
        >
          <motion.p
            variants={fadeAnimation}
            initial="init"
            whileInView="fade"
            viewport={{
              once: true
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              bounce: 0.5,
            }}
            whileHover={{
              scale: 1.15,
            }}
            className="text-primary mt-4 font-medium inline-block"
          >
            View All Videos
          </motion.p>
        </Link>
      ) : null}
    </div>
  );
}
