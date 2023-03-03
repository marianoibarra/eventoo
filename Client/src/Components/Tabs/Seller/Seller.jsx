import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventsManagement } from '../../../Slice/eventsManagement/eventsManagementSlice'
// import './Events.css'
import { FaEdit } from "react-icons/fa";
import { TiArrowSortedDown, TiArrowUnsorted, TiArrowSortedUp } from "react-icons/ti";
import {
  axiosModeEventsBuys,
  deleteEvent,
  setFilterBuyEvent,
  sortByAscendingEventsBuys,
  sortByDescendingEventsBuys,
} from "../../../Slice/EventsBuysForUser/BuysSlice";

import { AiOutlineCheck } from "react-icons/ai";
import SearchBar from "../../Admin/SearchBar/SearchAdmin";
import Completed from "./Status/Expired/Completed";
import Canceled from "./Status/Canceled/Canceled";
import Rejected from "./Status/Pending/Rejected";
import Inwaiting from "./Status/Inwaiting/Inwaiting";
import Denied from "./Status/Denied/Denied";
import Approved from "./Status/Approved/Approved";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";


function Seller() {
  const { data: { sells: eventSells }, error } = useSelector((state) => state.eventsManagement);
  const [sortType, setSortType] = useState({ type: null, id: 2 });
  const [transactionId, setTransactionId] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEventsManagement());
  }, [dispatch]);

  const information = (e) => {
    setTransactionId(e)
  };

  const accent = (e) => {
    if (sortType.type === e) {
      if (sortType.id === 2) {
        setSortType({ type: e, id: 1 });
        dispatch(sortByAscendingEventsBuys(e));
      }
      if (sortType.id === 1) {
        setSortType({ type: e, id: 2 });
        dispatch(sortByDescendingEventsBuys(e));
      }
    } else {
      setSortType({ type: e, id: 1 });
      dispatch(sortByAscendingEventsBuys(e));
    }
  };

  const handleSearch = (key) => {
    dispatch(setFilterBuyEvent(key));
  };

console.log(eventSells,'tipo de evento')

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
            {sortType.type === 'organizer' ?
              <TiArrowUnsorted
                size={18}
                cursor="pointer"
                onClick={() => accent("organizer")}
              /> : <TiArrowSortedDown
                size={18}
                cursor="pointer"
                onClick={() => accent("organizer")}
              />}
            Organizator
          </div>
          <div
            className="sapListItem sapListItemWide"
            id={sortType.type == `name` ? "sapSelection" : undefined}
          >
            {sortType.type === 'name' ?
              <TiArrowUnsorted
                size={18}
                cursor="pointer"
                onClick={() => accent("name")}
              /> : <TiArrowSortedDown
                size={18}
                cursor="pointer"
                onClick={() => accent("name")}
              />}
            Name
          </div>
          <div
            className="sapListItem sapListItemWide"
            id={sortType.type == `start_date` ? "sapSelection" : undefined}
          >
            {sortType.type === 'start_date' ?
              <TiArrowUnsorted
                size={18}
                cursor="pointer"
                onClick={() => accent("start_date")}
              /> : <TiArrowSortedDown
                size={18}
                cursor="pointer"
                onClick={() => accent("start_date")}
              />}
            Date
          </div>
          <div
            className="sapListItem"
            id={sortType.type == `isPremium` ? "sapSelection" : undefined}
          >
            {sortType.type === 'isPremium' ?
              <TiArrowUnsorted
                size={18}
                cursor="pointer"
                onClick={() => accent("isPremium")}
              /> : <TiArrowSortedDown
                size={18}
                cursor="pointer"
                onClick={() => accent("isPremium")}
              />}
            Type
          </div>
          <div
            className="sapListItem"
            id={sortType.type == `status` ? "sapSelection" : undefined}
          >
            {sortType.type === 'status' ?
              <TiArrowUnsorted
                size={18}
                cursor="pointer"
                onClick={() => accent("status")}
              /> : <TiArrowSortedDown
                size={18}
                cursor="pointer"
                onClick={() => accent("status")}
              />}
            Status
          </div>
        </div>
        <div className="sapConteiner">
          {eventSells.map((transaction, index) => (<>

            <div className="sapListRow" key={index} onClick={() => information(transaction.id)} onDoubleClick={()=>setTransactionId('')}>
              <div className="sapListItem sap">{`${transaction.event?.organizer?.name} ${transaction.event?.organizer?.last_name}`}</div>
              <div className="sapListItem sapListItemWide sap">{transaction?.event?.name}</div>
              <div className="sapListItem sapListItemWide sap">
                {transaction?.event?.start_date}
              </div>
              <div className="sapListItem sap">
                {transaction?.isPremium ? "Premium" : "Free"}
              </div>
              <div className="sapListItem sap">
              {(() => {
                  switch (transaction.status) {
                    case 'APPROVED':
                      return <p className={`${transaction.status}SAP`}>APPROVED</p>
                    case 'CANCELED':
                      return <p className={`${transaction.status}SAP`}>CANCELED</p>
                    case 'COMPLETED':
                      return <p className={`${transaction.status}SAP`}>COMPLETED</p>
                    case 'DENIED':
                      return <p className={`${transaction.status}SAP`}>DENIED</p>
                    case 'EXPIRED':
                      return <p className={`${transaction.status}SAP`}>EXPIRED</p>
                    case 'INWAITING':
                      return <p className={`${transaction.status}SAP`}>INWAITING</p>
                    case 'PENDING':
                      return <p className={`${transaction.status}SAP`}>PENDING</p>
                    default:
                      return <p>no tienes estados pendientes</p>;
                  }
                })()}
              </div>
            </div>
            {transaction.id === transactionId ?
              <div key={index}>
                {(() => {
                  switch (transaction.status) {
                    case 'CANCELED':
                      return <Canceled transaction={transaction} />;
                    case 'INWAITING':
                      return <Inwaiting transaction={transaction} />;
                    case 'REJECTED':
                      return <Rejected transaction={transaction} />;
                    case 'COMPLETED':
                      return <Completed transaction={transaction} />;
                    case 'APPROVED':
                      return <Approved transaction={transaction} />;
                    case 'DENIED':
                      return <Denied transaction={transaction} />;
                    default:
                      return <p>no tienes estados pendientes</p>;
                  }
                })()}
              </div>
              : undefined}</>
          ))}
        </div>
      </div>
    </div>

  );
}

export default Seller;




