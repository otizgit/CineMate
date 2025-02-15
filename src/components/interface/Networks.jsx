import React from "react";
import TrendingTexts from "../TrendingTexts";
import { motion } from "framer-motion";
import { fadeAnimation } from "../../animations/Animations";

export default function Networks(props) {
  return (
    <div className="paddingX max-width movie-margin">
      <TrendingTexts title="Networks" />
      <div className="flex gap-12 items-center flex-wrap">
        {props.networks.map((network, index) => {
          return (
            <motion.div
              variants={fadeAnimation}
              initial="init"
              whileInView="fade"
              viewport={{
                once: true,
              }}
              custom={index}
              key={network.id}
            >
              {network.logo_path ? (
                <img
                  className="w-[80px]"
                  src={`https://image.tmdb.org/t/p/w200${network.logo_path}`}
                  alt="network image"
                />
              ) : (
                <p className="font-bold text-primary text-[1.75rem] font-sans tracking-wider">
                  {network.name}
                </p>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
