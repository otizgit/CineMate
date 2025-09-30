import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import Markdown from "react-markdown";

export default function ReviewsCard(props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        translateX: props.index % 2 === 0 ? 50 : -50,
      }}
      whileInView={{
        opacity: 1,
        translateX: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 200,
      }}
      className="border-2 border-primary bg-black px-4 lg:px-6 py-6 rounded-xl custom-shadow"
    >
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
                  <FontAwesomeIcon
                    icon={faStar}
                    className="text-[gold] custom-fz pt-[.1rem]"
                  />
                  <p className="custom-fz text-primary font-medium">{`${props.review.author_details.rating}/10`}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {props.review.content && (
        <p className="custom-fz mb-5 text-priText-300 leading-7 break-words">
          <Markdown>{props.review.content}</Markdown>
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
    </motion.div>
  );
}
