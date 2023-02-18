import React, { useState } from "react";
import Style from "./CaruselCard.module.css";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import { FaRegHeart, FaHeart } from 'react-icons/fa'
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'

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

  const navigate = useNavigate()
  const date = start_time && start_date ? genDate() : null;
  const [fav, setFav] = useState(false)

  const handleFav = (e) => {
    e.stopPropagation()
    setFav(!fav)
    if(fav) {
      
    }
  }

  return (

      <div className={Style.container_card} onClick={() => navigate(`/Event/${id}`)}>
        <div className={Style.imgWrapper}>
          <img src={img} alt={name} />
        </div>
        <span className={Style.details_category}>{category}</span>
        <div className={Style.container_details}>
          <div  className={Style.favorite} onClick={handleFav}>
            {
              fav
              ? <HiHeart className={Style.favEnabled} size={20} />
              : <HiOutlineHeart size={20} />
            }
          </div>
          {name && <h2 className={Style.details_title}>{name}</h2>}
          {date && (
            <span className={Style.details_date}>
              {moment(date).add(1, "days").format("ddd, MMMM Do, h:mm")}
            </span>
          )}
          <span className={Style.details_price}>
            {isPaid ? `${price}` : "FREE"}
          </span>
        </div>
      </div>
  );
};

export default CaruselCard;
