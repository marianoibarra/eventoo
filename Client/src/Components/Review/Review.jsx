import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { axiosModeEventDetail, clear } from "../../Slice/EventDetail/EventDetailSlice";
import { API } from "../../App";
import covers from "../../imgs/covers";
import { Box, TextField } from "@mui/material";
import { Alert } from "@mui/material";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import style from "./Review.module.css";

const sx = {
    borderRadius: '12px',
    margin: '0 auto',
    width: "max-content",
    mb: "20px"
}

const Review = () => {

    const { eventDetail, loading, error } = useSelector(state => state.eventDetail);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { id } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();
    const stars = searchParams.get("stars");
    const [activeStars, setActiveStars] = useState(stars ? stars : 0);
    const totalStars = 5;

    const [comment, setComment] = useState('');
    const [errors, setErrors] = useState({comment: 'Comment is require.'});
    const [result, setResult] = useState({
        result: null,
        msg: ''
    });

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
            await API.post(`/reviews`, body);
            setResult({
                result: true,
                msg: "Review submitted successfully"
            });
            setErrors({msg: 'Review submitted'})
        } catch (error) {
            setResult({
                result: false,
                msg: error.response.data.msg
            });
        }
    }

    useEffect(() => {
        dispatch(axiosModeEventDetail(id));
        return () => dispatch(clear());
    }, [dispatch]);
    
    if(loading) return <div className={style.spinner}><div></div><div></div><div></div><div></div></div>;
    if(error || Object.keys(eventDetail).length === 0) return <div className={style.error}>Something was wrong..</div>

    const today = new Date();
    const dateEvent = new Date(`${eventDetail?.end_date}, ${eventDetail?.end_time}`);

    console.log(today, 1)
    console.log(dateEvent, 2);

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

                        <TextField
                            // label="Description"
                            name='description'
                            multiline
                            value={comment}
                            rows={4}
                            sx={{ m: 1, width: '70%', flexGrow:1}}
                            label='Comment'
                            onChange={handleOnChange}
                            // onBlur={handleBlur}
                            margin="dense"
                            helperText={errors.comment}
                            error={errors.comment}
                        />
                        {/* <textarea className={errors.comment ? style.error : style.good} maxLength={600} name="comment" value={comment} placeholder='Comment...' onChange={handleOnChange}/> */}
                        {/* {errors.comment && <p className={style.spanerror}>{errors.comment}</p>} */}

                        <button className={style.submit} disabled={Object.keys(errors).length || user.isLogged === false || today < dateEvent || !activeStars || result.result === false ? true : false} href="" onClick={handleSubmit}>Submit review</button>

                        {today && user.isLogged === false && today > dateEvent && <Alert sx={sx} severity="warning">Please login to submit review.</Alert>}

                        {today && today < dateEvent && <Alert sx={sx} severity="warning">The event has not ended. Can't send review.</Alert>}

                        {result.result && <Alert sx={sx} severity="success">{result.msg}</Alert>}

                        {result.result === false && <Alert sx={sx} severity="error">{result.msg}</Alert>}
                    </div>
                </div>
            }
        </>
    )
}

export default Review;