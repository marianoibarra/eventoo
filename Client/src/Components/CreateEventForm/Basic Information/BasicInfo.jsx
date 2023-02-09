import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectEvent, updateDescription, updateName } from '../../../Slice/CreateEvent/CreateEvent';
import style from './BasicInfo.module.css'

function BasicInfo({input,setInput,errors, showMsg, setShowMsg, event}){
    const dispatch = useDispatch();

    const handleChange = (e) => {
        e.preventDefault();
        dispatch(updateDescription(e.target.value));
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };

    const handleName = (e) => {
        e.preventDefault();
        dispatch(updateName(e.target.value));
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
            <h2 className={style.title}>Title</h2>
            <p className={style.text}>Pick a name for your event and tell guests why they'll love it.</p>
            <input className={style.inputs} type="text"  name='name' value={input.name} onChange={handleName} contentEditable='true' onBlur={handleBlur} style={ showMsg.name && errors.name ? {border:'red 1px solid'}: {}} />
            {showMsg.name&&(
                            <p className={style.warning}>{errors.name}</p>
                        )}
            <h2 className={style.title}>Short overview</h2>
            <p className={style.text}>Sum up in 140 characters or less why your event is unique, thrilling and worth attending."</p>
            
            <textarea className={style.description} type="text" name='description'
            value={input.description} onChange={handleChange} rows='10' cols='75' onBlur={handleBlur} ></textarea>
            {showMsg.description&&(
                            <p className={style.warning}>{errors.description}</p>
                        )}
        </div>
    )
};
export default BasicInfo;