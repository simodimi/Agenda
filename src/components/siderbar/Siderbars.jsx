import React, { useState, useRef } from "react";
import "./siderbar.css";
import { CiSearch, CiUser } from "react-icons/ci";
import { IoIosSunny } from "react-icons/io";
import { FaRegStar } from "react-icons/fa";
import { FcPlanner } from "react-icons/fc";
import tof1 from "../../asset/tof.jpg";
import { FcAlarmClock } from "react-icons/fc";
import { Link } from "react-router-dom";

const Siderbars = ({ comptes, importants, planif }) => {
  //photo
  const handleImageClick = () => {
    imageInputRef.current.click(); //Cela ouvre la fenêtre de sélection de fichiers comme si l'utilisateur avait cliqué directement sur l'élément file input, permettant de sélectionner
  };
  const handleImageChange = (event) => {
    const file = event.target.files[0]; //selectionner le premier élément.
    if (file) {
      const reader = new FileReader(); //nouvelle instance de FileReader, un objet qui permet de lire le contenu des fichiers
      reader.onloadend = () => {
        //téléchargement terminé
        setTofSrc(reader.result); //mis à jour du resultat dans le setter
      };
      reader.readAsDataURL(file); //Le fichier sera lu et converti en une URL de données (data URL), qui est une chaîne représentant le fichier
    }
  };

  const [tofSrc, setTofSrc] = useState(tof1); //source de l 'image
  const imageInputRef = useRef(null); //ref a l input de l image

  const navlinkstyle = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "aqua" : " ", //couleur de fond
      textDecoration: "none", //pas de soulignement
      color: "black", //couleur de texte
      fontWeight: "bold", //gras
    };
  };
  const [menu, setmenu] = useState("home");
  return (
    <div className="headersiderbar">
      <div className="siderbarup">
        <div className="siderbarup_image">
          <div className="imagesiderbar" onClick={handleImageClick}>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={imageInputRef}
              onChange={handleImageChange}
            />
            <img src={tofSrc} alt="" />
          </div>
          <div className="imagesiderbar_text">
            <p>dimitri simo</p>
            <p>simodimitri08@gmail.com</p>
          </div>
        </div>

        <p className="input">
          {" "}
          <input type="search" placeholder="Rechercher" />
          <CiSearch style={{ cursor: "pointer" }} />
        </p>
        <Link to={"/"}>
          <div
            className={menu === "home" ? "active" : ""}
            onClick={() => setmenu("home")}
          >
            <div className="linkmenu">
              <div className="linkmenuleft">
                <IoIosSunny style={{ color: "yellow", fontSize: "30px" }} />
              </div>
              <div className="linkmenuright">
                <p>Ma journée</p>
                <span id="spanse"> {comptes}</span>
              </div>
            </div>
          </div>
        </Link>
        <Link to={"/important"}>
          <div
            className={menu === "important" ? "active" : ""}
            onClick={() => setmenu("important")}
          >
            <div className="linkmenu">
              <div className="linkmenuleft">
                <FaRegStar style={{ color: "red", fontSize: "30px" }} />
              </div>
              <div className="linkmenuright">
                <p>Important</p>
                <span id="spanse">{importants} </span>
              </div>
            </div>
          </div>
        </Link>
        <Link to={"/plan"}>
          <div
            className={menu === "plan" ? "active" : ""}
            onClick={() => setmenu("plan")}
          >
            <div className="linkmenu">
              <div className="linkmenuleft">
                <FcPlanner style={{ fontSize: "30px" }} />
              </div>
              <div className="linkmenuright">
                <p>Planifié</p>
                <span id="spanse">{planif} </span>
              </div>
            </div>
          </div>
        </Link>
        <Link to={"/forme"}>
          <div
            className={menu === "forme" ? "active" : ""}
            onClick={() => setmenu("forme")}
          >
            <div className="linkmenu">
              <div className="linkmenuleft">
                <CiUser style={{ color: "green", fontSize: "30px" }} />
              </div>
              <div className="linkmenuright">
                <p>Affectées à moi</p>
                <span id="spanse">0</span>
              </div>
            </div>
          </div>
        </Link>
        <Link to={"/timer"}>
          <div
            className={menu === "timer" ? "active" : ""}
            onClick={() => setmenu("timer")}
          >
            <div className="linkmenu">
              <div className="linkmenuleft">
                <FcAlarmClock style={{ color: "blue", fontSize: "30px" }} />
              </div>
              <div className="linkmenuright">
                <p>Timer</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Siderbars;
