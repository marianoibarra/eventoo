import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from './DateTime.module.css';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker, DateValidationError } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

function DateTime({ input, setInput, errors, showMsg, setShowMsg, loading }) {
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(dayjs('2023-02-17'));
    const today = dayjs();

    const [error, setError] = useState(null);
    const errorMessage = useMemo(() => {
        switch (error) {
          case 'minDate': {
            return 'Please select a date that it is not in the past';
          }
    
          case 'invalidDate': {
            return 'Your date is not valid';
          }
    
          default: {
            return '';
          }
        }
      }, [error]);

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
            <LocalizationProvider dateAdapter={AdapterMoment}>
                <h2 className={style.title}>Date and Time</h2>
                <p className={style.text}>
                    Please choose the date and time that your event will take place. It's important to select the correct hour to ensure that your guests arrive on time.
                </p>
                <div>
                    {/* <h4 className={style.title}>Start</h4> */}
                    <div className={style.datetime}>
                        <DatePicker
                            disablePast
                            tabIndex={-1}
                            id="date"
                            name='start_date'
                            label="Date of event"
                            variant="standard"
                            openTo="day"
                            inputFormat="YYYY-MM-DD"
                            views={['year', 'month', 'day']}
                            value={input.start_date}
                            OpenPickerButtonProps={{ tabIndex: -1 }}
                            onError={(newError) => setError(newError)}
                            slotProps={{
                                textField: {
                                    helperText: errorMessage,
                                },
                            }}
                            minDate={today}
                            onChange={(value) => {
                                setInput({
                                    ...input,
                                    start_date: value && value.hasOwnProperty('_d') ? value._d : value,
                                    end_date: value && value.hasOwnProperty('_d') ? value._d : value,
                                });
                            }}
                            onBlur={handleBlur}
                            renderInput={(params) => <TextField {...params} sx={{
                                svg: {color:'var(--dark-text)'},
                                input: {color:'var(--dark-text)'},
                                label: {color:'var(--dark-text)'},
                                backgroundColor: 'var(--ligth-background-color)'
                              }}/>}
                            disabled={loading}
                            style={{ marginBottom: showMsg.start_date && errors.start_date ? '0px' : '20px', backgroundColor: 'var(--bg-elevation)', WebkitTextFillColor: 'var(--dark-text)' }}
                        />
                    </div>
                </div>
                <div className={style.datetime}>
                    <h4 className={style.title}>Start time:</h4>
                    <input
                        type='time'
                        className={style.inputs}
                        name='start_time'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={input.start_time}
                        disabled={loading}
                        style={showMsg.start_time && errors.start_time ? { border: 'red 1px solid' } : {}} />
                    {showMsg.start_time && (
                        <p className={style.warning}>{errors.start_time}</p>
                    )}
                    <h4 className={style.title}>End time:</h4>
                    <input
                        type='time'
                        className={style.inputs}
                        name='end_time'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={input.end_time}
                        disabled={loading}
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