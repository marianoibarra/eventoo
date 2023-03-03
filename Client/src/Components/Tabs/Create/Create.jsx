
import React, {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setFilterCreateEvent,
sortByAscendingEventsCreate,
sortByDescendingEventsCreate,
} from "../../../Slice/eventsManagement/eventsManagementSlice";
import '../Buys/Events.css'

import { TiArrowSortedDown, TiArrowUnsorted  } from "react-icons/ti";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import SearchBar from "../../Admin/SearchBar/SearchAdmin";
import { deleteEvent } from "../../../Slice/eventsManagement/eventsManagementSlice";
import ModalDeleteEvent from "../../Modal/ModalDeleteEvent/ModalDeleteEvent";

function Buys() {
  const [showModal, setShowModal] = useState(false);
  const { data: {eventsCreated}, loading: {get: loading} } = useSelector(state => state.eventsManagement)
  const [sortType, setSortType] = useState({ type:null, id: 2 });
  const dispatch = useDispatch();




  const accent = (e) => {
    if(sortType.type === e){
    if (sortType.id === 2) {
      setSortType({ type: e, id: 1 });
      dispatch(sortByAscendingEventsCreate(e));
    }
    if (sortType.id === 1) {
      setSortType({ type: e, id: 2 });
      dispatch(sortByDescendingEventsCreate(e));
    }}else{
      setSortType({ type: e, id: 1 });
      dispatch(sortByAscendingEventsCreate(e));
    }
  };

  const handleSearch = (key) => {
    dispatch(setFilterCreateEvent(key));
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="sapList">
        <div className="sapListHeader">
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
          >
            Count
          </div>
          <div
            className="sapListItem"
          >
            Action
          </div>

        </div>
        {eventsCreated.map((event,index) => (
          <div className="sapListRow" key={index}>
            {showModal && <ModalDeleteEvent setShowModal={setShowModal} eventId={event.id}/>}
            <div className="sapListItem sap">{`${event?.organizer?.name} ${event?.organizer?.last_name}`}</div>
            <div className="sapListItem sapListItemWide sap " >{event.name}</div>
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
            <p>{event.stock_ticket }/{event.guests_capacity } </p>
            </div>
            
            <div className="sapListItem sap">
              <Link to={`/Event/${event?.id}`} ><BiEdit /></Link>
              <div onClick={() => setShowModal(!showModal)}><MdDelete cursor={'pointer'}/></div>
            </div>
          </div>
        ))} 
      </div>
    </div>
  );
}

export default Buys;
