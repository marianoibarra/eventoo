import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectEvent, updateDescription, updateName } from '../../../Slice/CreateEvent/CreateEvent';
import style from './BasicInfo.module.css'

function BasicInfo(){
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [description , setDescription] = useState('');
    const [errors, setErrors] = useState({});
    const [buttonEnabled, setButtonEnabled] = useState(false);

    const [input, setInput] = useState({
        name:'',
        description:''
    })

    function validate(input) {
        let errors={}
        if (!input.name) {errors.name ='Title is required'};
        if(!input.description) {errors.description = 'Description es required'}
        return errors;
    }

    const handleName = (e) => {
        e.preventDefault();
        setName(e.target.value);
        dispatch(updateName(e.target.value));
        setErrors(validate(e.target.value));
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    };
    const handleDescription = (e) => {
        e.preventDefault();
        setDescription(e.target.value);
        dispatch(updateDescription(e.target.value));
        setErrors(validate(e.target.value));
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    };

    return(
        <div className={style.info}>
            <h2 className={style.title}>Title</h2>
            <p className={style.text}>Pick a name for your event and tell guests why they'll love it.</p>
            <input className={style.inputs} type="text"  name='name' value={name} onChange={handleName} contentEditable='true' required/>
            {errors.name&&(
                            <p className="warning">{errors.name}</p>
                        )}
            <h2 className={style.title}>Short overview</h2>
            <p className={style.text}>Sum up in 140 characters or less why your event is unique, thrilling and worth attending."</p>
            {errors.description&&(
                            <p className="warning">{errors.description}</p>
                        )}
            <textarea className={style.description} type="text" name='description'
            value={description} onChange={handleDescription} rows='10' cols='75' required></textarea>
        </div>
    )
};
export default BasicInfo;