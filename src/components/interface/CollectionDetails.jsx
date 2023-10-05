import React from "react";

export default function CollectionDetails(props) {
  return (
    <div className="padding movie-margin lg:mb-0 lg:border-none lg:pb-0 border-b-2 pb-5 border-primary">
      {props.collectionData.name && (
        <p className="text-[2.1rem] mb-4 lg:mb-0 font-heading tracking-wider text-white">
          {`${props.collectionData.name}`}
        </p>
      )}
      {props.collectionData.overview && (
        <p className="custom-fz mb-4 text-white">
          {`${props.collectionData.overview}`}
        </p>
      )}
      {props.collectionData.parts && (
        <p className="custom-fz text-primary font-semibold">
          Number Of Movies:{" "}
          <span className="text-white font-normal">{`${props.collectionData.parts.length}`}</span>
        </p>
      )}
    </div>
  );
}
