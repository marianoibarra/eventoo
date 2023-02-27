// import React from 'react'
// import { useSelector } from "react-redux";
// import { Link } from 'react-router-dom';
// import Styles from'./Create.module.css';

// function Create() {

//   const { data: {eventsCreated}, loading: {get: loading} } = useSelector(state => state.eventsManagement)
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { axiosModeEventsCreateForUser, setFiltercreateEvent, sortByAscendingEventscreate, sortByDescendingEventscreate } from '../../../Slice/EventsCreateForUser/CreateForUserSlice';
import '../Buys/Events.css'
import { FaEdit } from "react-icons/fa";
import { TiArrowSortedDown, TiArrowUnsorted ,TiArrowSortedUp } from "react-icons/ti";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import SearchBar from "../../Admin/SearchBar/SearchAdmin";
import { deleteEvent } from "../../../Slice/eventsManagement/eventsManagementSlice";

function Buys() {
  const { data: {eventsCreated}, loading: {get: loading} } = useSelector(state => state.eventsManagement)
  const [sortType, setSortType] = useState({ type:null, id: 2 });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(axiosModeEventsCreateForUser());
  }, [dispatch]);



  const accent = (e) => {
    if(sortType.type === e){
    if (sortType.id === 2) {
      setSortType({ type: e, id: 1 });
      dispatch(sortByAscendingEventscreate(e));
    }
    if (sortType.id === 1) {
      setSortType({ type: e, id: 2 });
      dispatch(sortByDescendingEventscreate(e));
    }}else{
      setSortType({ type: e, id: 1 });
      dispatch(sortByAscendingEventscreate(e));
    }
  };

  const handleSearch = (key) => {
    dispatch(setFiltercreateEvent(key));
  };

  return (
    // <div className={Styles.container} >
    //   {Array.isArray(eventsCreated) && eventsCreated.length !== 0 && eventsCreated.map(event => (
    //     <div className={Styles.eventCard}  key={event?.name}>
    //       <Link to={`/Event/${event?.id}`}><h3 className={Styles.eventCardTitle}>Name: {event?.name}</h3></Link>
    //       <p>Start date: {event?.start_date}</p>
    //       <p>End date: {event?.end_date}</p>
    //       <p>Category: {event?.category.name}</p>
    //       <p>Age range: {event?.age_range}</p>
    
    //       <p className={event.isPublic ? Styles.public : Styles.private}>{event.isPublic ? 'Public' : 'Private'} </p>
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="sapList">
        <div className="sapListHeader">
          <div
            className="sapListItem"
            id={sortType.type == `organizer` ? "sapSelection" : undefined}
          >
            { sortType.type === 'organizer'? 
            <TiArrowUnsorted
              size={18}
              cursor="pointer"
              onClick={() =>accent("organizer")}
            /> : <TiArrowSortedDown
              size={18}
              cursor="pointer"
              onClick={() =>accent("organizer")}
            /> }
            Organizator
          </div>
          <div
            className="sapListItem sapListItemWide"
            id={sortType.type == `name` ? "sapSelection" : undefined}
          >
            { sortType.type === 'name'? 
            <TiArrowUnsorted
              size={18}
              cursor="pointer"
              onClick={() =>accent("name")}
            /> : <TiArrowSortedDown
              size={18}
              cursor="pointer"
              onClick={() =>accent("name")}
            /> }
            Name
          </div>
          <div
            className="sapListItem sapListItemWide"
            id={sortType.type == `start_date` ? "sapSelection" : undefined}
          >
            {sortType.type === 'start_date'? 
            <TiArrowUnsorted
              size={18}
              cursor="pointer"
              onClick={() =>accent("start_date")}
            /> : <TiArrowSortedDown
              size={18}
              cursor="pointer"
              onClick={() =>accent("start_date")}
            /> }
            Date
          </div>
          <div
            className="sapListItem"
            id={sortType.type == `isPremium` ? "sapSelection" : undefined}
          >
            { sortType.type === 'isPremium'? 
            <TiArrowUnsorted
              size={18}
              cursor="pointer"
              onClick={() =>accent("isPremium")}
            /> : <TiArrowSortedDown
              size={18}
              cursor="pointer"
              onClick={() =>accent("isPremium")}
            /> }
            Type
          </div>
          <div
            className="sapListItem"
            id={sortType.type == `status` ? "sapSelection" : undefined}
          >
            { sortType.type === 'status'? 
            <TiArrowUnsorted
              size={18}
              cursor="pointer"
              onClick={() =>accent("status")}
            /> : <TiArrowSortedDown
              size={18}
              cursor="pointer"
              onClick={() =>accent("status")}
            /> }
            Status
          </div>

          <div
            className="sapListItem"
            id={sortType.type == `status` ? "sapSelection" : undefined}
          >
            { sortType.type === 'status'? 
            <TiArrowUnsorted
              size={18}
              cursor="pointer"
              onClick={() =>accent("status")}
            /> : <TiArrowSortedDown
              size={18}
              cursor="pointer"
              onClick={() =>accent("status")}
            /> }
            Action
          </div>

        </div>
        {eventsCreated.map((event,index) => (
          <div className="sapListRow" key={index}>
            <div className="sapListItem sap">{`${event?.organizer?.name} ${event?.organizer?.last_name}`}</div>
            <div className="sapListItem sapListItemWide sap">{event.name}</div>
            <div className="sapListItem sapListItemWide sap">
              {event?.start_date}
            </div>
            <div className="sapListItem sap">
              {event?.isPremium ? "Premium" : "Free"}
            </div>
            <div className="sapListItem sap">
            <p>{event.isPublic ? 'Public' : 'Private'} </p>
            </div>
            
            <div className="sapListItem sap">
              <Link to={`/Event/${event?.id}`} ><BiEdit /></Link>
              <div onClick={()=> dispatch(deleteEvent(event.id))}><MdDelete cursor={'pointer'}/></div>
            </div>
          </div>
        ))} 
      </div>
    </div>
  );
}

export default Buys;
