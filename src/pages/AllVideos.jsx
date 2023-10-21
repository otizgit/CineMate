import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";
import TrendingTexts from "../components/TrendingTexts";
import YouTube from "react-youtube";
import { nanoid } from "nanoid";

export default function AllVideos() {
  const location = useLocation();
  const { allVideos, movieTitle } = location.state;

  useEffect(() => {
    document.title = `${movieTitle}- Videos`;
    window.scrollTo(0, 0);
  });

  const renderedVideos = allVideos.map((video) => {
    return (
      <div key={nanoid()}>
        <YouTube
          videoId={video.key}
          className="rounded-xl overflow-hidden"
          opts={{
            width: "100%",
            height: 350,
          }}
        />
      </div>
    );
  });
  return (
    <div className="padding pt-[120px] margin">
      <TrendingTexts title={`${movieTitle} videos`} />
      <div className="flex flex-col gap-16">
        {renderedVideos}
      </div>
    </div>
  );
}
