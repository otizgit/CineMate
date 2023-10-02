import React from "react";
import CategoryResults from "./CategoryResults";

export default function PersonFeatures(props) {
  return (
    <div className="margin">
      {props.credits.cast  ? (
        <div className="mb-4">
          <h2 className="text-primary mb-4 font-sans text-[1.5rem] padding">
            Cast
          </h2>
          <CategoryResults
            apiKeyword={props.creditKeyword}
            feedback={props.credits.cast}
          />
        </div>
      ) : null}
      {props.credits.crew && props.credits.crew.length ? (
        <div>
          <div>
            <h2 className="text-primary mb-4 font-sans text-[1.75rem] padding">
              Crew
            </h2>
          </div>
          <CategoryResults
            apiKeyword={props.creditKeyword}
            feedback={props.credits.crew}
          />
        </div>
      ) : null}
    </div>
  );
}
