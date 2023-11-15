import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logos/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faGithub,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 1,
      }}
      className="relative padding py-10 lg:py-8 flex flex-col xl:flex-row xl:justify-between items-center xl:items-start bg-black justify-center gap-10"
    >
      <div>
        <Link to="/home">
          <motion.img
            transition={{
              type: "spring",
              bounce: 0.5,
              stiffness: 500,
            }}
            whileHover={{
              scale: 1.15,
            }}
            className="w-[4.5rem]"
            src={Logo}
            alt="Logo"
          />
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-14">
        <div className="flex flex-wrap justify-center gap-4">
          <motion.a
            transition={{
              type: "spring",
              bounce: 0.5,
              stiffness: 500,
            }}
            whileHover={{
              scale: 1.15,
            }}
            className="w-[3rem] h-[3rem] rounded-xl grid place-items-center bg-black"
            href="https://github.com/otizgit"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="text-[1.6rem] text-primary"
            />
          </motion.a>
          <motion.a
            transition={{
              type: "spring",
              bounce: 0.5,
              stiffness: 500,
            }}
            whileHover={{
              scale: 1.15,
            }}
            className="w-[3rem] h-[3rem] rounded-xl grid place-items-center bg-black"
            href="https://twitter.com/dev_otiz"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faXTwitter}
              className="text-[1.6rem] text-primary"
            />
          </motion.a>
          <motion.a
            transition={{
              type: "spring",
              bounce: 0.5,
              stiffness: 500,
            }}
            whileHover={{
              scale: 1.15,
            }}
            className="w-[3rem] h-[3rem] rounded-xl grid place-items-center bg-black"
            href="https://www.linkedin.com/in/emmanuel-oj/"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faLinkedinIn}
              className="text-[1.6rem] text-primary"
            />
          </motion.a>
          <motion.a
            transition={{
              type: "spring",
              bounce: 0.5,
              stiffness: 500,
            }}
            whileHover={{
              scale: 1.15,
            }}
            className="w-[3rem] h-[3rem] rounded-xl grid place-items-center bg-black"
            href="https://www.instagram.com/_.otiz._/"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-[1.6rem] text-primary"
            />
          </motion.a>
        </div>
        <Link to="/how-to-use">
          <motion.div
            transition={{
              type: "spring",
              bounce: 0.5,
              stiffness: 500,
            }}
            whileHover={{
              scale: 1.1,
            }}
            className="flex items-center gap-2 justify-center border-2 py-2 px-4 border-primary rounded-lg"
          >
            <FontAwesomeIcon icon={faQuestionCircle} className="text-primary" />
            <p className="text-priText-300 font-bold tracking-wide custom-fz">
              How To Use
            </p>
            <FontAwesomeIcon icon={faQuestionCircle} className="text-primary" />
          </motion.div>
        </Link>
      </div>
    </motion.footer>
  );
}
