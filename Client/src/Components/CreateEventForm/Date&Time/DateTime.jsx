import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './DateTime.module.css';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function DateTime({ input, setInput, errors, showMsg, setShowMsg }) {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(dayjs('2023-02-17'));

    const handleChange = (e) => {
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    const handleBlur = (e) => {
        setShowMsg({
            ...showMsg,
            [e.target.name]: true,
        })
    }


    return (
        <div className={style.info}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <h2 className={style.title}>Date and Time</h2>
                <p className={style.text}>
                    Please choose the date and time that your event will take place. It's important to select the correct hour to ensure that your guests arrive on time.
                </p>
                <div>
                    <h4 className={style.title}>Start</h4>
                    <div className={style.datetime}>
                        {/* <DatePicker
                            name='start_date'
                            label="Star date"
                            openTo="day"
                            inputFormat="DD/MM/YYYY"
                            views={['year', 'month', 'day']}
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                                console.log(value.$y,value.$M,value,value.$D)
                              }}
                            onBlur={handleBlur}
                            renderInput={(params) => <TextField {...params} />}
                        /> */}
                        <input
                            type='date'
                            className={style.inputs}
                            value={input.start_date}
                            name='start_date'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={showMsg.start_date && errors.start_date ? { border: 'red 1px solid' } : {}} />
                        {showMsg.start_date && (
                            <p className={style.warning}>{errors.start_date}</p>
                        )}
                        <input
                            type='time'
                            className={style.inputs}
                            name='start_time'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={input.start_time}
                            style={showMsg.start_time && errors.start_time ? { border: 'red 1px solid' } : {}} />
                        {showMsg.start_time && (
                            <p className={style.warning}>{errors.start_time}</p>
                        )}
                    </div>
                </div>
                <h4 className={style.title}>End</h4>
                <div className={style.datetime}>
                    <input
                        type='date'
                        className={style.inputs}
                        name='end_date'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={input.end_date}
                        style={showMsg.end_date && errors.end_date ? { border: 'red 1px solid' } : {}} />
                    {showMsg.end_date && (
                        <p className={style.warning}>{errors.end_date}</p>
                    )}
                    <input
                        type='time'
                        className={style.inputs}
                        name='end_time'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={input.end_time}
                        style={showMsg.end_time && errors.end_time ? { border: 'red 1px solid' } : {}} />
                    {showMsg.end_time && (
                        <p className={style.warning}>{errors.end_time}</p>
                    )}
                </div>
            </LocalizationProvider>
        </div>
    )
};

export default DateTime;