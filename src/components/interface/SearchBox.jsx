import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { searchToggleContext } from "../layout/Layout";

export default function SearchBox(props) {
  const inputRef = useRef(null);
  const btnRef = useRef(null);
  const navigate = useNavigate();
  const { isSearchOpen, setSearchOpen } = useContext(searchToggleContext);
  const [triggerSearch, setTrigger] = useState(false);

  function handleSubmitClick() {
    const value = inputRef.current.value.trim();
    if (value === "") {
      toast.error("Please enter a TV show title", {
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setSearchOpen(false);
      inputRef.current.value = "";
      setTrigger((prevTrigger) => !prevTrigger);
      navigate(`/results/${value}`, { state: { trigger: triggerSearch } });
    }
  }

  function toggleSearch() {
    setSearchOpen(false);
    inputRef.current.value = "";
  }

  const handleEnterClick = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmitClick();
    }
  };

  return (
    <div className="text-primary w-full flex items-center custom-shadow">
      <input
        onKeyDown={(e) => handleEnterClick(e)}
        autoFocus={isSearchOpen}
        ref={inputRef}
        className="no-focus font-custom h-[3rem] px-4 text-black custom-fz w-full rounded-l-lg"
        type="text"
        id="search-input"
        maxLength={35}
        placeholder={`Search for ${props.searchWord}`}
      />
      {props.isHeaderSearch && (
        <button
          onClick={toggleSearch}
          className="h-[3rem] w-16 md:w-14 bg-[white]"
        >
          <FontAwesomeIcon icon={faXmark} className="text-red-600 text-xl" />
        </button>
      )}
      <button
        onClick={handleSubmitClick}
        ref={btnRef}
        className="bg-primary h-[3rem] w-16 md:w-14 rounded-r-lg"
      >
        <FontAwesomeIcon icon={faSearch} className="text-white" />
      </button>
    </div>
  );
}
