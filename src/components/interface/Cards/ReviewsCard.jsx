import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser } from "@fortawesome/free-solid-svg-icons";

export default function ReviewsCard(props) {
  return (
    <div className="border-2 border-primary px-4 lg:px-9 py-6 rounded-xl custom-shadow">
      <div className="flex mb-5 items-center gap-4">
        {props.review.author_details.avatar_path ? (
          <img
            className="rounded-full border-2 border-primary w-[45px] h-[45px] object-cover"
            src={`https://image.tmdb.org/t/p/w45${props.review.author_details.avatar_path}`}
            alt="avatar path"
          />
        ) : (
          <div className="w-[45px] h-[45px] rounded-full border-2 border-primary grid place-items-center">
            <FontAwesomeIcon icon={faUser} className="text-primary custom-fz" />
          </div>
        )}
        <div>
          {props.review.author_details.username && (
            <p className="custom-fz text-white font-semibold">
              {props.review.author_details.username}
            </p>
          )}
          {props.review.author_details.rating && (
            <div className="flex items-center gap-2">
              <p className="text-priText-300 custom-fz font-medium">Rating:</p>
              {props.review.author_details.rating && (
                <div className="flex gap-1">
                  <FontAwesomeIcon icon={faStar} className="text-[gold] custom-fz pt-[.1rem]"/>
                  <p className="custom-fz text-primary font-medium">{`${props.review.author_details.rating}/10`}</p>

                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {props.review.content && (
        <p className="custom-fz mb-5 text-priText-300 leading-7 break-words">
          {props.review.content}
        </p>
      )}
      <div className="flex justify-between">
        {props.review.created_at && (
          <div>
            <p className="custom-fz text-primary font-medium">Created at:</p>
            <p className="custom-fz text-white">
              {props.review.created_at.slice(0, 10)}
            </p>
          </div>
        )}
        {props.review.updated_at && (
          <div>
            <p className="custom-fz text-primary font-medium">Updated at:</p>
            <p className="custom-fz text-white">
              {props.review.updated_at.slice(0, 10)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
