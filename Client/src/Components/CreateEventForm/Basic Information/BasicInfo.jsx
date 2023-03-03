import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectEvent, updateDescription, updateName } from '../../../Slice/CreateEvent/CreateEvent';
import style from './BasicInfo.module.css';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from "@mui/material/Box";

function BasicInfo({ input, setInput, errors, showMsg, setShowMsg, loading }) {
    const dispatch = useDispatch();

    const agesRange = [
        {
            value: 'ALL PUBLIC',
            label: 'ALL PUBLIC',
        },
        {
            value: "+13",
            label: '+13',
        },
        {
            value: "+16",
            label: "+16",
        },
        {
            value: "+18",
            label: "+18",
        },
    ];

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
        <Box sx={{ width: '80%' }} >
            <h2 className={style.title}>Title</h2>
            <p className={style.text}>Pick a name for your event and tell guests why they'll love it.</p>
            <TextField
                required
                name="name"
                label="Event name"
                variant="standard"
                value={input.name}
                sx={{ m: 1, width: '25ch' }}
                onChange={handleChange}
                onBlur={handleBlur}
                margin="dense"
                helperText={showMsg.name ? errors.name : ""}
                error={showMsg.name && errors.name}
                style={{ marginBottom: showMsg.name && errors.name ? '0px' : '20px', backgroundColor: 'var(--ligth-background-color)', WebkitTextFillColor: 'var(--dark-text)' }}
                disabled={loading}
                maxLength='40'
            />
            <h2 className={style.title}>Short overview</h2>
            <p className={style.text}>Sum up in 140 characters or less why your event is unique, thrilling and worth attending.</p>
            <TextField
              
                name='description'
                multiline
                value={input.description}
                rows={5}
                sx={{ m: 1, width: '100%', WebkitTextFillColor: 'var(--dark-text)', backgroundColor: 'var(--ligth-background-color)'}}
                placeholder='Write here...'
                onChange={handleChange}
                onBlur={handleBlur}
                margin="dense"
                helperText={showMsg.description ? errors.description : ""}
                error={showMsg.description && errors.description}
                style={{ marginBottom: showMsg.description && errors.description ? '0px' : '20px', backgroundColor: 'var(--ligth-background-color)'}}
                disabled={loading}
                maxLength={140}
            />
            <h2 className={style.title}>Public target</h2>
            <p className={style.text}>Select your public target</p>
            <TextField
                select
                label="Age range"
                name='age_range'
                value={input.age_range}
                variant="standard"
                onChange={handleChange}
                onBlur={handleBlur}
                margin="dense"
                sx={{ m: 1, width: '25ch',WebkitTextFillColor: 'var(--dark-text)' }}
                helperText={showMsg.age_range ? errors.age_range : ""}
                error={showMsg.age_range && errors.age_range}
                style={{ marginBottom: showMsg.age_range && errors.age_range ? '0px' : '20px',backgroundColor: 'var(--ligth-background-color)'}}
                disabled={loading}
            >
                {agesRange.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
        </Box>
    )
};
export default BasicInfo;