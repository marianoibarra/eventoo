import React from "react";
import "./Events.css";
import { FaEdit } from "react-icons/fa";
import { IoMdArrowDropdownCircle, IoMdArrowDropupCircle } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

const EventsInfo = ({ events, accent, desccent, handleChange }) => (
  <div className="sapList">
    <div className="sapListHeader">
      <div className="sapListItem">ID</div>
      <div className="sapListItem">
        <IoMdArrowDropdownCircle
          size={18}
          cursor="pointer"
          onClick={() => accent("organizer")}
        />{" "}
        Organizator{" "}
        <IoMdArrowDropupCircle
          size={18}
          cursor="pointer"
          onClick={() => desccent("organizer")}
        />
      </div>
      <div className="sapListItem sapListItemWide">
        <IoMdArrowDropdownCircle
          size={18}
          cursor="pointer"
          onClick={() => accent("name")}
        />{" "}
        Name{" "}
        <IoMdArrowDropupCircle
          size={18}
          cursor="pointer"
          onClick={() => desccent("name")}
        />
      </div>
      <div className="sapListItem sapListItemWide">
        <IoMdArrowDropdownCircle
          size={18}
          cursor="pointer"
          onClick={() => accent("start_date")}
        />{" "}
        Date{" "}
        <IoMdArrowDropupCircle
          size={18}
          cursor="pointer"
          onClick={() => desccent("start_date")}
        />
      </div>
      <div className="sapListItem">
        <IoMdArrowDropdownCircle
          size={18}
          cursor="pointer"
          onClick={() => accent("isPremium")}
        />{" "}
        Type{" "}
        <IoMdArrowDropupCircle
          size={18}
          cursor="pointer"
          onClick={() => desccent("isPremium")}
        />
      </div>
      <div className="sapListItem">
        <IoMdArrowDropdownCircle
          size={18}
          cursor="pointer"
          onClick={() => accent("isActive")}
        />{" "}
        Status{" "}
        <IoMdArrowDropupCircle
          size={18}
          cursor="pointer"
          onClick={() => desccent("isActive")}
        />
      </div>
      <div className="sapListItem">Action</div>
    </div>
    {events.map((event) => (
      <div className="sapListRow" key={event.id}>
        <div className="sapListItem info sap">{event.id}</div>
        <div className="sapListItem sap">{`${event?.organizer?.name} ${event?.organizer?.last_name}`}</div>
        <div className="sapListItem info sapListItemWide sap">{event.name}</div>
        <div className="sapListItem sapListItemWide sap date">
          {event?.start_date}
        </div>
        <div className="sapListItem sap">
          {event?.isPremium ? <p className="premiumSap">Premium</p> : <p className="freeSap">Free</p>}
        </div>
        <div className="sapListItem sap">
          {event?.isActive ? <p className='active'>Active</p> : <p className='banned'>Desactive</p>}
        </div>
        <div className="sapListItem sap">
          <button disabled={event?.isActive} className={event?.isActive ? "btnSap" + " disableBtnSap" : "btnSap"} onClick={() => handleChange(event.id)}>
          <p className='active'>Active</p>
          </button>
          <button disabled={!event?.isActive} className={!event?.isActive ? "btnSap" + " disableBtnSap" : "btnSap"} onClick={() => handleChange(event.id)}>
          <p className='banned'>Desactive</p>
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default EventsInfo;
