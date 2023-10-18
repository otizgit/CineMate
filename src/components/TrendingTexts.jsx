import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { headingAnimation, opacityAnimation } from "../animations/Animations";

export default function TrendingTexts({ title, subTitle }) {
  return (
    <div>
      <div className="mb-6">
        <motion.h1
          variants={headingAnimation}
          initial="init"
          whileInView="animate"
          viewport={{
            once: true,
          }}
          className="text-[1.7rem] font-heading tracking-wider text-primary text-center md:text-left"
        >
          {title}
        </motion.h1>
        {subTitle && (
          <motion.p
            variants={opacityAnimation}
            initial="init"
            whileInView="opacity"
            viewport={{
              once: true,
            }}
            className="custom-fz text-priText-300 text-center md:text-left"
          >
            <FontAwesomeIcon
              icon={faCaretRight}
              className="text-primary mr-2"
            />
            {subTitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
