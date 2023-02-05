import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateEndDate, updateEndTime, updateStartDate, updateStartTime } from '../../../Slice/CreateEvent/CreateEvent';
import style from './DateTime.module.css'

function DateTime(){
    const dispatch = useDispatch();
    const [date, setDate] = useState('');
    const [time , setTime] = useState('');

    const [date2, setDate2] = useState('');
    const [time2 , setTime2] = useState('');

    const handleStartDate = (e) => {
        e.preventDefault();
        setDate(e.target.value);
        dispatch(updateStartDate(e.target.value));
        console.log('date', date);
    };

    const handleEndDate = (e) => {
        e.preventDefault();
        setDate2(e.target.value);
        dispatch(updateEndDate(e.target.value));
        console.log('date2',date2);
    };

    const handleStartTime = (e) => {
        e.preventDefault();
        setTime(e.target.value);
        dispatch(updateStartTime(e.target.value));
        console.log('time',time);
    };

    const handleEndTime = (e) => {
        e.preventDefault();
        setTime2(e.target.value);
        dispatch(updateEndTime(e.target.value));
        console.log('time2',time2);
    };

    return(
        <div className={style.info}>
            <h2 className={style.title}>Date and Time</h2>
            <p className={style.text}>Please choose the date and time that your event will take place. It's important to select the correct hour to ensure that your guests arrive on time.</p>
            <h4 className={style.title}>Start Date</h4>
            <input type='date' format='aaaa-mm-dd' onChange={handleStartDate}></input>
            <h4 className={style.title}>End date</h4>
            <input type='date' format='aaaa-mm-dd' onChange={handleEndDate}></input>
            <h4 className={style.title}>Start time</h4>
            <input type='time' onChange={handleStartTime}></input>
            <h4 className={style.title}>End time</h4>
            <input type='time' onChange={handleEndTime}></input>
        </div>
    )
};

export default DateTime;