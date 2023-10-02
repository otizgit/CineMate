import React, { useEffect } from "react";
import Hero from "../components/interface/Hero";
import Trending from "../components/interface/Trending";
import Explore from "../components/interface/Explore";

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `CineMate | Home`;
  },[])
  
  return (
    <div className="relative">
      <Hero />
      <Trending
        title="Trending Movies"
        subTitle="Explore the latest and popular movies"
        apiWord="movie"
        searchWord="movie"
      />
      <Trending
        title="Trending TV Shows"
        subTitle="Explore the latest and popular TV Shows"
        apiWord="tv"
        searchWord="TV Show"
      />
      <Explore />
    </div>
  );
}
