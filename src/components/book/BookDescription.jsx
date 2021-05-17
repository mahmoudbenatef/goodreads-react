import Rating from "@material-ui/lab/Rating";
import React from "react";

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
      <Rating size="small" name="read-only" value={bookAvgValue} readOnly />
      <span className="m-1">avg {bookAvgValue}</span>
      <span className="m-1">{numberOfReviews} ratings</span>
      <p className="text-justify">{bookDescription}</p>
    </div>
  );
}
