import React from "react";
import ReviewsCard from "../Cards/ReviewsCard";
import TrendingTexts from "../../TrendingTexts";

export default function MovieReviews(props) {
  return props.reviews.length ? (
    <>
      <TrendingTexts
        title={"Review(s)"}
        subTitle={"Real reviews from users of TMDB"}
      />
      <div className="grid grid-cols-1 gap-10">
        {props.reviews.map((review, index) => {
          return <ReviewsCard key={review.id} index={index} review={review} />;
        })}
      </div>
    </>
  ) : null;
}
