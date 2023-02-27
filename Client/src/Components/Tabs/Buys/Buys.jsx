// import React from 'react'
// import {  useSelector } from "react-redux";
// import { Link } from 'react-router-dom';
// import SpinnerWhite from '../../../utils/SpinnerWhite/SpinnerWhite';
// import Styles from '../Create/Create.module.css';

// function Buys() {

//   const { data: {buys: eventsBuyed}, loading: {get: loading} } = useSelector(state => state.eventsManagement)

//   return (
//     <div className={Styles.container}>
//       {!loading
//         ? eventsBuyed.map(transaction => (
//             <div className={Styles.eventCard} key={transaction.event.name}>
//               <Link to={`/Event/${transaction.event.id}`}><h3 className={Styles.eventCardTitle}>Name: {transaction.event.name}</h3></Link>
//               <p>Start date: {transaction.event.start_date}</p>
//               <p>End date: {transaction.event.end_date}</p>
//               <p>Category: {transaction.eventcategory?.name}</p>
//               <p>Age range: {transaction.event.age_range}</p>
//               <p id={transaction.status}>Status: {transaction.status}</p>

//             </div>
//           ))
//       : <SpinnerWhite />
//     }
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

import{ getEventsManagement } from '../../../Slice/eventsManagement/eventsManagementSlice'
import './Events.css'
import { FaEdit } from "react-icons/fa";
import { TiArrowSortedDown, TiArrowUnsorted ,TiArrowSortedUp } from "react-icons/ti";
import { AiOutlineCheck } from "react-icons/ai";
import SearchBar from "../../Admin/SearchBar/SearchAdmin";
import Pending from "./Status/Pending/Pending";
import Completed from "./Status/Completed/Completed";
import Canceled from "./Status/Canceled/Canceled";
import Rejected from "./Status/Rejected/Rejected";
import Inwaiting from "./Status/Inwaiting/Inwaiting";



function Buys() {
  const { data:{buys:eventBuys}, error } = useSelector((state) => state.eventsManagement);
  const [sortType, setSortType] = useState({ type:null, id: 2 });
  const [transactionId, setTransactionId] = useState(null);
  


  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEventsManagement());
  }, [dispatch]);

  const information = (e) => {
    setTransactionId(e)
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
      <h3>{error ? error : undefined}</h3>

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
        </div>
        <div className="sapConteiner">
        {eventBuys.map((transaction,index) => (<>
          
          <div className="sapListRow" key={index} onClick={()=>information(transaction.id)}>
            <div className="sapListItem sap">{`${transaction.event?.organizer?.name} ${transaction.event?.organizer?.last_name}`}</div>
            <div className="sapListItem sapListItemWide sap">{transaction?.event?.name}</div>
            <div className="sapListItem sapListItemWide sap">
              {transaction?.event?.start_date}
            </div>
            <div className="sapListItem sap">
              {transaction?.isPremium ? "Premium" : "Free"}
            </div>
            <div className="sapListItem sap">
              {transaction?.status}
            </div>
          </div>
          
          {transaction.id === transactionId ? <div  key={index}>
            {transaction?.status === "CANCELED"? <Canceled transaction={transaction} /> : 
            transaction?.status === "PENDING"? <Pending transaction={transaction} /> : 
            transaction?.status === "INWAITING"? <Inwaiting transaction={transaction}/> : 
            transaction?.status === "REJECTED"? <Rejected transaction={transaction}/> :
            transaction?.status === "COMPLETED"? <Completed transaction={transaction}/> : <p>no tienes estados pendientes</p>}
          </div>
          : undefined}</> 
        ))}</div>
      </div>

     


      </div>

  );
}

export default Buys;



// - PENDING: Cuando el usuario carga los tickets y la operacion queda pendiente de carga del comprobante
// - CANCELED: Operacion cancelada por el usuario comprador
// - INWAITING: Luego de que el usuario carga el comprobante y a la espera de que el organizador confirme la operacion
// - REJECTED: Operacion cancelada por el usuario organizador desde INWAITING
// - COMPLETED: Operacion confirmada por el usuario organizador desde INWAITING



     {/* <button className="btnSap">
                <FaEdit color="darkslateblue" size={25} />
              </button>
              <button className="btnSap">
                <AiOutlineCheck
                  onClick={() => handledelete(event.id)}
                  size={35}
                />
              </button> */}