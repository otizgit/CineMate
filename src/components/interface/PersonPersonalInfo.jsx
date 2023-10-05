import React from "react";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function PersonPersonalInfo(props) {
  function calculateAge(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }
  const birthdate = props.personData.birthday;
  const age = calculateAge(birthdate);

  return (
    <div>
      {props.personData.profile_path ? (
        <img
          className="w-[13rem] lg:w-[16rem] mx-auto rounded-xl lg:rounded-tr-none lg:rounded-tl-none mb-6"
          src={`https://image.tmdb.org/t/p/w500${props.personData.profile_path}`}
          alt={`${props.personData.name}'s image`}
        />
      ) : (
        <div className="mb-6 grid place-items-center lg:pt-[40px]">
          <FontAwesomeIcon icon={faUser} className="text-primary text-[7rem]" />
        </div>
      )}
      <div className="text-center">
        <h2 className="font-heading tracking-wider text-white text-[2.1rem] mb-2">
          {props.personData.name}
        </h2>
        <p className="custom-fz font-semibold text-primary mb-4">
          Known For:{" "}
          <span className="text-white font-normal">
            {props.personData.known_for_department}
          </span>
        </p>
        <p className="custom-fz font-semibold text-primary mb-4">
          Gender:{" "}
          <span className="text-white font-normal">
            {props.personData.gender == 2 ? "Male" : "Female"}
          </span>
        </p>
        {props.personData.birthday ? (
          <p className="custom-fz font-semibold text-primary mb-4">
            Birthdate:{" "}
            <span className="text-white font-normal">
              {props.personData.birthday} ({age} years old)
            </span>
          </p>
        ) : null}
        {props.personData.deathday ? (
          <p className="custom-fz font-semibold text-primary mb-4">
            Deathdate:{" "}
            <span className="text-white font-normal">
              {props.personData.deathday}
            </span>
          </p>
        ) : null}
        {props.personData.place_of_birth ? (
          <p className="custom-fz font-semibold text-primary mb-4">
            Place Of Birth:{" "}
            <span className="text-white font-normal">
              {props.personData.place_of_birth}
            </span>
          </p>
        ) : null}
        {props.personData.also_known_as &&
        props.personData.also_known_as.length ? (
          <div className="hidden lg:block">
            <p className="custom-fz font-semibold text-primary">Also Known As: </p>
            <div className="mb-6">
              {props.personData.also_known_as.map((names) => {
                return (
                  <p key={nanoid()} className="custom-fz text-white">
                    {names}
                  </p>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
