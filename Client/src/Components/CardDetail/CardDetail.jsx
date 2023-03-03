import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  axiosModeEventDetail,
  axiosGetEventPrivate,
  clear,
  setOrganizer,
  setEditedEvent,
  setModeEdit,
  setErrors
} from "../../Slice/EventDetail/EventDetailSlice";
import { getEventsManagement } from "../../Slice/eventsManagement/eventsManagementSlice";
import EventInformation from "./EventInformation/EventInformation";
import EventLocation from "./EventLocation/EventLocation";
import covers from "../../imgs/covers";
import moment from "moment";
import { AiTwotoneCalendar, AiFillEdit } from "react-icons/ai";
import { RiMedalLine, RiTicket2Fill } from "react-icons/ri";
import style from "./CardDetail.module.css";
import ContainerButtonRight from "./ContainerButtonRight/ContainerButtonRight";
import { MdLocalFireDepartment } from "react-icons/md";
import { Chip } from "@mui/material";
import { SessionContext } from "../..";
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'
import { switchFavorites } from "../../Slice/Favorites/FavoritesSlice";

const sx = {
  bgcolor: "#BC4001",
  color: "white",
  mr: "10px"
}

const classic_sx = {
  bgcolor: '#BC4001',
  color: 'white',
  mr: '10px'
}

const premium_sx = {
  bgcolor: '#007F80',
  color: 'white',
  mr: '10px'
}

const CardDetailPublic = () => {
  const { eventDetail, loading, error } = useSelector(
    (state) => state.eventDetail
  );
  const { data } = useSelector(state => state.eventsManagement);
  const dispatch = useDispatch();

  // estados para usuario organizador
  const user = useSelector((state) => state.user);
  const {isLogged} = useSelector(state => state.user);
  const {favorites} = useSelector(state => state.favorites);
  const { setShowSessionModal } = useContext(SessionContext);
  const [thisLoading, setThisLoading] = useState(false);
  const { id } = useParams();
  const { organizer, modeEdit, editedEvent, errors} = useSelector(state => state.eventDetail.eventEdition);

  const genDate = () => {
    const [hour, minute] = eventDetail.start_time.split(":");
    const date = new Date(eventDetail.start_date);
    date.setHours(hour);
    date.setMinutes(minute);
    return date;
  };

  const genEndDate = () => {
    const [hour, minute] = eventDetail.end_time.split(":");
    const date = new Date();
    date.setHours(hour);
    date.setMinutes(minute);
    return date.getTime();
  }

  const date = eventDetail.start_date && eventDetail.start_time ? genDate() : null;
  const endDate = eventDetail.end_time ? genEndDate() : null;

  //funciones de usuario organizador
  function validate(input) {
    let errors = {};
    if (!input.description.length) {
      errors.description = "Description is required";
    }
    if (input.name.length === 0) {
      errors.name = "Title is required";
    } else if (input.name.length < 4) {
      errors.name = "Title must have at least 4 characters";
    } else if (input.name.length > 40) {
      errors.name = "Title must have a maximum of 40 characters";
    }
    return errors;
  }

  function handleOnChange(event) {
    const object = {
      ...editedEvent,
      [event.target.name]: event.target.value,
      edited: true,
    };
    dispatch(setEditedEvent(object));
    dispatch(setErrors(validate(object)));
  }

  const handleFav = (e) => {
    e.stopPropagation()
    if(isLogged) {
      setThisLoading(true)
      dispatch(switchFavorites(id))
    } else {
      setShowSessionModal('login')
    }
  }

  function editButton(event) {
    event.preventDefault();
    if(modeEdit === false){
      dispatch(setModeEdit(true));
    }
    else {
      dispatch(setModeEdit(false));
      dispatch(setErrors({}));
      dispatch(setEditedEvent({
        name: eventDetail.name,
        description: eventDetail.description,
        edited: false,
      }));
    }
  }

  useEffect(() => {
    dispatch(getEventsManagement());
    if (user.isLogged) {
      if (eventDetail.organizer) {
        if (user.id === eventDetail.organizer.id) {
          dispatch(setOrganizer(true));
          dispatch(setEditedEvent({
            ...editedEvent,
            name: eventDetail.name,
            description: eventDetail.description,
          }));
        }
      }
    }
  }, [eventDetail, user]);

  return (
    <div className={style.background}>
      {eventDetail && data && Object.keys(eventDetail).length > 0 && (
          <div className={style.body}>
            <div className={style.containerimg}>
              <img
                src={
                  eventDetail.cover_pic
                    ? eventDetail.cover_pic
                    : covers[eventDetail.category.name]
                }
                alt="cover_pic"
              />
            </div>

            <div className={style.category_and_age}>

              {eventDetail.typePack === 'CLASSIC' && <Chip sx={classic_sx} icon={<MdLocalFireDepartment style={{color: 'orange'}}/>} label={`Featured`}  />}
              {eventDetail.typePack === 'PREMIUM' && <Chip sx={premium_sx} icon={<RiMedalLine style={{color: 'orange'}}/>} label={`Premium`}  />}

              {eventDetail.category && 
                <Chip sx={sx} label={eventDetail.category.name}  />              
              }

              <Chip label={eventDetail.age_range} sx={sx} />

              {!organizer && 
                <div className={style.favorite} onClick={handleFav}>
                  {
                    favorites.some(f => f === id)
                    ? <HiHeart className={style.favEnabled} size={20} />
                    : <HiOutlineHeart size={20} />
                  }
                  {loading && thisLoading && <div class={style.loadingRing}></div>}
                </div>
              }

              {organizer === true &&
                <a className={style.organizericon} onClick={editButton}>
                  <AiFillEdit size={30} style={{color: '#BC4001'}}/>
                </a>
              }
            </div>

            <div className={style.container_title_and_description}>
              <div className={style.container_title}>
                {modeEdit === false ? (
                  <h1>
                    {eventDetail.name && eventDetail.name}{" "}
                  </h1>
                ) : (
                  <div className={style.organizerdiv}>
                    <input
                      className={
                        errors.name
                          ? style.organizerinput_error
                          : style.organizerinput
                      }
                      type="text"
                      name="name"
                      value={editedEvent.name}
                      onChange={handleOnChange}
                    />
                    {organizer === true && errors.name && <p>{errors.name}</p>}
                  </div>
                )}
              </div>
              <div className={style.containerdescription}>
                {modeEdit === false ? (
                  <p>{eventDetail.description}</p>
                ) : (
                  <textarea
                    className={
                      errors.description
                        ? style.textarea_error
                        : style.textarea_border
                    }
                    name="description"
                    value={editedEvent.description}
                    onChange={handleOnChange}
                  />
                )}

                {organizer === true && errors.description && (
                  <p className={style.textdescription_error}>
                  {errors.description}
                  </p>
                )}
                <hr></hr>
              </div>
            </div>

            <div className={style.container_date}>
              <div className={style.containericon}>
                <span className={style.iconspan}>
                  {" "}
                  <AiTwotoneCalendar size={30} />{" "}
                </span>
                <span className={style.iconspantext}>Date and Time</span>
              </div>
              <h3>
                {`${date && moment(date).format('ddd, MMMM Do, h:mm')} to ${endDate && moment(endDate).format('h:mm')}`}
              </h3>
            </div>

            {eventDetail.category?.modality === "Presential" && (
              <EventLocation />
            )}

            <div className={style.container_date}>
              <div className={style.containericon}>
                <span className={style.iconspan}>
                  {" "}
                  <RiTicket2Fill size={35} />{" "}
                </span>
                <span className={style.iconspantext}>About the event</span>
              </div>
              <div className={style.aboutevent} dangerouslySetInnerHTML={{ __html: eventDetail.large_description
                ? eventDetail.large_description.replace(/\n/g, '<br>')
                : eventDetail.description
              }}></div>
              <hr></hr>
            </div>

            <EventInformation />

            <ContainerButtonRight />
          </div>
      )}
    </div>
  );
};

const CardDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [privatePass, setPrivatePass] = useState("");
  const user = useSelector((state) => state.user);
  const { showEvent, loading, error, errorPass, eventDetail } = useSelector(
    (state) => state.eventDetail
  );
  useEffect(() => {
    dispatch(axiosModeEventDetail(id));

    return() => {
      dispatch(clear());
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    if (privatePass) {
      dispatch(
        axiosGetEventPrivate({ id, privateEvent_password: privatePass })
      );
      setPrivatePass("");
    }
  };

  if (loading) return (
    <div className={style.spinner}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );

  if (error)
    return <div className={style.error}>Something was wrong..</div>;

  if (showEvent !== false) return <CardDetailPublic />;

  return (
    <div className={style.containerEventPrivate}>
      <div className={style.containerInfoEventPrivate}>
        <p>{eventDetail.start_date} at {eventDetail.start_time}</p>
        <h1>Event {eventDetail.name}</h1>
        <form  className={style.containerPass} onSubmit={handleSubmit}>
          <input 
          type="password" 
          onChange={(e) => setPrivatePass(e.target.value)}
          placeholder='Enter the password'
          className={style.pass} />
          <input 
          type="submit" 
          value={'Send'} 
          className={style.btnSubmit}/>
        </form>
        {errorPass && <span>Invalid password</span>}
        <Link className={style.btnBack} to="/">
          <button className={style.btnprimario}>Back</button>
        </Link>
      </div>
    </div>
  );
};

export default CardDetail;
