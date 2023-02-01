import React, { useState } from "react";
import Styles from "./RegisterUser.module.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

        <h2 className={Styles.subTitle}>Sign In</h2>
        <form onSubmit={handleSubmit} className={Styles.containerform}>
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
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
          />
          <input
            className={Styles.container_input}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={formData.confirmPassword}
          />
          <button
            className={`btnprimario ${Styles.btn2}`}
            id={Styles.btnCreate}
            type="submit"
          >
            Create Account
          </button>
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
