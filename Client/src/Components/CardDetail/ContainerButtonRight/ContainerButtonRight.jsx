import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { axiosModeEditEventDetail } from "../../../Slice/EventDetail/EventDetailSlice";
import BuyButton from "./BuyButton/BuyButton";
import UserIcon from "../../../Assets/UserProfile.png";
import style from "./ContainerButtonRight.module.css";


function ContainerButtonRight() {

  const user = useSelector((state) => state.user);
  const { eventDetail } = useSelector(state => state.eventDetail);
  const { organizer, editedEvent, errors} = useSelector(state => state.eventDetail.eventEdition);
  const { id } = useParams;
  const dispatch = useDispatch();

  function handleOnClick(event) {
    event.preventDefault();
    if (editedEvent.edited === true) {
      dispatch(
        axiosModeEditEventDetail({ id, body: { ...editedEvent } })
      );
      window.location.reload();
    }
  }

  return (
    <div className={style.background}>
      <div className={style.container_organizer}>
        <img 
          src={UserIcon}
          className={style.profile_pic}
          alt='user photo'
        />
        <div className={style.organizer_text}>
          <p>Organized by</p>
          <h3>{`${eventDetail.organizer.name} ${eventDetail.organizer.last_name}`}</h3>
        </div>
      </div>
      {organizer === false && <BuyButton />}

      {user.isLogged && organizer === true && (
        <div className={style.organizerbutton_div}>
          <div className={style.organizerbutton}>
            <a
              className={`btnprimario ${
                editedEvent.edited === false || Object.keys(errors).length > 0
                  ? style.organizerbutton_disabled
                  : null
              }`}
              href=""
              onClick={handleOnClick}
            >
              <span>Save Changes</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContainerButtonRight;
