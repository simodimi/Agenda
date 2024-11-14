import React, { useState, useRef, useEffect } from "react";
import "./minuteur.css";
import { TiArrowBackOutline } from "react-icons/ti";
import { FaPlay, FaPause } from "react-icons/fa";
import { VscDebugRestart } from "react-icons/vsc";
import { Link } from "react-router-dom";

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

const Minuteur = () => {
  const [seconds, setSeconds] = useState(Array(time.length).fill(0));
  const [intervals, setIntervals] = useState(Array(time.length).fill(null));
  const [inputTimes, setInputTimes] = useState(
    Array(time.length).fill("00:00:00")
  );

  const startTimer = (id) => {
    if (intervals[id] === null || intervals[id] === undefined) {
      //fonction du timer
      const intervalId = setInterval(() => {
        setSeconds((prevSeconds) => {
          const updatedSeconds = [...prevSeconds];
          if (updatedSeconds[id] > 0) {
            updatedSeconds[id] -= 1;
            return updatedSeconds;
          } else {
            clearInterval(intervals[id]);
            setIntervals((prevIntervals) => {
              const updatedIntervals = [...prevIntervals];
              updatedIntervals[id] = null;
              return updatedIntervals;
            });

            return prevSeconds;
          }
        });
      }, 1000);
      setIntervals((prevIntervals) => {
        const updatedIntervals = [...prevIntervals];
        updatedIntervals[id] = intervalId;
        return updatedIntervals;
      });
    }
  };

  const pauseTimer = (id) => {
    //fonction de mise en pause
    clearInterval(intervals[id]);
    setIntervals((prevIntervals) => {
      const updatedIntervals = [...prevIntervals];
      updatedIntervals[id] = null;
      return updatedIntervals;
    });
  };

  const restartTimer = (id) => {
    //fonction pour mettre le compteur à 0
    clearInterval(intervals[id]);
    setSeconds((prevSeconds) => {
      const updatedSeconds = [...prevSeconds];
      updatedSeconds[id] = convertTimeStringToSeconds(inputTimes[id]);
      return updatedSeconds;
    });
    setIntervals((prevIntervals) => {
      const updatedIntervals = [...prevIntervals];
      updatedIntervals[id] = null;
      return updatedIntervals;
    });
  };

  const handleInputChange = (event, id) => {
    //fonction pour la valeur input
    const { value } = event.target;
    setInputTimes((prevInputTimes) => {
      const updatedInputTimes = [...prevInputTimes];
      updatedInputTimes[id] = value;
      return updatedInputTimes;
    });
    setSeconds((prevSeconds) => {
      const updatedSeconds = [...prevSeconds];
      updatedSeconds[id] = convertTimeStringToSeconds(value);
      return updatedSeconds;
    });
  };

  const convertTimeStringToSeconds = (timeString) => {
    //convertir la valeurs entrée par l user en seconds
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const formatSecondsToTimeString = (seconds) => {
    //division de la valeur en heures,minutes,secondes
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(
      2,
      "0"
    )} : ${String(remainingSeconds).padStart(2, "0")}`;
  };

  useEffect(() => {
    //stockage des données
    const minuteurData = JSON.parse(localStorage.getItem("minuteurData"));
    if (minuteurData) {
      setSeconds(minuteurData);
    }
  }, []);
  return (
    <div className="header-minuteur">
      <h1 style={{ textAlign: "center" }}>hello</h1>
      <div className="section-time">
        {time.map((p, index) => (
          <div className="clock" key={p.id}>
            <p
              style={{
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              <input
                type="text"
                value={inputTimes[index]}
                onChange={(e) => handleInputChange(e, index)}
                style={{ textAlign: "center" }}
              />
            </p>
            <p id="timecount">
              <span id="spans">
                {formatSecondsToTimeString(seconds[index])}
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

export default Minuteur;
