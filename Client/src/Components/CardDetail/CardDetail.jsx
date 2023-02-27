import React, { useEffect, useState } from "react";
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
import { RiTicket2Fill } from "react-icons/ri";
import style from "./CardDetail.module.css";
import ContainerButtonRight from "./ContainerButtonRight/ContainerButtonRight";

const lorem = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';

const CardDetailPublic = () => {
  const { eventDetail, loading, error } = useSelector(
    (state) => state.eventDetail
  );
  const { data } = useSelector(state => state.eventsManagement);
  const dispatch = useDispatch();

  // estados para usuario organizador
  const user = useSelector((state) => state.user);
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
    return() => {
      dispatch(clear());
    }
  }, [eventDetail, user]);

  return (
    <>
      {eventDetail && data && Object.keys(eventDetail).length > 0 && (
        <>
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
              <div className={style.aboutevent}>
                <p>{eventDetail.large_description ? eventDetail.large_description : lorem}</p>
              </div>
              <hr></hr>
            </div>

            <EventInformation />

            <ContainerButtonRight />
          </div>
        </>
      )}
    </>
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

  if (showEvent) return <CardDetailPublic />;

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
