import React from "react";
import { BASE_URL } from "../../API/urls";
import Rate from "../reusableComponents/FixedRatatingComponent";
const WANT_TO_READ = "Want to read";
const CURRENTLY_READING = "Currently reading";
const READ = "Read";
export default function ReviewComponent({
  authorName,
  authorImg,
  review,
  rating,
  shelf,
}) {
  const getShelfName = (shelfNumber) => {
    if (shelfNumber === 1) return WANT_TO_READ;
    if (shelfNumber === 2) return CURRENTLY_READING;
    if (shelfNumber === 3) return READ;
  };
  return (
    <div className="row mt-2  ">
      <div className="col-2 col-sm-1">
        <img src={`${BASE_URL}/${authorImg}`} alt="" />
      </div>
      <div className="col">
        <span className="text-success"> {authorName}</span> rate it
        <Rate value={rating} />
        <div>
          <span className="text-success">Shelfs:</span> {getShelfName(shelf)}
        </div>
        <div>
          <p className="text-justify">{review}</p>
        </div>
      </div>
    </div>
  );
}
