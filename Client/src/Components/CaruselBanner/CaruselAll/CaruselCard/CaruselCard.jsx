import React, { useContext } from "react";
import Style from "./CaruselCard.module.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'
import { useDispatch, useSelector } from "react-redux";
import { switchFavorites } from "../../../../Slice/Favorites/FavoritesSlice";
import { SessionContext } from "../../../..";

const CaruselCard = ({
  img,
  name,
  start_date,
  start_time,
  category,
  id,
  isPaid,
  price,
}) => {

  const genDate = () => {
    const [hour, minute] = start_time.split(":");
    const date = new Date(start_date);
    date.setHours(hour);
    date.setMinutes(minute);
    return date;
  };

  const {isLogged} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const date = start_time && start_date ? genDate() : null;
  const {favorites} = useSelector(state => state.favorites)
  const { setShowSessionModal } = useContext(SessionContext)

  const handleFav = (e) => {
    e.stopPropagation()
    if(isLogged) {
      dispatch(switchFavorites(id))
    } else {
      setShowSessionModal('login')
    }
  }

  return (

      <div className={Style.container_card} onClick={() => navigate(`/Event/${id}`)}>
        <div className={Style.imgWrapper}>
          <img src={img} alt={name} />
        </div>
        <span className={Style.details_category}>{category}</span>
        <div className={Style.container_details}>
          <div className={Style.favorite} onClick={handleFav}>
            {
              favorites.some(f => f === id)
              ? <HiHeart className={Style.favEnabled} size={20} />
              : <HiOutlineHeart size={20} />
            }
          </div>
          {name && <h2 className={Style.details_title}>{name}</h2>}
          {date && <span className={Style.details_date} >{moment(date).format('ddd, MMMM Do, h:mm')}</span>}
          <span className={Style.details_category}>{category}</span>
          { isPaid 
            ? <span className={Style.details_price}>{price}</span>
            : <span className={Style.details_free}>FREE</span>
          }
        </div>
      </div>
  );
};

export default CaruselCard;
