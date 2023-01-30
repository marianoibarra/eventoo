import React, { useState } from "react";
import Styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (

    <div className={Styles.containerhero}>
      <div className={Styles.containerItems}>
      <span className={Styles.title}>
        EVEN<b>TOO</b>
      </span>

      <h2 className={Styles.subTitle}>Sign Up</h2>
      <form onSubmit={handleSubmit} className={Styles.containerform}>
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
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
        />
        <button className={`btnprimario ${Styles.btn2}`}  type="submit">
          Login
        </button>
        <button className={Styles.btn} id={Styles.btnLogin}>Forgot Password</button>
        <button className={`btnprimario ${Styles.btn2}`}>Sign in with Google</button>
        <button className={`btnprimario ${Styles.btn2}`} >Sign in with Facebook</button>
        <button className={Styles.btn}>Create Account</button>
      </form>
      </div>
    </div>
  );
};

export default LoginForm;
