import React from "react";
import { nanoid } from "nanoid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { slideAnimation, fadeAnimation } from "../../animations/Animations";

export default function PersonPersonalInfo({ personData, setOverlay }) {
  function calculateAge(birthdate) {
    let olderDate;
    let olderMonth;
    let olderDay;
    if (personData.deathday) {
      olderDate = parseInt(personData.deathday.slice(0,4))
      olderMonth = parseInt(personData.deathday.slice(5,7))
      olderDay = parseInt(personData.deathday.slice(-2))
    } else {
      olderDate = new Date().getFullYear()
      olderMonth = new Date().getMonth()
      olderDay = new Date().getDate()
    }
    const birthDate = new Date(birthdate);
    let age = olderDate - birthDate.getFullYear();
    const monthDiff = olderMonth - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && olderDay < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }
  const birthdate = personData.birthday;
  const age = calculateAge(birthdate);

  function toggleImageOverlay() {
    document.body.style.overflow = "hidden";
    setOverlay(true);
  }

  return (
    <div>
      {personData.profile_path ? (
        <motion.img
          variants={slideAnimation}
          initial="init"
          animate="slide"
          transition={{
            type: "spring",
            stiffness: 500,
          }}
          whileHover={{
            scale: 1.07,
          }}
          onClick={toggleImageOverlay}
          className="w-[13rem] lg:w-[16rem] mx-auto rounded-xl lg:rounded-tr-none mt-10 lg:rounded-tl-none mb-6 cursor-pointer"
          src={`https://image.tmdb.org/t/p/w500${personData.profile_path}`}
          alt={`${personData.name}'s image`}
        />
      ) : (
        <motion.div
          variants={slideAnimation}
          initial="init"
          animate="slide"
          transition={{
            type: "spring",
            stiffness: 500,
          }}
          whileHover={{
            scale: 1.07,
          }}
          className="mb-6 grid place-items-center lg:pt-[40px]"
        >
          <FontAwesomeIcon icon={faUser} className="text-primary text-[7rem]" />
        </motion.div>
      )}
      <div className="text-center">
        <motion.h2
          variants={fadeAnimation}
          initial="init"
          animate="fade"
          custom={1}
          className="font-heading tracking-wider text-white text-[1.7rem] mb-2"
        >
          {personData.name}
        </motion.h2>
        <motion.p
          variants={fadeAnimation}
          initial="init"
          animate="fade"
          custom={2}
          className="custom-fz font-semibold text-primary mb-4"
        >
          Known For:{" "}
          <span className="text-white font-normal">
            {personData.known_for_department}
          </span>
        </motion.p>
        <motion.p
          variants={fadeAnimation}
          initial="init"
          animate="fade"
          custom={3}
          className="custom-fz font-semibold text-primary mb-4"
        >
          Gender:{" "}
          <span className="text-white font-normal">
            {personData.gender == 2 ? "Male" : "Female"}
          </span>
        </motion.p>
        {personData.birthday ? (
          <motion.p
            variants={fadeAnimation}
            initial="init"
            animate="fade"
            custom={1}
            className="custom-fz font-semibold text-primary mb-4"
          >
            Birthdate:{" "}
            <span className="text-white font-normal">
              {personData.birthday} ({age} years old)
            </span>
          </motion.p>
        ) : null}
        {personData.deathday ? (
          <motion.p
            variants={fadeAnimation}
            initial="init"
            animate="fade"
            custom={1}
            className="custom-fz font-semibold text-primary mb-4"
          >
            Deathdate:{" "}
            <span className="text-white font-normal">
              {personData.deathday}
            </span>
          </motion.p>
        ) : null}
        {personData.place_of_birth ? (
          <p className="custom-fz font-semibold text-primary mb-4">
            Place Of Birth:{" "}
            <span className="text-white font-normal">
              {personData.place_of_birth}
          </span>
          </p>
        ) : null}
        {personData.also_known_as && personData.also_known_as.length ? (
          <div className="hidden lg:block">
            <p className="custom-fz font-semibold text-primary">
              Also Known As:{" "}
            </p>
            <div className="mb-6">
              {personData.also_known_as.map((names) => {
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
