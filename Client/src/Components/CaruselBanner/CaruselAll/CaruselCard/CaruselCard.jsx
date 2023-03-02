import React, { useContext, useEffect, useRef, useState } from "react";
import Style from "./CaruselCard.module.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { HiOutlineHeart, HiHeart } from 'react-icons/hi'
import { useDispatch, useSelector } from "react-redux";
import { switchFavorites } from "../../../../Slice/Favorites/FavoritesSlice";
import { SessionContext } from "../../../..";
import { Chip } from "@mui/material";
import { MdLocalFireDepartment } from "react-icons/md";
import { RiMedalLine } from "react-icons/ri"
import { color } from "@mui/system";

const sx = {
  bgcolor: '#BC4001',
  color: 'white',
  mb: '10%'
}

const premium_sx = {
  bgcolor: '#007F80',
  color: 'white',
  mb: '5%'
}

const home_premium_sx = {
  bgcolor: '#007F80',
  color: 'white',
  mb: '10%'
}

const CaruselCard = ({
  img,
  name,
  start_date,
  start_time,
  category,
  id,
  isPaid,
  price,
  premium,
  classic,
  home
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
  const [mouseDownTime, setMouseDownTime] = useState(null);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleFav = (e) => {
    e.stopPropagation()
    if(isLogged) {
      setThisLoading(true)
      dispatch(switchFavorites(id))
    } else {
      setShowSessionModal('login')
    }
  }

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setMouseDownTime(new Date().getTime());
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const distance = x - startX;
    containerRef.current.scrollLeft = scrollLeft - distance;
  };

  const handleClick = () => {
    const mouseUpTime = new Date().getTime();
    const timeDiff = (mouseUpTime - mouseDownTime)
    if(timeDiff < 200) {   
      navigate(`/Event/${id}`)
    }
  }

  useEffect(() => {
    if(!loading) {
      setThisLoading(false)
    }
  }, [loading])

  return (

      <div 
        ref={containerRef} 
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove} 
        className={`${!premium ? Style.container_card : Style.container_card_premium} ${home ? Style.width : null}`} 
        onClick={handleClick}>
        <div className={Style.imgWrapper}>
          <img src={img} alt={name} />
        </div>
        <span className={!premium ? Style.details_category : Style.details_category_premium}>{category}</span>
        <div className={`${Style.container_details} ${!home && premium && Style.container_details_Cpremium}`}>
          <div className={`${Style.favorite} ${premium && Style.favorite_premium}`} onClick={handleFav}>
            {
              favorites.some(f => f === id)
              ? <HiHeart className={Style.favEnabled} size={20} />
              : <HiOutlineHeart size={20} />
            }
            {loading && thisLoading && <div class={Style.loadingRing}></div>}
          </div>
          {classic && <div className={Style.classic}><Chip sx={sx} size="small" icon={<MdLocalFireDepartment style={{color: 'orange'}}/>} label={`Featured`}  /></div>}
          {premium && <div className={Style.classic}><Chip sx={home ? home_premium_sx : premium_sx} size="small" icon={<RiMedalLine style={{color: '#D4AF37'}}/>} label={`Premium`}  /></div>}
          {name && <h2 className={Style.details_title}>{name}</h2>}
          {date && <span className={Style.details_date} >{moment(date).format('ddd, MMMM Do, h:mm')}</span>}
          { isPaid 
            ? <span className={Style.details_price}>{price}</span>
            : <span className={Style.details_free}>FREE</span>
          }
        </div>
      </div>
  );
};

export default CaruselCard;
