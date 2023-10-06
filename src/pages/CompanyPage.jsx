import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiKey from "../assets/data/key";

export default function CompanyPage() {
  const { name, id } = useParams();
  const [companyDetails, setCompanyDetails] = useState([]);

  const fetchCompanyData = () => {
    axios
      .get(`https://api.themoviedb.org/3/company/${id}?api_key=${apiKey}`)
      .then((res) => setCompanyDetails(res.data))
      .catch(() => {
        alert(
          "Oops, an error occured, please check your internet connection and try again."
        );
      });
  };

  useEffect(() => {
    document.title = `Cinemate | ${name.toUpperCase()}`;
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchCompanyData();
  }, []);

  return (
    <div className="padding pt-[120px] margin flex gap-16 flex-col items-center">
      {companyDetails.logo_path ? (
        <img
          className="w-full lg:w-[20rem]"
          src={`https://image.tmdb.org/t/p/w500${companyDetails.logo_path}`}
          alt="company image"
        />
      ) : (
        <p className="font-bold text-primary text-[1.75rem] font-sans tracking-wider">
          {companyDetails.name}
        </p>
      )}

      <div className="text-center">
        <h2 className="text-[1.7rem] font-heading tracking-wider text-white mb-4">
          {companyDetails.name}
        </h2>
        {companyDetails.origin_country ? (
          <p className="custom-fz font-bold text-primary mb-4">
            Origin Country:{" "}
            <span className="text-priText-300 font-normal">
              {companyDetails.origin_country}
            </span>
          </p>
        ) : null}

        {companyDetails.headquarters ? (
          <p className="custom-fz font-bold text-primary mb-4">
            Headquarters:{" "}
            <span className="text-priText-300 font-normal">
              {companyDetails.headquarters}
            </span>
          </p>
        ) : null}

        {companyDetails.homepage ? (
          <p className="custom-fz font-bold text-primary mb-4">
            Homepage:{" "}
            <span>
              <a
                className="text-priText-300 font-normal hover:text-blue-600"
                href={companyDetails.homepage}
              >
                {companyDetails.homepage}
              </a>
            </span>
          </p>
        ) : null}

        {companyDetails.description ? (
          <p className="custom-fz text-priText-300 font-normal">
              {companyDetails.description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
