import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function TrendingTexts({ title, subTitle }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
  });
  const trendingHeadingAnimation = useAnimation();
  const trendingSubtitleAnimation = useAnimation();

  useEffect(() => {
    if (inView) {
      trendingHeadingAnimation.start({
        y: 0,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 400,
          duration: 1.2,
          bounce: 0.5,
        },
      });
      trendingSubtitleAnimation.start({
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 200,
          duration: 1.2,
          bounce: 0.5,
          delay: 0.2,
        },
      });
    }
    if (!inView) {
      trendingHeadingAnimation.start({
        y: 40,
        opacity: 0,
      });
      trendingSubtitleAnimation.start({
        opacity: 0,
      });
    }
  }, [inView]);

  return (
    <div>
      <div ref={ref} className="mb-6">
        <motion.h1
          animate={trendingHeadingAnimation}
          className="text-[1.7rem] font-heading tracking-wider text-primary text-center md:text-left"
        >
          {title}
        </motion.h1>
        {subTitle && (
          <motion.p
            animate={trendingSubtitleAnimation}
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
