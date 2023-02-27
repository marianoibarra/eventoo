import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { axiosModeEditEventDetail, axiosModeEventDetail, setModeEdit } from "../../../Slice/EventDetail/EventDetailSlice";
import { AiFillEdit } from "react-icons/ai";
import { BsSuitHeartFill, BsSuitHeart } from "react-icons/bs";
import BuyButton from "./BuyButton/BuyButton";
import UserIcon from "../../../Assets/UserProfile.png";
import style from "./ContainerButtonRight.module.css";


function ContainerButtonRight() {

  const user = useSelector((state) => state.user);
  const { eventDetail } = useSelector(state => state.eventDetail);
  const { organizer, editedEvent, errors} = useSelector(state => state.eventDetail.eventEdition);
  const [favorite, setFavorite] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

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

      <div className={style.category_and_age}>
        {eventDetail.category && 
          <div className={`${style.containercategory} ${eventDetail.typePack === 'PREMIUM' && style.containercategory_premium}`}>
            <span className={`${style.text} ${eventDetail.typePack === 'PREMIUM' && style.text_premium}`}>{eventDetail.category.name}</span> 
          </div>                    
        }

        <div className={`${style.containercategory} ${eventDetail.typePack === 'PREMIUM' && style.containercategory_premium}`}>
          <span className={`${style.text} ${eventDetail.typePack === 'PREMIUM' && style.text_premium}`}>{eventDetail.age_range}</span> 
        </div>

        {organizer === true &&
          <a className={style.organizericon} onClick={editButton}>
            <AiFillEdit size={30} />
          </a>
        }

        {favorite && organizer === false && 
          <a className={`${style.organizericon} ${eventDetail.typePack === 'PREMIUM' && style.organizericon_premium}`} onClick={heartButton}>
            <BsSuitHeartFill size={30} />
          </a>
        }

        {!favorite && organizer === false &&
          <a className={`${style.organizericon} ${eventDetail.typePack === 'PREMIUM' && style.organizericon_premium}`} onClick={heartButton}>
            <BsSuitHeart size={30} />
          </a>
        }
      </div>

      {eventDetail.organizer.name && <div className={`${style.container_organizer} ${eventDetail.typePack === 'PREMIUM' && style.container_organizer_premium}`}>
        <img 
          src={eventDetail.organizer.profile_pic ? eventDetail.organizer.profile_pic : UserIcon}
          className={`${style.profile_pic} ${eventDetail.typePack === 'PREMIUM' && style.profile_pic_premium}`}
          alt='user photo'
        />
        <div className={style.organizer_text}>
          <p>Organized by</p>
          <h3>{`${eventDetail.organizer.name} ${eventDetail.organizer.last_name}`}</h3>
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
