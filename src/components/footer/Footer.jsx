import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Logos/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faGithub,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="relative padding py-7 flex flex-col xl:flex-row xl:justify-between items-center xl:items-start bg-black justify-center gap-10">
      <div>
        <Link to="/home">
          <img className="w-[4.5rem]" src={Logo} alt="Logo" />
        </Link>
      </div>

      <div>
        <div className="flex flex-wrap justify-center gap-4">
          <a
            className="w-[3rem] h-[3rem] rounded-xl grid place-items-center bg-black border-2 border-primary hover:scale-110 transition"
            href="https://github.com/otizgit"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="text-[1.1rem] text-priText-300"
            />
          </a>
          <a
            className="w-[3rem] h-[3rem] rounded-xl grid place-items-center bg-black border-2 border-primary hover:scale-110 transition"
            href="https://twitter.com/dev_otiz"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faXTwitter}
              className="text-[1.1rem] text-priText-300"
            />
          </a>
          <a
            className="w-[3rem] h-[3rem] rounded-xl grid place-items-center bg-black border-2 border-primary hover:scale-110 transition"
            href="https://www.linkedin.com/in/emmanuel-oj/"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faLinkedinIn}
              className="text-[1.1rem] text-priText-300"
            />
          </a>
          <a
            className="w-[3rem] h-[3rem] rounded-xl grid place-items-center bg-black border-2 border-primary hover:scale-110 transition"
            href="https://www.instagram.com/_.otiz._/"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-[1.1rem] text-priText-300"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
