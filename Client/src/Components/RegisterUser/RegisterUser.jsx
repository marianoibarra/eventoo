import React, { useEffect, useState } from "react";
import Styles from "./RegisterUser.module.css";
import { useSelector, useDispatch } from "react-redux";
import { createUser } from "../../Slice/CreateUse/CreateUserSlice";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
const navigate = useNavigate()
  const { name } = useSelector((state) => state.user);
  console.log(name)
  
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    date:"",
    password: "",
    confirmPassword: "",
  });
  const { loading, error } = useSelector((state) => state.register);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName|| !formData.email|| !formData.date|| !formData.password|| !formData.confirmPassword||formData.confirmPassword !== formData.password ) {
      error="One of the required fields is incorrect";
      return;}
    
    dispatch(createUser(formData));
  };
  
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
        {error && <p className={Styles.errorMessage}>{error.msg}</p>}
          <div className={Styles.Name}>
            <input
              className={Styles.container_input}
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              value={formData.firstName}
            />
            <input
              className={Styles.container_input}
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData.lastName}
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
            name="date"
            placeholder="Date"
            onChange={handleChange}
            value={formData.date}
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
          <button className={`btnprimario ${Styles.btn2}`}>
            Sign in with Google
          </button>
          <button className={`btnprimario ${Styles.btn2}`}>
            Sign in with Facebook
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
