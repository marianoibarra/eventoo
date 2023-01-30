import React, { useState } from "react";
import style from "./SettingForm.module.css";

const SettingForm = () => {

    const initialInput = {
        profile_pic: 'https://images7.alphacoders.com/714/thumb-1920-714040.jpg',
        name: 'Nahuel',
        last_name: 'Alesso',
        email: 'nahuelalesso19@gmail.com',
        password: 'contrasenia',
        adress: 'Avenida Falsa 123',
        age: '03/10/1998',
        phone_number: '1159051914'
    }

    const initialName = initialInput.name;

    const [input, setInput] = useState(initialInput);

    const handleOnChange = (event) => {
        const obj = {
            ...input,
            [event.target.name]: event.target.value
        }
        setInput(obj);
    }

    return (
        <>
        <div className={style.prueba}>
        <h1 className={style.title}>Welcome, <span>{initialName}</span></h1>
        <div className={style.containerhero}>
            <form className={style.containerform}>
                <div className={style.name_and_lastname}>
                    <div className={style.container_input_name_last}>
                        <legend htmlFor="name">Name</legend>
                        <input type='text' name="name" value={input.name} onChange={handleOnChange}/>
                    </div>
                    <div className={style.container_input_name_last}>
                        <legend htmlFor="last_name">Last Name</legend>
                        <input type='text' name="last_name" value={input.last_name} onChange={handleOnChange}/>                        
                    </div>
                </div>
                <div className={style.container_input}>
                    <legend htmlFor="email">E-mail</legend>
                    <input type='text' name="email" value={input.email} onChange={handleOnChange}/>
                </div>
                <div className={style.container_input}>
                    <legend htmlFor="password">Password</legend>
                    <input type='password' name="password" value={input.password} onChange={handleOnChange}/>
                </div>
                <div className={style.container_input}>
                    <legend htmlFor="adress">Adress</legend>
                    <input type='text' name="adress" value={input.adress} onChange={handleOnChange}/>
                </div>
                <div className={style.container_input}>
                    <legend htmlFor="age">Age</legend>
                    <input type='text' name="age" value={input.age} onChange={handleOnChange}/>
                </div>
                <div className={style.container_input}>
                    <legend htmlFor="phone_number">Tel/Cell Number</legend>
                    <input type='number' name="phone_number" value={input.phone_number} onChange={handleOnChange}/>
                </div>
            </form>
            <div className={style.divprueba}>
                <img src={input.profile_pic} alt="Profile Pic" className={style.imagesetting} />
            </div>
        </div>
        </div>
        </>
    )
}

export default SettingForm;