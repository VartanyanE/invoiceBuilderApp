import React from "react";
import AuthOptions from "../auth/AuthOptions";
import "./Home.css";

export default function Home() {
  return (
    <div className="main">
      <AuthOptions />

      <div className="coin-image"></div>
    </div>
  );
}
