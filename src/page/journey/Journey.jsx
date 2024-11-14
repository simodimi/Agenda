import React, { useState, useEffect } from "react";
import "./journey.css";
import { FaRegCircle, FaPencilAlt } from "react-icons/fa";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { FaStar } from "react-icons/fa";
import { picture } from "./datatheme";
import mountain from "../../asset/mountains.jpg";
import DateComponent from "../../components/date/DateComponent";
import { FaCheck } from "react-icons/fa6";

const Journey = ({
  addupdate, //mise à jour du nombre de tâches
  comptes, //nombre de tâches actuelles
  addImportant, //ajout d'une tâche importante
  importantupdate, //mise à jour d'une tâche importante
  importants, //nombre de taches importantes
  removeImportant, //suppression d une tâche importante
}) => {
  const [tab, settab] = useState([]); //liste des tâches
  const [input, setinput] = useState(""); //// Valeur de l'input pour une nouvelle tâche

  // Fonction pour changer l'état de l'input en fonction de la saisie
  const handlechange = (e) => {
    setinput(e.target.value);
  };

  //ajout d'une tâche en appuyant sur la touche Enter
  const handleadd = (e) => {
    if (e.key === "Enter") {
      if (input.trim() !== "") {
        settab([...tab, input.trim()]);
        setinput("");
        addupdate(comptes + 1);
        localStorage.setItem(
          "journeyData",
          JSON.stringify([...tab, input.trim()])
        ); //sauvegarde dans le local storage
      }
    }
  };

  //suppression d'une tache
  const handledelete = (id) => {
    const update = [...tab];
    update.splice(id, 1);
    settab(update);
    // addupdate(comptes - 1);
    const newComptes = Math.max(comptes - 1, 0); // Assure que newComptes ne sera jamais inférieur à 0
    addupdate(newComptes);
    localStorage.setItem("journeyData", JSON.stringify([...update]));
  };

  //afficher liste
  const [afficher, setafficher] = useState(false); //affichage du menu de thèmes
  const handleafficher = () => {
    setafficher(!afficher);
  };

  //afficher l'input des taches
  const [afficherinput, setafficherinput] = useState(false); //affichage de l'input de tâche
  const handletask = () => {
    setafficherinput(!afficherinput);
  };

  //changer background
  const [changebg, setchangebg] = useState(mountain); //image de l'input de tâche
  const handlebackground = (imageurl) => {
    setchangebg(imageurl);
  };

  //modifier la phrase
  const [editIndex, setEditIndex] = useState(null); // Indice de la tâche en cours de modification
  const [editValue, setEditValue] = useState(""); // Valeur de la tâche en cours de modification

  //démarrer la modification d'une tâche
  const handleEditClick = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  //changr la valeur de l'input de modification
  const handleEditInputChange = (e) => {
    setEditValue(e.target.value);
  };

  //sauvergarder la modification en appuyant sur Enter
  const handleEditInputKeyPress = (e, index) => {
    if (e.key === "Enter") {
      const updatedTab = [...tab];
      updatedTab[index] = editValue; //mettre à jour la tache modifiee
      settab(updatedTab); //mettre à jour l'etat des tâcehs
      setEditIndex(null); // Réinitialise l'index de modification
      setEditValue(""); // Réinitialise la valeur de modification
      localStorage.setItem("journeyData", JSON.stringify(updatedTab));
    }
  };

  //fonction lorsquee je clique sur l etoile pour marquer comme tache importante
  const [backstar, setbackstar] = useState(Array(tab.length).fill(false)); // État des étoiles de tâches importantes
  const handlestarclick = (id) => {
    const newstar = [...backstar];
    newstar[id] = !newstar[id]; //inverse l'etat important/pas important
    setbackstar(newstar); //mettre à jour les étoiles
    localStorage.setItem("starData", JSON.stringify(newstar));
    const selectedItem = tab[id];
    if (newstar[id]) {
      importantupdate(importants + 1);
      addImportant(selectedItem);
    } else {
      //const selectedItem = tab[id];
      const newComptes = Math.max(importants - 1, 0); // Assure que newComptes ne sera jamais inférieur à 0
      removeImportant(selectedItem);
      importantupdate(newComptes);
    }

    localStorage.setItem("starData", JSON.stringify(newstar));
  };

  //storage local
  useEffect(() => {
    const journeyData = JSON.parse(localStorage.getItem("journeyData")) || [];
    const starData =
      JSON.parse(localStorage.getItem("starData")) ||
      Array(journeyData.length).fill(false);
    settab(journeyData); //charger les taches
    setbackstar(starData); //charger les etoiles
  }, []);

  //l'etat tâche terminees
  const [done, setdone] = useState(Array(tab.length).fill(false)); // État des tâches terminées
  const handledone = (id) => {
    const newDone = [...done];
    newDone[id] = !newDone[id]; //inverser les états fait/non fait
    setdone(newDone);
  };

  return (
    <div className="journeytitle">
      <div className="journeyheader">
        {changebg && (
          <div
            className="journey-left"
            style={{ backgroundImage: `url(${changebg})` }}
          >
            <div className="journey_selection">
              <div className="journey_top">
                <div className="journey_top_up">
                  <div className="journey_top_left">
                    <p>Ma journée</p>
                    <p>
                      <DateComponent />
                    </p>
                  </div>
                  <div className="journey_top_right">
                    <button className="buttonjourney" onClick={handleafficher}>
                      <IoEllipsisHorizontal />
                    </button>
                  </div>
                </div>
                {tab.map((p, id) => (
                  <div
                    className={`journey_top_down ${
                      done[id] ? "pink-back" : "red-back"
                    }`}
                  >
                    <div
                      className={`note ${editIndex === id ? "editing" : ""}`}
                    >
                      <div className="noteleft">
                        <div
                          className="icone"
                          onClick={() => handledone(id)}
                          style={{ marginRight: "20px", cursor: "pointer" }}
                        >
                          {!done[id] ? <FaRegCircle /> : <FaCheck />}
                        </div>
                        <div className="notetext">
                          {editIndex === id ? (
                            <input
                              type="text"
                              value={editValue}
                              onChange={handleEditInputChange}
                              onKeyDown={(e) => handleEditInputKeyPress(e, id)}
                              autoFocus
                              style={{
                                width: "100%",
                                outlineColor: "transparent",
                              }}
                            />
                          ) : (
                            <p key={p.id}>{p}</p>
                          )}
                          <div className="soustache">
                            <p>
                              tâches &nbsp; &nbsp;
                              <span
                                style={{
                                  color: "blue",
                                  cursor: "pointer",
                                  marginBottom: "10px",
                                }}
                              >
                                échéance:
                              </span>
                            </p>
                            <p>
                              <DateComponent />
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="noteright">
                        <FaPencilAlt
                          style={{ cursor: "pointer" }}
                          onClick={() => handleEditClick(id, p)}
                        />
                        <FaStar
                          style={{
                            cursor: "pointer",
                            color: backstar[id] ? "yellow" : "white",
                          }}
                          onClick={() => handlestarclick(id)}
                        />
                        <RxCross2
                          style={{
                            cursor: "pointer",
                            padding: "5px",
                            backgroundColor: "red",
                          }}
                          onClick={() => handledelete(id)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {!afficherinput && (
                <div className="journey_center">
                  <div className="message_journey">
                    <CiCalendarDate style={{ fontSize: "40px" }} />
                    <p>hello planifions notre journée </p>
                    <p>
                      Effectuer des tâches avec Ma journée,
                      <br />
                      une liste actualisée tous les jours.
                    </p>
                  </div>
                </div>
              )}

              <div className="journey_down">
                {afficherinput && (
                  <div className="down">
                    <p id="input">
                      <FaRegCircle style={{ marginRight: "20px" }} />
                      <input
                        type="text"
                        onKeyDown={handleadd}
                        onChange={handlechange}
                        value={input}
                      />
                    </p>
                  </div>
                )}
                {!afficherinput && (
                  <div className="down">
                    <p onClick={handletask}>
                      <GoPlus style={{ marginRight: "20px" }} />
                      Ajoutez une tâche
                    </p>
                  </div>
                )}
              </div>
            </div>
            {afficher && (
              <div className="select_theme">
                <p
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    margin: "10px 0px",
                    padding: "0px",
                  }}
                >
                  Thèmes
                </p>
                <div className="themeselect">
                  {picture.map((p, id) => (
                    <div
                      className="selection"
                      key={id}
                      onClick={() => handlebackground(p.background1)}
                    >
                      <img src={p.background1} alt="" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default Journey;
