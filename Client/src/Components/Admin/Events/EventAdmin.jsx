import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeStateEvent,
  getAllEvents,
  setFilterEvent,
} from "../../../Slice/Admin/AdminSlice";
import EventsInfo from "./EventsInfo";
import { sortByAscendingEvents, sortByDescendingEvents } from "../../../Slice/Admin/AdminSlice";
import SearchBar from "../SearchBar/SearchAdmin";
import Loading from "../Loading/Loading";

function EventsAdmin() {
  const { events, errorEvents } = useSelector((state) => state.admin);
  
  const dispatch = useDispatch();
  useEffect(() => {
    if(!events.length){
    dispatch(getAllEvents());}
  }, []);
  const handleChange = (e) => {

    dispatch(changeStateEvent(e));
  };
  const handledelete = (e) => {

    dispatch(changeStateEvent(e));
  };

const accent = (e) => {
  dispatch(sortByAscendingEvents(e))

}

const desccent = (e) => {
  dispatch(sortByDescendingEvents(e))

}
 const handleSearch = (key) => {
    dispatch(setFilterEvent(key));
  };
  return (
    <>
    <SearchBar onSearch={handleSearch} />
    {events.length > 0 ? (
      <>
        {errorEvents ? <h2>{errorEvents}</h2> : undefined}
        <EventsInfo
          events={events}
          accent={accent}
          desccent={desccent}
          handleChange={handleChange}
        />
      </>
    ) : (
      <Loading/>
    )}
  </>
  );
}

export default EventsAdmin;
