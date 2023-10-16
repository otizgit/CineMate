import React, { useEffect, useState } from "react";
import axios from "axios";
import apiKey from "../assets/data/key";
import { useParams } from "react-router-dom";
import PersonFeatures from "../components/interface/PersonFeatures";
import PersonPersonalInfo from "../components/interface/PersonPersonalInfo";
import PersonFeaturesFilter from "../components/interface/PersonFeaturesFilter";
import ImageOverlay from "../components/interface/ImageOverlay";

export default function PersonPage() {
  const { id } = useParams();
  const [personData, setPersonData] = useState([]);
  const [personCredits, setPersonCredits] = useState([]);
  const [credit, setCredit] = useState("movie");
  const [images, setImages] = useState([]);
  const [overlay, setOverlay] = useState(false);

  const fetchPersonData = () => {
    const getPersonData = axios.get(
      `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`
    );
    const getPersonCredits = axios.get(
      `https://api.themoviedb.org/3/person/${id}/${credit}_credits?api_key=${apiKey}`
    );
    const getImages = axios.get(
      `https://api.themoviedb.org/3/person/${id}/images?api_key=${apiKey}`
    );

    axios
      .all([getPersonData, getPersonCredits, getImages])
      .then(
        axios.spread((...allData) => {
          setPersonData(allData[0].data);
          setPersonCredits(allData[1].data);
          setImages(allData[2].data);
        })
      )
      .catch(() => {
        alert(
          "Oops, an error occured, please check your internet connection and try again."
        );
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.title = `Cinemate | ${personData.name}`;
  });

  useEffect(() => {
    fetchPersonData();
  }, [credit]);

  return (
    <div className="pt-[77px] lg:pt-[120px]">
      <div className="padding lg:hidden">
        <PersonPersonalInfo personData={personData} setOverlay={setOverlay} />
      </div>

      <div className="px-6 hidden lg:block absolute w-[27%] top-[77px] bottom-0 pb-10 overflow-y-auto side-bar border-primary">
        <PersonPersonalInfo personData={personData} setOverlay={setOverlay} />
      </div>

      <div className="lg:w-[73%] lg:ml-auto">
        {personData.biography ? (
          <div className="text-center lg:text-left border-b-2 border-primary pb-10 mb-6 padding">
            <p className="font-heading tracking-wider text-primary mb-2 text-[1.5rem]">
              Biography
            </p>
            <p className="custom-fz text-priText-300">{personData.biography}</p>
          </div>
        ) : null}

        <PersonFeaturesFilter setCredit={setCredit} />

        <PersonFeatures credits={personCredits} creditKeyword={credit} />
      </div>

      {overlay && (
        <ImageOverlay
          images={images.profiles.slice(0, 20)}
          setOverlay={setOverlay}
        />
      )}
    </div>
  );
}
