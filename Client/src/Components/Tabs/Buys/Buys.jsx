import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  axiosModeEventsBuys,
  deleteEvent,
  setFilterBuyEvent,
  sortByAscendingEventsBuys,
  sortByDescendingEventsBuys,
} from "../../../Slice/EventsBuysForUser/BuysSlice";
import './Events.css'
import { FaEdit } from "react-icons/fa";
import { TiArrowSortedDown, TiArrowUnsorted ,TiArrowSortedUp } from "react-icons/ti";
import { AiOutlineCheck } from "react-icons/ai";
import SearchBar from "../../Admin/SearchBar/SearchAdmin";

function Buys() {
  const { events, errorEvents } = useSelector((state) => state.eventsBuysSlice);
  const [sortType, setSortType] = useState({ type:null, id: 2 });
  console.log(events);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(axiosModeEventsBuys());
  }, [dispatch]);

  const handledelete = (e) => {
    console.log(e);
    dispatch(deleteEvent(e));
  };

  const accent = (e) => {
    if(sortType.type === e){
    if (sortType.id === 2) {
      setSortType({ type: e, id: 1 });
      dispatch(sortByAscendingEventsBuys(e));
    }
    if (sortType.id === 1) {
      setSortType({ type: e, id: 2 });
      dispatch(sortByDescendingEventsBuys(e));
    }}else{
      setSortType({ type: e, id: 1 });
      dispatch(sortByAscendingEventsBuys(e));
    }
  };

  const handleSearch = (key) => {
    dispatch(setFilterBuyEvent(key));
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <h3>{errorEvents ? errorEvents : undefined}</h3>
      <div className="sapList">
        <div className="sapListHeader">
          <div className="sapListItem">ID</div>
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
          <div className="sapListItem">Action</div>
        </div>
        {events.map((event,index) => (
          <div className="sapListRow" key={index}>
            <div className="sapListItem sap">{event.id}</div>
            <div className="sapListItem sap">{`${event?.organizer?.name} ${event?.organizer?.last_name}`}</div>
            <div className="sapListItem sapListItemWide sap">{event.name}</div>
            <div className="sapListItem sapListItemWide sap">
              {event?.start_date}
            </div>
            <div className="sapListItem sap">
              {event?.isPremium ? "Premium" : "Free"}
            </div>
            <div className="sapListItem sap">
              {event?.status}
            </div>
            <div className="sapListItem sap">
              <button className="btnSap">
                <FaEdit color="darkslateblue" size={25} />
              </button>
              <button className="btnSap">
                <AiOutlineCheck
                  onClick={() => handledelete(event.id)}
                  size={35}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buys;
