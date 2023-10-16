import React from "react";

export default function Networks(props) {
  return (
    <div className="padding movie-margin">
      <h2 className="text-[1.7rem] font-heading tracking-wider text-primary mb-6 text-center md:text-left">
        Networks
      </h2>
      <div className="flex gap-12 items-center flex-wrap">
        {props.networks.map((network) => {
          return (
            <div key={network.id}>
              {network.logo_path ? (
                <img
                  className="w-[120px]"
                  src={`https://image.tmdb.org/t/p/w200${network.logo_path}`}
                  alt="network image"
                />
              ) : 
              <p className="font-bold text-primary text-[1.75rem] font-sans tracking-wider">{network.name}</p>
              }
            </div>
          );
        })}
      </div>
    </div>
  );
}
