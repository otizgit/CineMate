import React from "react";
import CategoryResults from "./CategoryResults";
import TrendingTexts from "../TrendingTexts";

export default function PersonFeatures(props) {
  return (
    <div className="margin">
      {props.credits.cast ? (
        <div className="mb-4">
          <div className="padding">
            <TrendingTexts title="Cast" />
          </div>
          <CategoryResults
            apiKeyword={props.creditKeyword}
            feedback={props.credits.cast}
          />
        </div>
      ) : null}
      {props.credits.crew && props.credits.crew.length ? (
        <div>
          <div className="padding">
            <TrendingTexts title="Crew" />
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
