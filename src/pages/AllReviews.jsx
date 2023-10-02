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
  }, []);

  return (
    <div className="pt-[100px] padding margin">
      <h2 className="font-sans text-white text-[1.6rem] mb-6 tracking-wider">
        Reviews
      </h2>
      <div className="flex flex-col gap-14">
        {reviewsEl}
      </div>
    </div>
  );
}
