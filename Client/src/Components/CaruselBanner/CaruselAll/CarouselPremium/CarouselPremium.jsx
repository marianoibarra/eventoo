import React from "react";
import { useSelector } from "react-redux";
import CaruselCard from "../CaruselCard/CaruselCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartBroken } from "@fortawesome/free-solid-svg-icons";
import covers from "../../../../imgs/covers";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Style from "./CarouselPremium.module.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{paddingTop: '1.5px', borderRadius: "50%", color: "transparent", outline:"none", display: "block", background: "#007F80"}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{paddingTop: '1.5px', borderRadius: "50%", color: "transparent", outline:"none", display: "block", background: "#007F80"}}
      onClick={onClick}
    />
  );
}

export default function CarouselPremium() {

    const { premiumEvents, loading } = useSelector(state => state.premiumEvents);
  
    const settings = {
        className: "center",
        infinite: true,
        speed: 500,
        adaptiveHeight: true,
        slidesToShow: 6,
        initialSlide: 0,
        centerMode: true,
        responsive: [
          {
            breakpoint: 1715,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 3,
                infinite: true,
            }
          },
          {
            breakpoint: 1415,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
                infinite: true,
            }

          },
          {
            breakpoint: 1125,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
            }
          },
          {
            breakpoint: 830,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 500,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ],
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
    };

    console.log(premiumEvents)

    return (
      <>
        <div className={Style.container_text}> Premium Events  {`(${premiumEvents?.filter(event => event.isActive === true).length})`} </div>
        <div className={Style.container_slider}>
        <Slider className={Style.slider} {...settings}>
          {
            loading
              ?  <div className={Style.spinner}><div></div><div></div><div></div><div></div></div>
              : premiumEvents.length > 0
                  ? premiumEvents.map(event => (
                      event.isActive ? <CaruselCard
                        img={event.cover_pic ? event.cover_pic : covers[event.category?.name]}
                        key={event.id}
                        name={event.name}
                        start_date={event.start_date}
                        start_time={event.start_time}
                        isPaid={event.isPaid}
                        price={event.price}
                        category={event.category === null ? 'N/A' : event.category.name}
                        id={event.id}
                        premium={true}
                      /> : null
                    )) 
                  : <div className={Style.notFoundWrapper}>
                      <FontAwesomeIcon icon={faHeartBroken} size="6x" />
                      <h4>No results found</h4>
                      <p>Please try with anothers keywords or filters</p>
                    </div>
          }
        </Slider>
        </div>
      </>
    );
}