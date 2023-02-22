import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { axiosModeEventDetail } from "../../Slice/EventDetail/EventDetailSlice";
import { API } from "../../App";
import covers from "../../imgs/covers";
import { Box } from "@mui/material";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import style from "./Review.module.css";

const Review = () => {

    const { eventDetail, loading, error } = useSelector(state => state.eventDetail);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { id } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();
    const stars = searchParams.get("stars");
    const [activeStars, setActiveStars] = useState(stars?stars:0);
    const totalStars = 5;

    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState({comment: 'Comment is require.'});
    function validate(value){
        const errors = {};
        if(!value.length) errors.comment = "Comment is require.";
        return errors;
    }

    function handleClick(index) {
        if(++index === activeStars) setActiveStars(--index);
        else setActiveStars(index);
    }

    function handleOnChange(event) {
        setComment(event.target.value);
        setErrors(validate(event.target.value));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const body = {
            id,
            stars: activeStars,
            comment
        }
        try {
            const res = await API.post(`/reviews`, body);
            console.log(res.data);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        dispatch(axiosModeEventDetail(id));
    }, [dispatch]);

    const today = new Date().toLocaleString();
    const dateEvent = new Date(`${eventDetail?.end_date}, ${eventDetail?.end_time}`).toLocaleString();
    
    if(loading) return <div className={style.spinner}><div></div><div></div><div></div><div></div></div>;
    if(error || Object.keys(eventDetail).length === 0) return <div className={style.error}>Something was wrong..</div>

    return(
        <>
            {eventDetail && Object.keys(eventDetail).length > 0 && 
                <div className={style.background}>
                    <div className={style.generalcontainer}>
                        <div className={style.containerimage}>
                            <img src={eventDetail.cover_pic ? eventDetail.cover_pic : covers[eventDetail.category.name]} alt='cover_pic'/>
                        </div>
                        <h1>{eventDetail.name}</h1>
                        <Box 
                            sx={{
                                mt: "20px",
                                mb: "20px",
                                cursor: "pointer",
                            }}
                        >
                            {[...new Array(totalStars)].map((arr, index) => {
                                return (
                                    index < activeStars 
                                    ? <span key={index}> <AiFillStar size={35} onClick={() => handleClick(index)} /> </span> 
                                    : <span key={index}> <AiOutlineStar size={35} onClick={() => handleClick(index)} /> </span>
                                );
                            })}
                        </Box>
                        {!activeStars && <p className={style.spanerror}>You should select at least one star.</p>}
                        <textarea className={errors.comment ? style.error : style.good} maxLength={600} name="comment" value={comment} placeholder='Comment...' onChange={handleOnChange}/>
                        {errors.comment && <p className={style.spanerror}>{errors.comment}</p>}
                        <button className={`btnprimario`} disabled={Object.keys(errors).length || user.isLogged === false || today > dateEvent || !activeStars ? true : false} href="" onClick={handleSubmit}>Submit review</button>
                        {user.isLogged === false && today < dateEvent && <p className={style.spanerror}>Please login to submit review.</p>}
                        {today > dateEvent && <p className={style.spanerror}>The event has not ended. Can't send review.</p>}
                    </div>
                </div>
            }
        </>
    )
}

export default Review;