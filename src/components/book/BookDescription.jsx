import React from "react";
import Rating from "../reusableComponents/FixedRatatingComponent";
export default function BookDescription({
  bookName,
  authorName,
  bookAvgValue,
  numberOfReviews,
  bookDescription,
}) {
  return (
    <div>
      <h2>{bookName}</h2>
      <h4>By {authorName}</h4>
      <div className="align-baseline">
        <Rating value={bookAvgValue} />
        <span className="m-1">avg {bookAvgValue}</span>
        <span className="m-1">{numberOfReviews} ratings</span>
      </div>
      <p className="text-justify">{bookDescription}</p>
    </div>
  );
}
