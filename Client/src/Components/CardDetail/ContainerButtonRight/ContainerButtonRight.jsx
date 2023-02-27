import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { axiosModeEditEventDetail, axiosModeEventDetail, setModeEdit } from "../../../Slice/EventDetail/EventDetailSlice";
import { AiFillEdit } from "react-icons/ai";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import BuyButton from "./BuyButton/BuyButton";
import UserIcon from "../../../Assets/UserProfile.png";
import style from "./ContainerButtonRight.module.css";
import ModalReviews from "../../Modal/ModalReviews/ModalReviews";
import { Rating } from "@mui/material";


function ContainerButtonRight() {

  const user = useSelector((state) => state.user);
  const { eventDetail } = useSelector(state => state.eventDetail);
  const { organizer, editedEvent, errors} = useSelector(state => state.eventDetail.eventEdition);
  const [favorite, setFavorite] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  function handleOnClick(event) {
    event.preventDefault();
    if (editedEvent.edited === true && !Object.keys(errors).length) {
      dispatch(
        axiosModeEditEventDetail({ id, editedEvent })
      );
    }
  }

  function editButton(event) {
    event.preventDefault();
    dispatch(setModeEdit(true));
  }

  function heartButton() {
    favorite ? setFavorite(false) : setFavorite(true);
  }

  return (
    <div className={style.background}>
      {showModal && <ModalReviews setShowModal={setShowModal} />}
      <div className={style.category_and_age}>
        {eventDetail.category && 
          <div className={style.containercategory}>
            <span className={style.text}>{eventDetail.category.name}</span> 
          </div>                    
        }

        <div className={style.containercategory}>
          <span className={style.text}>{eventDetail.age_range}</span> 
        </div>

        {organizer === true &&
          <a className={style.organizericon} onClick={editButton}>
            <AiFillEdit size={30} />
          </a>
        }

        {favorite && organizer === false && 
          <a className={style.organizericon} onClick={heartButton}>
            <BsSuitHeartFill size={30} />
          </a>
        }

        {!favorite && organizer === false &&
          <a className={style.organizericon} onClick={heartButton}>
            <BsSuitHeart size={30} />
          </a>
        }
      </div>

      {eventDetail.organizer.name && <div className={style.container_organizer}  onClick={() => {setShowModal(true)}}>
        <img 
          src={UserIcon}
          className={style.profile_pic}
          alt='user photo'
        />
        <div className={style.organizer_text}>
          <p>Organized by</p>
          <h3>{`${eventDetail.organizer.name} ${eventDetail.organizer.last_name}`}</h3>
          <Rating name="half-rating-read" value={eventDetail.organizer.score} precision={0.1} readOnly />
        </div>
      </div>}

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
