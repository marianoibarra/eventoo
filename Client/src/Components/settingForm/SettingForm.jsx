import React, { useState } from "react";
import { useSelector } from "react-redux";
import style from "./SettingForm.module.css";

const SettingForm = () => {
    const { name, last_name, email, image, born , address} = useSelector((state) => state.user);
    const initialInput = {
        profile_pic: image,
        name: name,
        last_name: last_name,
        email: email,
        password: 'contrasenia',
        address: address ? `${address.address_line}, ${address.city}, ${address.state}, ${address.country}` : 'No address loaded',
        age: born,
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
                        <input type='text' name="name" value={input?.name} onChange={handleOnChange}/>
                    </div>
                    <div className={style.container_input_name_last}>
                        <legend htmlFor="last_name">Last Name</legend>
                        <input type='text' name="last_name" value={input?.last_name} onChange={handleOnChange}/>                        
                    </div>
                </div>
                <div className={style.container_input}>
                    <legend htmlFor="email">E-mail</legend>
                    <input type='text' name="email" value={input?.email} onChange={handleOnChange}/>
                </div>
                <div className={style.container_input}>
                    <legend htmlFor="password">Password</legend>
                    <input type='password' name="password" value={input?.password} onChange={handleOnChange}/>
                </div>
                <div className={style.container_input}>
                    <legend htmlFor="adress">Adress</legend>
                    <input type='text' name="adress" value={input?.address? input.address: 'No address loaded'} onChange={handleOnChange}/>
                </div>
                <div className={style.container_input}>
                    <legend htmlFor="age">Age</legend>
                    <input type='text' name="age" value={input?.age} onChange={handleOnChange}/>
                </div>
            </form>
            <div className={style.divprueba}>
                <img src={input?.profile_pic} alt="Profile Pic" className={style.imagesetting} />
            </div>
        </div>
        </div>
        </>
    )
}

export default SettingForm;