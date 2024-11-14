import React from "react";
import "./chargement.css";
import point from "./point.jpeg";
import lion from "./lion.jpeg";
const Chargement = () => {
  return (
    <div className="header-chargement">
      <div className="imagecontainer">
        <img src={point} alt="" />
        <div className="imagesubcontainer">
          <img src={lion} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Chargement;
