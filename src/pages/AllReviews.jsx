import React, {useEffect} from "react";
import { useLocation } from "react-router-dom";
import ReviewsCard from "../components/interface/Cards/ReviewsCard";

export default function AllReviews() {
  const location = useLocation();
  const { allReviews, movieTitle } = location.state;

  const reviewsEl = allReviews.map((review) => {
    return <ReviewsCard key={review.id} review={review} />;
  });

  useEffect(() => {
    document.title = `${movieTitle} | Reviews`;
    window.scrollTo(0, 0);
  });

  return (
    <div className="pt-[120px] padding margin">
      <h2 className="text-[1.7rem] font-heading tracking-wider text-primary mb-6">
        Reviews
      </h2>
      <div className="flex flex-col gap-14">
        {reviewsEl}
      </div>
    </div>
  );
}
