import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventsManagement } from '../../../Slice/eventsManagement/eventsManagementSlice'
// import './Events.css'
import { FaEdit } from "react-icons/fa";
import { TiArrowSortedDown, TiArrowUnsorted, TiArrowSortedUp } from "react-icons/ti";
import {
  setFilterSellerEvent,
  sortByAscendingEventsSeller,
  sortByDescendingEventsSeller
} from "../../../Slice/eventsManagement/eventsManagementSlice";

import { AiOutlineCheck } from "react-icons/ai";
import SearchBar from "../../Admin/SearchBar/SearchAdmin";
import Completed from "./Status/Expired/Expired";
import Canceled from "./Status/Canceled/Canceled";
import Inwaiting from "./Status/Inwaiting/Inwaiting";
import Denied from "./Status/Denied/Denied";
import Approved from "./Status/Approved/Approved";
import Expired from "./Status/Expired/Expired";
import Pending from "./Status/Pending/Pending";
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
        dispatch(sortByAscendingEventsSeller(e));
      }
      if (sortType.id === 1) {
        setSortType({ type: e, id: 2 });
        dispatch(sortByDescendingEventsSeller(e));
      }
    } else {
      setSortType({ type: e, id: 1 });
      dispatch(sortByAscendingEventsSeller(e));
    }
  };

  const handleSearch = (key) => {
    dispatch(setFilterSellerEvent(key));
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <h3>{error ? error : undefined}</h3>

      <div className="sapList">
        <div className="sapListHeader">
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
          {eventSells.map((transaction, index) => (
            <>
              <div className="sapListRow" key={index} onClick={() => information(transaction.id)}>
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
                      case 'APPROVED':
                        return <Approved transaction={transaction} />;
                      case 'CANCELED':
                        return <Canceled transaction={transaction} />;
                      case 'DENIED':
                        return <Denied transaction={transaction} />;
                      case 'EXPIRED':
                        return <Expired transaction={transaction} />;
                      case 'INWAITING':
                        return <Pending transaction={transaction} />;
                      case 'PENDING':
                        return <Pending transaction={transaction} />;
                      case 'COMPLETED':
                        return <Completed transaction={transaction} />;

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




