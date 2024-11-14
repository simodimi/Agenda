import React, { useEffect, useState } from "react";
import "./date.css";

const DateComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); //date actuelle
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); //mets a jour la date toutes les secondes
    return () => {
      clearInterval(interval); //nettoyage du setinterval
    };
  }, []);

  return (
    <div className="headerDate">
      <p style={{ fontSize: "12px" }}> {currentDate.toLocaleDateString()}</p>
      {/*Cette méthode retourne une chaîne de caractères représentant la date dans un format adapté à la locale de l'utilisateur. */}
    </div>
  );
};

export default DateComponent;
