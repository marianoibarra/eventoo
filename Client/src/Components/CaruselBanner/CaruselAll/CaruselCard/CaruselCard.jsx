import React, { useContext, useEffect, useState } from "react";
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
  premium
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
  const {favorites, loading} = useSelector(state => state.favorites)
  const { setShowSessionModal } = useContext(SessionContext)
  const [thisLoading, setThisLoading] = useState(false)

  const handleFav = (e) => {
    e.stopPropagation()
    if(isLogged) {
      setThisLoading(true)
      dispatch(switchFavorites(id))
    } else {
      setShowSessionModal('login')
    }
  }

  useEffect(() => {
    if(!loading) {
      setThisLoading(false)
    }
  }, [loading])

  return (

      <div className={!premium ? Style.container_card : Style.container_card_premium} onClick={() => navigate(`/Event/${id}`)}>
        <div className={Style.imgWrapper}>
          <img src={img} alt={name} />
        </div>
        <span className={!premium ? Style.details_category : Style.details_category_premium}>{category}</span>
        <div className={!premium ? Style.container_details : Style.container_details_premium}>
          <div className={`${Style.favorite} ${premium && Style.favorite_premium}`} onClick={handleFav}>
            {
              favorites.some(f => f === id)
              ? <HiHeart className={Style.favEnabled} size={20} />
              : <HiOutlineHeart size={20} />
            }
            {loading && thisLoading && <div class={Style.loadingRing}></div>}
          </div>
          {name && <h2 className={Style.details_title}>{name}</h2>}
          {date && <span className={Style.details_date} >{moment(date).format('ddd, MMMM Do, h:mm')}</span>}
          <span className={!premium ? Style.details_category : Style.details_category_premium_buttom}>{category}</span>
          { isPaid 
            ? <span className={Style.details_price}>{price}</span>
            : <span className={Style.details_free}>FREE</span>
          }
        </div>
      </div>
  );
};

export default CaruselCard;
