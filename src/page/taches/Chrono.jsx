import "./chrono.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { FaPlay, FaPause } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";

const time = [
  {
    id: 1,
    title: "saisir titre 1",
    gauche: <TiArrowBackOutline />,
    droite: <VscDebugRestart />,
  },
  {
    id: 2,
    title: "saisir titre 2",
    gauche: <TiArrowBackOutline />,
    droite: <VscDebugRestart />,
  },
  {
    id: 3,
    title: "saisir titre 3",
    gauche: <TiArrowBackOutline />,
    droite: <VscDebugRestart />,
  },
];

const Chrono = () => {
  const [seconds, setSeconds] = useState(Array(time.length).fill(0)); //creer en initial un tableau de la même longueur que time rempli de 0
  const [intervals, setIntervals] = useState(Array(time.length).fill(null)); //AUCUNE DONNEES:null
  /*Quand le chronomètre démarre, l'identifiant de son intervalle est stocké dans intervals.
Quand le chronomètre est en pause ou arrêté, son identifiant dans intervals est remis à null. */
  const startTimer = (id) => {
    // fonction du chrono
    if (!intervals[id]) {
      //chrono pas actif et pour éviter de démarrer plusieurs intervalles pour le même id.
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          const updatedSeconds = [...prevSeconds]; //creer une copi du tableau
          updatedSeconds[id] += 1;
          return updatedSeconds; //retourner le nouveau tableau
        });
      }, 1000);
      setIntervals((prevIntervals) => {
        const updatedIntervals = [...prevIntervals];
        updatedIntervals[id] = intervalId; //stocker l'id de l'intervallz
        return updatedIntervals;
      });
    }
  };

  const pauseTimer = (id) => {
    //mise in pause
    clearInterval(intervals[id]);
    setIntervals((prevIntervals) => {
      const updatedIntervals = [...prevIntervals];
      updatedIntervals[id] = null; //Remplace l'identifiant de l'intervalle à l'index id par null.Cela indique que le chronomètre correspondant est maintenant en pause
      return updatedIntervals;
    });
  };

  const restartTimer = (id) => {
    //remise du compteur à 0
    clearInterval(intervals[id]);
    setSeconds((prevSeconds) => {
      const updatedSeconds = [...prevSeconds];
      updatedSeconds[id] = 0;
      return updatedSeconds;
    });
    setIntervals((prevIntervals) => {
      const updatedIntervals = [...prevIntervals];
      updatedIntervals[id] = null;
      return updatedIntervals;
    });
  };

  useEffect(() => {
    //stockage des données
    const chronoData = JSON.parse(localStorage.getItem("chronoData"));
    if (chronoData) {
      setSeconds(chronoData);
    }
  }, []);
  return (
    <div className="header-minuteur">
      <h1 style={{ textAlign: "center" }}>hello</h1>
      <div className="section-time">
        {time.map((p, index) => (
          <div className="clock" key={p.index}>
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <input type="text" name="" id="" placeholder={p.title} />
            </p>
            <p id="timecount">
              <span>
                {seconds[index] / 3600 < 10 ? "0" : ""}
                {Math.floor(seconds[index] / 3600)}
              </span>{" "}
              :{" "}
              <span>
                {seconds[index] / 60 < 10 ? "0" : ""}
                {Math.floor(seconds[index] / 60)}
              </span>{" "}
              :{" "}
              <span>
                {seconds[index] % 60 < 10 ? "0" : ""}
                {seconds[index] % 60}{" "}
              </span>
            </p>

            <div className="selection-time">
              <Link to="/timer">
                <p id="button-selection">{p.gauche}</p>
              </Link>
              <p id="button-selection">
                {intervals[index] ? (
                  <FaPause onClick={() => pauseTimer(index)} />
                ) : (
                  <FaPlay onClick={() => startTimer(index)} />
                )}
              </p>
              <p id="button-selection" onClick={() => restartTimer(index)}>
                {p.droite}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chrono;
