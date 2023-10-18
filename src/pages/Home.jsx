import React, { useEffect, useState } from "react";
import Hero from "../components/interface/Hero";
import Trending from "../components/interface/Trending";
import Explore from "../components/interface/Explore";
import Preloader from "../components/interface/Preloader";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `CineMate | Home`;
  });

  const [movieLoad, setMovieLoad] = useState(false);
  const [TvShowLoad, setTvShowLoad] = useState(false);

  if (!movieLoad && !TvShowLoad) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "scroll";
  }

  return (
    <>
      {!movieLoad && !TvShowLoad ? <Preloader /> : null}

      <div className="relative">
        <Hero />
        <Trending
          title="Trending Movies"
          subTitle="Explore the latest and popular movies"
          apiWord="movie"
          searchWord="movie"
          setMovieLoad={setMovieLoad}
        />
        <Trending
          title="Trending TV Shows"
          subTitle="Explore the latest and popular TV Shows"
          apiWord="tv"
          searchWord="TV Show"
          setTvShowLoad={setTvShowLoad}
        />
        <Explore />
      </div>
    </>
  );
}
