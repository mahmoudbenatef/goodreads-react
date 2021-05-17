import React from "react";
import loading from "../../assets/loading.gif";
export default function LoadingComponent() {
  return (
    <div className="text-center">
        <img src={loading} className="w-25 h-25 m-0" alt="" />
        <h3>Loading..</h3>
    </div>
  );
}
