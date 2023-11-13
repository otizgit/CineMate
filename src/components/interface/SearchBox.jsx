import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function SearchBox(props) {
  const inputRef = useRef(null);
  const btnRef = useRef(null);
  const navigate = useNavigate();

  function handleSubmitClick() {
    const value = inputRef.current.value.trim();
    if (value === "") {
      toast.error("Please enter a value to search", {
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      props.setSearchOpen(false);
      inputRef.current.value = "";
      navigate(`/results/${value}`);
    }
  }

  function toggleSearch() {
    props.setSearchOpen(false);
    inputRef.current.value = "";
  }

  const handleEnterClick = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmitClick();
    }
  };

  function EscKeyEvent(event) {
    let key = event.keyCode;
    if (key == 27) {
      props.setSearchOpen(false);
    }
  }
  document.addEventListener("keydown", EscKeyEvent);

  return (
    <div className="fixed top-[90px] w-full left-0 z-[5] padding transition-all">
      <div className=" w-full flex items-center custom-shadow">
        <input
          onKeyDown={(e) => handleEnterClick(e)}
          autoFocus={props.isSearchOpen}
          ref={inputRef}
          className="focus:outline-none font-sans font-medium h-[3rem] px-4 text-black custom-fz w-full rounded-l-lg placeholder:text-[grey]"
          type="text"
          id="search-input"
          maxLength={35}
          placeholder={`Search for ${props.searchWord}`}
        />
        {props.isSearchOpen && (
          <button
            onClick={toggleSearch}
            className="h-[3rem] w-16 md:w-14 bg-[white] group"
          >
            <FontAwesomeIcon
              icon={faXmark}
              className="text-[red] text-xl group-hover:scale-[1.15] transition-all"
            />
          </button>
        )}
        <button
          onClick={handleSubmitClick}
          ref={btnRef}
          className="group bg-primary h-[3rem] w-16 md:w-14 rounded-r-lg"
        >
          <FontAwesomeIcon
            icon={faSearch}
            className="text-white text-[1.2rem] group-hover:scale-[1.15] transition-all"
          />
        </button>
      </div>
    </div>
  );
}
