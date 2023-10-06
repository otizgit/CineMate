import React from "react";
import { Link } from "react-router-dom";

export default function MovieExtraLinks(props) {
  return props.results.production_companies || props.keywords ? (
    <div className="flex gap-12 lg:flex-row flex-col movie-margin padding">
      {props.results.production_companies ? (
        <div className="flex-1">
          {props.results.production_companies.length ? (
            <h2 className="text-[1.7rem] font-heading tracking-wider text-primary mb-2">
              Production Companies
            </h2>
          ) : null}
          <div className="flex gap-4 flex-wrap">
            {props.results.production_companies.map((company) => {
              return (
                <Link
                  to={`/company/${company.name}/${company.id}`}
                  key={company.id}
                  className="py-1 px-3 rounded-lg border-2 border-primary w-[fit-content] flex"
                >
                  <p className="custom-fz text-white">
                    {company.name}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
      {props.keywords ? (
        <div className="flex-1">
          {props.keywords.length ? (
            <h2 className="text-[1.7rem] font-heading tracking-wider text-primary mb-2">
              Keywords
            </h2>
          ) : null}
          <div className="flex gap-4 flex-wrap">
            {props.keywords.map((movieKeyword) => {
              return (
                <Link
                to={`/keyword/${movieKeyword.name}/${movieKeyword.id}`}
                  key={movieKeyword.id}
                  className="py-1 px-3 rounded-lg border-2 border-primary w-[fit-content] flex"
                >
                  <p className="custom-fz text-white">
                    {movieKeyword.name}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  ) : null;
}
