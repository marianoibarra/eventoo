import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStateEvent,
  getAllEvents,
} from "../../../Slice/Admin/AdminSlice";
import { axiosModeEventsBuys } from "../../../Slice/EventsBuysForUser/BuysSlice";
import Styles from "../Categories/Category.module.css";
import EventsInfo from "./EventsInfo";

function EventsAdmin() {
  const { events } = useSelector((state) => state.admin);

  const [showDetails, setShowDetails] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  const handleChange = (e) => {
    console.log(e)
    dispatch(changeStateEvent(e.id));
  };


  return (
    <div className={Styles.container}>
      {events.length > 0 ? <EventsInfo
      events={events}
      handleChange={handleChange}
      setShowDetails={setShowDetails}
      showDetails={showDetails}
      
      
      /> : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default EventsAdmin;
