import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activateEvent,
  deactivateEvent,
} from "../../../Slice/Admin/AdminSlice";
import { axiosModeEventsBuys } from "../../../Slice/EventsBuysForUser/BuysSlice";
import Styles from "../Users/Create.module.css";

function EventsAdmin() {
  const { events } = useSelector((state) => state.events);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(axiosModeEventsBuys());
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();

    dispatch(activateEvent(e));
  };
  const handleDelete = (e) => {
    e.preventDefault();

    dispatch(deactivateEvent(e));
  };

  return (
    <div className={Styles.container}>
      {events.length > 0 ? (
        events.map((event) => (
          <div className={Styles.eventCard} key={event.name}>
            <h3 className={Styles.eventCardTitle}>Nombre: {event.name}</h3>
            <p>
              Organizador: {event.organizer.name && event.organizer.last_name}
            </p>
            <p>Fecha de Finalización: {event.end_time}</p>
            <p>Category: {event.category.modality}</p>
            <button onClick={handleChange(event.id)}>Pause</button>
            <button onClick={handleDelete(event.id)}>Delete</button>
          </div>
        ))
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default EventsAdmin;
