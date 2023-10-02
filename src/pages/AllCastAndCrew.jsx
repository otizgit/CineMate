import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";

export default function AllCastAndCrew() {
  const location = useLocation();
  const { allCast, movieTitle, allCrew } = location.state;

  useEffect(() => {
    document.title = `${movieTitle} | All Cast and Crew`;
    window.scrollTo(0, 0);
  }, []);

  const castElements = allCast.map((cast) => {
    return (
      <Link
        to={`/person/${cast.name}/${cast.id}`}
        key={nanoid()}
        className="group"
      >
        <div className="flex items-center gap-6">
          {cast.profile_path ? (
            <img
              className="w-[8rem] rounded-xl border-2 border-primary group-hover:scale-110 transition-all"
              src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
              alt="cast profile image"
            />
          ) : (
            <div className="w-[6rem] h-[10rem] grid place-items-center">
              <FontAwesomeIcon
                icon={faUser}
                className="text-[2rem] text-primary"
              />
            </div>
          )}
          <div>
            <p className="mb-[3px] text-white text-[1.2rem] font-custom md:text-base font-medium text-center">
              {cast.name}
            </p>
            <p className="text-[1rem] lg:text-[.8rem] text-priText-300 font-custom md:text-sm text-center">
              {cast.character}
            </p>
          </div>
        </div>
      </Link>
    );
  });

  const crewElements = allCrew.map((crew) => {
    return (
      <Link
        to={`/person/${crew.name}/${crew.id}`}
        key={nanoid()}
        className="group"
      >
        <div className="flex items-center gap-6">
          {crew.profile_path ? (
            <img
              className="w-[8rem] rounded-xl border-2 border-primary group-hover:scale-110 transition-all"
              src={`https://image.tmdb.org/t/p/w500${crew.profile_path}`}
              alt="crew profile image"
            />
          ) : (
            <div className="w-[6rem] h-[10rem] grid place-items-center">
              <FontAwesomeIcon
                icon={faUser}
                className="text-[2rem] text-primary"
              />
            </div>
          )}
          <div>
            <p className="mb-[3px] text-white text-[1.2rem] font-custom md:text-base font-medium text-center">
              {crew.name}
            </p>
            <p className="text-[1rem] lg:text-[.8rem] text-priText-300 font-custom md:text-sm text-center">
              {crew.known_for_department}
            </p>
          </div>
        </div>
      </Link>
    );
  });

  return (
    <div className="pt-[100px] padding margin">
      <div className="movie-margin border-b-2 border-primary pb-[6rem]">
        <h2 className="font-sans text-white text-[1.6rem] mb-4 tracking-wider">
          Cast
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-12">
          {castElements}
        </div>
      </div>

      <div>
        <h2 className="font-sans text-white text-[1.6rem] mb-4 tracking-wider">
          Crew
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-12">
          {crewElements}
        </div>
      </div>
    </div>
  );
}
