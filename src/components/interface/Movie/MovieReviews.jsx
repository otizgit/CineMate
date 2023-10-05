import React from "react";
import ReviewsCard from "../Cards/ReviewsCard";

export default function MovieReviews(props) {
  return props.reviews.length ? (
    <div className="padding">
      <div className="mb-6">
        <h2 className="text-[1.7rem] font-heading tracking-wider text-primary">
          Review(s)
        </h2>
        <p className="custom-fz text-priText-300">
          Real reviews from users of TMDB
        </p>
      </div>
      <div className="grid grid-cols-1 gap-10">
        {props.reviews.map((review) => {
          return <ReviewsCard key={review.id} review={review} />;
        })}
      </div>
    </div>
  ) : null;
}
