import Rating from "@material-ui/lab/Rating";
import React from "react";
export default function FixedRatatingComponent({ value }) {
  return (
    <>
      <Rating size="small" name="read-only" value={value} readOnly />
    </>
  );
}
