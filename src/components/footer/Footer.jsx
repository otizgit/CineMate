import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/images/Logos/Logo.png";
import links from "../../assets/data/navLinks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faGithub,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  const [apiState, setApiState] = useState(false);
  function handleLinkClick() {
    setApiState((prevState) => !prevState);
  }

  return (
    <footer className="relative padding py-14 xl:py-12 flex flex-col xl:flex-row xl:justify-between items-center xl:items-start bg-black justify-center gap-20">
      <div className="basis-full">
        <Link to="/home">
          <img className="w-[4.5rem]" src={Logo} alt="Logo" />
        </Link>
      </div>

      <div className="basis-full">
        <div>
          <nav>
            <ul className="flex flex-col xl:flex-row gap-10 lg:gap-14">
              {links.map((navLink) => {
                return (
                  <div key={navLink.id}>
                    <li className="text-[1.2rem] font-heading text-center text-primary cursor-pointer tracking-widest">
                      {navLink.link}
                    </li>
                    <div>
                      {navLink.extraLinks.map((extraLink) => {
                        return (
                          <ul key={extraLink.content}>
                            <NavLink
                              onClick={handleLinkClick}
                              to={extraLink.navigationTo}
                              state={{
                                title: extraLink.content,
                                apistate: apiState,
                                apiKeyword: navLink.keyword,
                                searchWord: navLink.searchWord,
                              }}
                            >
                              <li className="text-center font-sans text-[0.9rem] text-white leading-[2.5rem] lg:hover:scale-110 md:transition lg:hover:underline lg:hover:text-primary lg:text-[0.8rem]">
                                {extraLink.content}
                              </li>
                            </NavLink>
                          </ul>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
      <div className="basis-full w-full">
        <div className="flex flex-wrap justify-center gap-4">
          <a
            className="w-[3rem] h-[3rem] rounded-xl grid place-items-center bg-black border-2 border-primary hover:scale-110 transition"
            href="https://github.com/otizgit"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="text-[1.2rem] text-priText-300"
            />
          </a>
          <a
            className="w-[3rem] h-[3rem] rounded-xl grid place-items-center bg-black border-2 border-primary hover:scale-110 transition"
            href="https://twitter.com/dev_otiz"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faXTwitter}
              className="text-[1.2rem] text-priText-300"
            />
          </a>
          <a
            className="w-[3rem] h-[3rem] rounded-xl grid place-items-center bg-black border-2 border-primary hover:scale-110 transition"
            href="https://www.linkedin.com/in/emmanuel-oj/"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faLinkedinIn}
              className="text-[1.2rem] text-priText-300"
            />
          </a>
          <a
            className="w-[3rem] h-[3rem] rounded-xl grid place-items-center bg-black border-2 border-primary hover:scale-110 transition"
            href="https://www.instagram.com/_.otiz._/"
            target="_blank"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-[1.2rem] text-priText-300"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
