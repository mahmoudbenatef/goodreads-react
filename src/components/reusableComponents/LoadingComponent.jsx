import React from "react";
import logo from "../../open-book.png";
import "../../styles/LoadingComponent.css";
export default function LoadingComponent() {
  return (
    <div className="text-center">
      <div className="text-center">
        <img src={logo} className="w-25 h-25" alt="" />
      </div>
      <div className="loader"></div>
      <div>
        <h1>Loading..</h1>
      </div>
    </div>
  );
}
