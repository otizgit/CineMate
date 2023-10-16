import React, { useState } from "react";
import links from "../../assets/data/navLinks";
import Logo from "../../assets/images/Logos/Logo.png";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWindowSize } from "@uidotdev/usehooks";
import {
  faMagnifyingGlass,
  faBars,
  faXmark,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import SearchBox from "../interface/SearchBox";

export default function Header() {
  const [navState, setNavState] = useState(false);
  const [clickedNav, setClickedNav] = useState(null);
  const [apiState, setApiState] = useState(false);
  const windowWidthSize = useWindowSize().width;
  const [isSearchOpen, setSearchOpen] = useState(false);

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
    <header
      className={`padding py-5 flex justify-between items-center fixed top-0 right-0 left-0 z-20 transition-all header-style`}
    >
      <div
        onClick={handleNavStateChange}
        className="z-10 cursor-pointer lg:hidden"
      >
        {navState ? (
          <FontAwesomeIcon
            icon={faXmark}
            className="text-primary text-[1.7rem]"
          />
        ) : (
          <FontAwesomeIcon
            icon={faBars}
            className="text-primary text-[1.7rem]"
          />
        )}
      </div>
      <Link to="/home">
        <img className="w-[4.5rem]" src={Logo} alt="Logo" />
      </Link>
      <nav className="flex">
        <ul
          className={`fixed z-50 inset-0 bg-black h-[100vh] w-[75%] flex flex-col ${
            navState ? "translate-x-[0%]" : "translate-x-[-100%]"
          } items-left padding pt-28 gap-10 text-white transition-all lg:static lg:flex-row lg:w-[unset] lg:h-[unset] lg:bg-[unset] lg:pt-0 lg:translate-x-[unset]`}
        >
          <NavLink onClick={handleLinkClick} to="/home">
            <li className="font-heading font hover:scale-110 transition tracking-widest">
              Home
            </li>
          </NavLink>
          {links.map((navLink, index) => {
            return (
              <div key={navLink.id} className="lg:relative group">
                <li
                  onClick={() => toggleNavClick(index)}
                  className="font-heading font mb-2 lg:m-0 flex cursor-pointer items-center gap-2 lg:hover:scale-110 md:transition tracking-widest"
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
                </li>
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
                          <li className="font-sans font-semibold text-[0.9rem] text-priText-300 leading-[2.5rem] lg:hover:scale-110 md:transition lg:hover:underline lg:text-[0.8rem]">
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
        <button
          onClick={handleSearchClick}
          className="flex items-center gap-10 cursor-pointer"
        >
          <label className="cursor-pointer" htmlFor="search-input">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-primary text-[1.5rem] hover:scale-110 transition"
            />
          </label>
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

      <SearchBox
        searchWord={"Movies, TV Shows, Cast, Crew..."}
        isSearchOpen={isSearchOpen}
        setSearchOpen={setSearchOpen}
      />
    </header>
  );
}
