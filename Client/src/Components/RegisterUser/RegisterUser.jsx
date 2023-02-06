import React, { useEffect, useState, useRef } from "react";
import Styles from "./RegisterUser.module.css";
import { useSelector, useDispatch } from "react-redux";
import { createUser } from "../../Slice/CreateUse/CreateUserSlice";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
const navigate = useNavigate()
  const { name } = useSelector((state) => state.user);
  const googleButton = useRef()
  
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    born:"",
    password: "",
    confirmPassword: "",
  });
  const { loading, error,loginIn } = useSelector((state) => state.register);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.first_name || !formData.last_name|| !formData.email|| !formData.born|| !formData.password|| !formData.confirmPassword||formData.confirmPassword !== formData.password ) {
      alert("One of the required fields is incorrect")
      return;}
      console.log(formData)
    dispatch(createUser(formData));
  };

  useEffect(() => {
    window.google.accounts.id.renderButton(googleButton.current, {width: 300,theme: 'outline', size: 'large', text: 'continue_with', logo_alignment: "center"})
  }, [])
  
  useEffect(() => {
if(name){
  navigate('/')
}
  }, [name])
  return (
    <div className={Styles.containerhero}>
      <div className={Styles.containerItems}>
        <span className={Styles.title}>
          EVEN<b>TOO</b>
        </span>

        <h2 className={Styles.subTitle}>Sign In</h2>
        <form onSubmit={handleSubmit} className={Styles.containerform}>
        {error ? <p className={Styles.errorMessage}>{error.msg}</p> :
            loginIn ? <p className={Styles.sendMessage}>Email sended successfully</p>: undefined}
          <div className={Styles.Name}>
            <input
              className={Styles.container_input}
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={formData.name}
            />
            <input
              className={Styles.container_input}
              type="text"
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData.last_name}
            />
          </div>

          <input
            className={Styles.container_input}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            className={Styles.container_input}
            type="date"
            name="born"
            placeholder="Date"
            onChange={handleChange}
            value={formData.born}
            min="1930-01-01" max="2005-01-31"
            pattern="\d{4}-\d{2}-\d{2}"
          />
          <input
            className={Styles.container_input}
            type="text"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />
          <input
            className={Styles.container_input}
            type="text"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={formData.confirmPassword}
          />
          <button
            className={`btnprimario ${Styles.btn2}`}
            id={Styles.btnCreate}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Create Account"}
          </button>
          <div className={Styles.or2}>
            <div className={Styles.or}></div>
            <p className={Styles.or3}>or</p>
            <div className={Styles.or}></div>
          </div>
          {/* <button className={`btnprimario ${Styles.btn2}`}>
            Sign in with Google
          </button> 
          <button style={{marginTop: '12px'}} className={`btnprimario ${Styles.btn2}`}>
            Sign in with Facebook
          </button>*/}
          <div
              ref={googleButton}
          ></div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
