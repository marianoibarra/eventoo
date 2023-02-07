import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateEndDate, updateEndTime, updateStartDate, updateStartTime } from '../../../Slice/CreateEvent/CreateEvent';
import style from './DateTime.module.css'

function DateTime({input,setInput,errors, showMsg, setShowMsg}){
    const dispatch = useDispatch();

    // const handleChange = (e) => {
    //     e.preventDefault();
    //     setInput({
    //         ...input,
    //         [e.target.name]: e.target.value
    //     })
    // };

    const handleStartDate = (e) => {
        e.preventDefault();
        dispatch(updateStartDate(e.target.value));
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    const handleEndDate = (e) => {
        e.preventDefault();
        dispatch(updateEndDate(e.target.value));
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    const handleStartTime = (e) => {
        e.preventDefault();
        dispatch(updateStartTime(e.target.value));
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    const handleEndTime = (e) => {
        e.preventDefault();
        dispatch(updateEndTime(e.target.value));
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    const handleBlur = (e) =>{
        setShowMsg({
            ...showMsg,
            [e.target.name]: true,
        })
    }


    return(
        <div className={style.info}>
            <h2 className={style.title}>Date and Time</h2>
            <p className={style.text}>Please choose the date and time that your event will take place. It's important to select the correct hour to ensure that your guests arrive on time.</p>
            <h4 className={style.title}>Start Date</h4>
            <input type='date' className={style.inputs} format='aaaa-mm-dd' onChange={handleStartDate} onBlur={handleBlur}  style={ showMsg.start_date && errors.start_date ? {border:'red 1px solid'}: {}}/>
            {showMsg.start_date&&(
                            <p className={style.warning}>{errors.start_date}</p>
                        )}
            <h4 className={style.title}>End date</h4>
            <input type='date' className={style.inputs}  format='aaaa-mm-dd' name='end_date' onChange={handleEndDate} onBlur={handleBlur} value={input.end_date} style={ showMsg.end_date && errors.end_date ? {border:'red 1px solid'}: {}}/>
            {showMsg.end_date&&(
                            <p className={style.warning}>{errors.end_date}</p>
                        )}
            <h4 className={style.title}>Start time</h4>
            <input type='time' className={style.inputs} name='start_time' onChange={handleStartTime} onBlur={handleBlur} value={input.start_time} style={ showMsg.start_time && errors.start_time ? {border:'red 1px solid'}: {}}/>
            {showMsg.start_time&&(
                            <p className={style.warning}>{errors.start_time}</p>
                        )}
            <h4 className={style.title}>End time</h4>
            <input type='time' className={style.inputs} name='end_time' onChange={handleEndTime}onBlur={handleBlur} value={input.end_time} style={ showMsg.end_time && errors.end_time ? {border:'red 1px solid'}: {}}/>
            {showMsg.end_time&&(
                            <p className={style.warning}>{errors.end_time}</p>
                        )}
        </div>
    )
};

export default DateTime;