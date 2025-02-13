import React, { useState, useEffect } from "react";
import links from "../../assets/data/navLinks";
import Logo from "../../assets/images/Logos/Logo.png";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWindowSize } from "@uidotdev/usehooks";
import {
  faMagnifyingGlass,
  faBars,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../interface/SearchBox";
import { motion } from "framer-motion";

export default function Header() {
  const [navState, setNavState] = useState(false);
  const [clickedNav, setClickedNav] = useState(null);
  const [apiState, setApiState] = useState(false);
  const windowWidthSize = useWindowSize().width;
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > lastScrollTop) {
      setScrollingDown(true);
    } else {
      setScrollingDown(false);
    }
    setLastScrollTop(currentScrollPos);
  };

  function toggleNavClick(index) {
    if (clickedNav === index && windowWidthSize < 1024) {
      return setClickedNav(null);
    }
    setClickedNav(index);
  }

  function handleNavStateChange() {
    setNavState((prevState) => !prevState);
  }

  function handleLinkClick() {
    setNavState(false);
    setClickedNav(null);
    setApiState((prevState) => !prevState);
  }

  function handleSearchClick() {
    setSearchOpen((prevSearch) => !prevSearch);
  }

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 0.3,
      }}
      className={`paddingX flex justify-between items-center fixed ${
        scrollingDown ? "top-[-77px]" : "top-0"
      } h-[89px] right-0 left-0 z-20 transition-all header-style`}
    >
      <div
        onClick={handleNavStateChange}
        className="z-10 cursor-pointer lg:hidden"
      >
        <div className="flex items-center">
          <FontAwesomeIcon
            icon={faBars}
            className="text-primary text-[1.7rem]"
          />
        </div>
      </div>
      <Link to="/home">
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            bounce: 0.5,
            stiffness: 200,
            delay: 0.5,
          }}
          whileHover={{
            scale: 1.15,
          }}
          className="w-[4.5rem]"
          src={Logo}
          alt="Logo"
        />
      </Link>
      <nav className="flex">
        <ul
          className={`fixed z-50 inset-0 bg-black h-[100vh] w-[75%] flex flex-col ${
            navState ? "translate-x-[0%]" : "translate-x-[-100%]"
          } items-left padding pt-28 gap-10 text-white transition-all lg:static lg:flex-row lg:w-[unset] lg:h-[unset] lg:bg-[unset] lg:pt-0 lg:translate-x-[unset]`}
        >
          <NavLink onClick={handleLinkClick} to="/home">
            <motion.li
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                bounce: 0.5,
                delay: 0.7,
              }}
              whileHover={{
                scale: 1.15,
              }}
              className="font-heading font tracking-widest"
            >
              Home
            </motion.li>
          </NavLink>
          {links.map((navLink, index) => {
            return (
              <div key={navLink.id} className="lg:relative group">
                <motion.li
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    delay: 0.2 * index + 0.7,
                    bounce: 0.5,
                  }}
                  onClick={() => toggleNavClick(index)}
                  className="font-heading font mb-2 lg:m-0 flex cursor-pointer items-center gap-2 tracking-widest"
                >
                  {navLink.link}
                  <span>
                    <FontAwesomeIcon
                      icon={faCaretDown}
                      className={`text-primary transition-all pb-[.15rem] lg:group-hover:rotate-180 ${
                        clickedNav === index ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </span>
                </motion.li>
                <div
                  className={`static ${
                    clickedNav === index ? "block" : "hidden"
                  } lg:absolute lg:hidden lg:group-hover:block lg:top-[2rem] lg:w-[9rem] lg:left-[50%] lg:translate-x-[-50%] lg:text-center lg:bg-black lg:border-2 lg:border-primary lg:py-2 lg:rounded-lg z-10`}
                >
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
                          <motion.li
                            transition={{
                              type: "spring",
                              stiffness: 500,
                            }}
                            whileHover={{
                              scale: 1.15,
                            }}
                            className="font-sans font-semibold text-[0.9rem] text-priText-300 leading-[2.5rem] lg:text-[0.8rem]"
                          >
                            {extraLink.content}
                          </motion.li>
                        </NavLink>
                      </ul>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <NavLink onClick={handleLinkClick} to="/wishlist">
            <motion.li
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                bounce: 0.5,
                delay: 0.7,
              }}
              whileHover={{
                scale: 1.15,
              }}
              className="font-heading font tracking-widest"
            >
              Wishlist
            </motion.li>
          </NavLink>
        </ul>
        <button
          onClick={handleSearchClick}
          className="flex items-center gap-10 cursor-pointer"
        >
          <motion.label
            whileHover={{
              scale: 1.15,
              rotate: -10,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
            }}
            className="cursor-pointer"
            htmlFor="search-input"
          >
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-primary text-[1.5rem]"
            />
          </motion.label>
        </button>
      </nav>
      <div
        onClick={handleNavStateChange}
        className={`overflow fixed z-[40] lg:hidden inset-0 h-[100vh] w-full bg-opaque transition-all ${
          navState
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      ></div>

      {isSearchOpen && (
        <SearchBox
          searchWord={"Movies, TV Shows, Cast, Crew, Collection..."}
          isSearchOpen={isSearchOpen}
          setSearchOpen={setSearchOpen}
        />
      )}
    </motion.header>
  );
}
