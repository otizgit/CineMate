import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReviewsCard from "../components/interface/Cards/ReviewsCard";
import TrendingTexts from "../components/TrendingTexts";

export default function AllReviews() {
  const location = useLocation();
  const { allReviews, movieTitle } = location.state;

  const reviewsEl = allReviews.map((review, index) => {
    return <ReviewsCard key={review.id} index={index} review={review} />;
  });

  useEffect(() => {
    document.title = `${movieTitle} | Reviews`;
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-[120px] paddingX max-width margin overflow-x-hidden">
      <TrendingTexts title={`Reviews of ${movieTitle}`} />
      <div className="flex flex-col gap-14">{reviewsEl}</div>
    </div>
  );
}
