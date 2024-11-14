import React, { useState, useEffect } from "react";
import "./planification.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment); //configuration du localisateur pour le calendrier

const Planification = ({ addplanif, planif }) => {
  const [events, setEvents] = useState([]); //liste des événements du calendrier
  const [selectedEvent, setSelectedEvent] = useState(null); //évenement sélectionné pour l edition ou la suppression
  const [showModal, setShowModal] = useState(false); //côntrole de l afficgage du modal
  const [title, setTitle] = useState(""); //titre de l evenement en cours d'edition
  const [start, setStart] = useState(new Date()); //date de debut
  const [end, setEnd] = useState(new Date()); //date de fin

  const handleSelect = ({ start, end }) => {
    // fonction lorsque je clique sur un carreau du calendrier
    setShowModal(true); //afficher le modal
    setStart(start); //date de debut
    setEnd(end); //date de fin
  };

  const handleEventClick = (event) => {
    //fonction lors du clic sur un evenement existant sur le calendrier
    setSelectedEvent(event); //selectionner l evenement
    setShowModal(true); //afficher le modal
    setTitle(event.title); //definir le titre de l evenement
    setStart(event.start); //date de debut
    setEnd(event.end); //date de fin
  };

  const handleSaveEvent = () => {
    //sauvegarder un evenement
    if (selectedEvent) {
      //si un evenement est selectionne ,le mettre àjour
      const updatedEvents = events.map((event) =>
        event.id === selectedEvent.id ? { ...event, title, start, end } : event
      );

      setEvents(updatedEvents); //mettre à jour la liste des evenements
    } else {
      //sinon ajouter un nouvel evenements
      const newEvent = { id: events.length + 1, title, start, end };
      setEvents([...events, newEvent]); //ajouter le nouvel evenement a la liste
      addplanif(planif + 1); //mettrea jour le nombre total de planifications
      localStorage.setItem("planificationData", JSON.stringify([newEvent])); //stockage des données
    }
    setShowModal(false); //cacher le modal
    setSelectedEvent(null); //reinitialiser l evenement selectionne
    setTitle(""); //reinitialiser le titre
    setStart(new Date()); //reinitialiser la date de debut
    setEnd(new Date()); //reinitialiser la date de fin
  };

  const handleDeleteEvent = () => {
    //delete un evenement
    const updatedEvents = events.filter(
      (event) => event.id !== selectedEvent.id
    );
    setEvents(updatedEvents); //update la listedes evenements
    setShowModal(false); //xacher le modal
    setSelectedEvent(null); //reinitialiser l evenement selectionne
    setTitle(""); //reinitialiser le titre
    setStart(new Date()); //reinitialiser la date de debut
    setEnd(new Date()); //reinitialiser la date de fin
    addplanif(planif - 1); //mettre a jour le nombre de planification dans la sidebar
    localStorage.setItem("planificationData", JSON.stringify([updatedEvents])); //stockage des donnees
  };

  useEffect(() => {
    // effect pour récuperer les donnees du localstorage
    const planificationData = JSON.parse(
      localStorage.getItem("planificationData")
    );
    if (planificationData) {
      //update des evenements
      setEvents(planificationData);
    }
  }, []);
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>MON CALENDRIER</h1>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelect}
        onSelectEvent={handleEventClick}
        style={{
          borderStyle: "none",
          backgroundColor: "white",
          height: 500,
          minWidth: "100%",
        }}
      />
      {showModal && (
        <div className="modal">
          <h2>{selectedEvent ? "Edit Event" : "Add Event"}</h2>
          <label style={{ fontWeight: "bold" }}>Titre : </label>
          <input
            type="text"
            placeholder="inserer un titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <label style={{ fontWeight: "bold" }}>Début : </label>
          <input
            type="datetime-local"
            value={moment(start).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) => setStart(new Date(e.target.value))}
          />
          <br />
          <label style={{ fontWeight: "bold" }}>Fin : </label>

          <input
            type="datetime-local"
            value={moment(end).format("YYYY-MM-DDTHH:mm")}
            onChange={(e) => setEnd(new Date(e.target.value))}
          />
          <br />
          <button onClick={handleSaveEvent}>
            {selectedEvent ? "sauvegarder" : "Ajouter"}
          </button>
          {selectedEvent && (
            <button onClick={handleDeleteEvent} style={{ color: "red" }}>
              Supprimer
            </button>
          )}
          <button onClick={() => setShowModal(false)}>Annuler</button>
        </div>
      )}
    </div>
  );
};
export default Planification;
