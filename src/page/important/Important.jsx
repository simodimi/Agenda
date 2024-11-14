import React, { useState, useEffect } from "react";
import { FaRegLightbulb, FaRegCircle, FaPencilAlt } from "react-icons/fa";
import { IoEllipsisHorizontal } from "react-icons/io5";
import { CiBoxList } from "react-icons/ci";
import { GoPlus } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { FaStar, FaCheck } from "react-icons/fa";
import { picture } from "../journey/datatheme";
import pink from "../../asset/pink.jpeg";
import "./important.css";
import DateComponent from "../../components/date/DateComponent";

const Important = ({
  importantupdate,
  importants,
  selecteditems,
  setselecteditems,
}) => {
  const [tab, settab] = useState([]);
  const [input, setinput] = useState("");
  //ajouter une nouvelle tâche
  const handlechange = (e) => {
    setinput(e.target.value);
  };
  const handleadd = (e) => {
    if (e.key === "Enter") {
      if (input.trim() !== "") {
        settab([...tab, input.trim()]);
        setinput("");
        importantupdate(importants + 1);
        localStorage.setItem(
          "importantData",
          JSON.stringify([...tab, input.trim()])
        );
      }
    }
  };
  const removeImportant = (item) => {
    const updatedSelectedItems = selecteditems.filter(
      (selectedItem) => selectedItem !== item
    );
    setselecteditems(updatedSelectedItems);
  };
  //suppression d'une tâche
  const handledelete = (id) => {
    const update = [...tab];
    update.splice(id, 1);
    settab(update);
    const newComptes = Math.max(importants - 1, 0); // Assure que newComptes ne sera jamais inférieur à 0
    importantupdate(newComptes);

    localStorage.setItem("importantData", JSON.stringify([...update]));
  };
  //suppression d'une tâche issue de journey.jsx
  const handledeletes = (index) => {
    const update = [...selecteditems];
    update.splice(index, 1);
    const newComptes = Math.max(importants - 1, 0); // Assure que newComptes ne sera jamais inférieur à 0
    importantupdate(newComptes);
    setselecteditems(update);
    localStorage.setItem("importantData", JSON.stringify([...update]));
  };
  //afficher liste
  const [afficher, setafficher] = useState(false);
  const handleafficher = () => {
    setafficher(!afficher);
  };
  //affichage de l'input pour ajouter une tâche
  const [afficherinput, setafficherinput] = useState(false);
  const handletask = () => {
    setafficherinput(!afficherinput);
  };

  //changer background

  const [changebg, setchangebg] = useState(pink);
  const handlebackground = (imageurl) => {
    setchangebg(imageurl);
  };
  //modifier la phrase
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleEditClick = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const handleEditInputChange = (e) => {
    setEditValue(e.target.value);
  };

  const handleEditInputKeyPress = (e, index) => {
    if (e.key === "Enter") {
      const updatedTab = [...tab];
      updatedTab[index] = editValue;
      settab(updatedTab);
      setEditIndex(null);
      setEditValue("");
      localStorage.setItem("importantData", JSON.stringify(updatedTab));
    }
  };
  //modification d'une tâche issue de journey.jsx
  const [aditIndex, setAditIndex] = useState(null);
  const [aditValue, setAditValue] = useState("");

  const handleAditClick = (index, value) => {
    setAditIndex(index);
    setAditValue(value);
  };

  const handleAditInputChange = (e) => {
    setAditValue(e.target.value);
  };

  const handleAditInputKeyPress = (e, index) => {
    if (e.key === "Enter") {
      const updatedTabs = [...selecteditems];
      updatedTabs[index] = aditValue;
      setselecteditems(updatedTabs);
      setAditIndex(null);
      setAditValue("");
      localStorage.setItem("importantData", JSON.stringify(updatedTabs));
    }
  };

  //chargement des données dans le storage
  useEffect(() => {
    const importantData = JSON.parse(localStorage.getItem("importantData"));
    if (importantData) {
      settab(importantData);
    }
  }, []);

  useEffect(() => {
    const importantDone = JSON.parse(localStorage.getItem("importantDone"));
    if (importantDone) {
      setdone(importantDone);
    }
  }, []);

  useEffect(() => {
    const importantDones = JSON.parse(localStorage.getItem("importantDones"));
    if (importantDones) {
      setdones(importantDones);
    }
  }, []);
  //gestion de l'etat fait d'une tache importante
  const [done, setdone] = useState(Array(tab.length).fill(false));
  const handledone = (id) => {
    const newDone = [...done];
    newDone[id] = !newDone[id];
    setdone(newDone);
    localStorage.setItem("importantDone", JSON.stringify([...newDone]));
  };
  //gestion de l'etat fait d'une t$ache isssue de journey.jsx
  const [dones, setdones] = useState(Array(selecteditems.length).fill(false));
  const handledones = (index) => {
    const newDones = [...dones];
    newDones[index] = !newDones[index];
    setdones(newDones);
    localStorage.setItem("importantDones", JSON.stringify([...newDones]));
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
                    <p style={{ textAlign: "center" }}>
                      <FaStar /> Important
                    </p>
                  </div>
                  <div className="journey_top_right">
                    {/*    <button className="buttonjourney">
                      <FaRegLightbulb />
                    </button>*/}
                    <button className="buttonjourney" onClick={handleafficher}>
                      <IoEllipsisHorizontal />
                    </button>
                  </div>
                </div>
                {selecteditems.map(
                  (
                    item,
                    index //id
                  ) => (
                    <div
                      className={`journey_top_down ${
                        dones[index] ? "pink-back" : "red-back"
                      }`}
                    >
                      <div
                        className={`note ${
                          aditIndex === index ? "editing" : ""
                        }`} //id
                      >
                        <div className="noteleft">
                          <div
                            className="icone"
                            onClick={() => handledones(index)}
                            style={{ marginRight: "20px", cursor: "pointer" }}
                          >
                            {!dones[index] ? <FaRegCircle /> : <FaCheck />}
                          </div>
                          <div className="notetext">
                            {aditIndex === index ? ( //id
                              <input
                                type="text"
                                value={aditValue}
                                onChange={handleAditInputChange}
                                onKeyDown={(e) =>
                                  handleAditInputKeyPress(e, index)
                                } //id
                                autoFocus
                              />
                            ) : (
                              <p key={index}>{item}</p>
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
                            onClick={() => handleAditClick(index, item)} //id
                          />
                          <RxCross2
                            style={{
                              cursor: "pointer",
                              padding: "5px",
                              backgroundColor: "red",
                            }}
                            onClick={() => handledeletes(index)} //id
                          />
                        </div>
                      </div>
                    </div>
                  )
                )}
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
                    <CiBoxList style={{ fontSize: "40px" }} />

                    <p>
                      Essayez de marquer certaines tâches
                      <br />
                      d'une étoile pour les voir ici.
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

export default Important;
