import React from "react";
import { BASE_URL } from "../../API/urls";
import { mySessionStorage } from "../../helper/LocalStorge";
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
  authorId,
  handelDeleteReview,
}) {
  const getShelfName = (shelfNumber) => {
    if (shelfNumber === 1) return WANT_TO_READ;
    if (shelfNumber === 2) return CURRENTLY_READING;
    if (shelfNumber === 3) return READ;
  };
  return (
    <div className="row mt-2  ">
      <div className="col-2 col-sm-1">
        <img
          style={{ width: "4rem", height: "4rem", borderRadius: "50%" }}
          src={`${BASE_URL}/${authorImg}`}
          alt=""
        />
      </div>
      <div className="col">
        <span className="text-success"> {authorName}</span> rate it
        <Rate value={rating} />
        {mySessionStorage.getCurrentUser()._id === authorId && (
          <button
            onClick={handelDeleteReview}
            className="float-end btn btn-sm btn-danger"
          >
            Delete My Review
          </button>
        )}
        <div>
          <span className="text-success">Shelf:</span> {getShelfName(shelf)}
        </div>
        <div>
          <p className="text-justify">{review}</p>
        </div>
      </div>
    </div>
  );
}
