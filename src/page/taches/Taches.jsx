import React, { useState, useEffect } from "react";
import "./taches.css";
import { Link } from "react-router-dom";

const Taches = () => {
  const [tacheData, setTacheData] = useState([]);

  useEffect(() => {
    //stockage des donnees de l utilisateur
    const tacheDataFromLocalStorage = JSON.parse(
      localStorage.getItem("tacheData")
    );
    if (tacheDataFromLocalStorage) {
      setTacheData(tacheDataFromLocalStorage);
    }
  }, []);
  return (
    <div className="headertache">
      <h1 style={{ textAlign: "center", paddingTop: "50px" }}>HORLOGE</h1>
      <div className="timestype">
        <Link to="/timer/minute" style={{ textDecoration: "none" }}>
          <p id="time-button">Minuteur</p>
        </Link>
        <Link to="/timer/chrono" style={{ textDecoration: "none" }}>
          <p id="time-button">Chronomètre</p>
        </Link>
      </div>
    </div>
  );
};

export default Taches;
