import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectEvent, updateDescription, updateName } from '../../../Slice/CreateEvent/CreateEvent';
import style from './BasicInfo.module.css'

function BasicInfo(){
    const description2 = useSelector(state => state.event.description);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description , setDescription] = useState('');
    const name2 = useSelector(state => state.event.name);

    const handleName = (e) => {
        e.preventDefault();
        setName(e.target.value);
        dispatch(updateName(e.target.value));
    };
    const handleDescription = (e) => {
        e.preventDefault();
        setDescription(e.target.value);
        dispatch(updateDescription(e.target.value));
    };

    return(
        <div className={style.info}>
            <h2 className={style.title}>Title</h2>
            <p className={style.text}>Pick a name for your event and tell guests why they'll love it.</p>
            <input  type="text"  name='name' value={name} onChange={handleName}/>
            <h2 className={style.title}>Short overview</h2>
            <p className={style.text}>Sum up in 140 characters or less why your event is unique, thrilling and worth attending."</p>
            <input  type="text" name='description' value={description} onChange={handleDescription}></input>
        </div>
    )
};

export default BasicInfo;