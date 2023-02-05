import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../Slice/LoginForm/LoginFormSlice";
import Styles from "./LoginForm.module.css";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { name } = useSelector((state) => state.user);
  useEffect(() => {
    if (name) {
      navigate("/");
    }
  }, [name]);

  const { loading, error, loginIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Email and password fields are required.");
      return;
    }
    dispatch(login(formData));
  };

  useEffect(() => {
    if (loginIn) {
      navigate("/");
    }
  }, [loginIn]);
  return (
    <div className={Styles.containerhero}>
      <div className={Styles.containerItems}>
        <span className={Styles.title}>
          EVEN<b>TOO</b>
        </span>
        <h2 className={Styles.subTitle}>Sign Up</h2>
        <form onSubmit={handleSubmit} className={Styles.containerform}>
          {error && <p className={Styles.errorMessage}>{error.msg}</p>}
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
          <button
            className={`btnprimario ${Styles.btn2}`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </button>
          <Link to="/forgot-pass" className={Styles.btn} id={Styles.btnLogin}>
            Forgot Password
          </Link>
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
          <Link to="/create-user">
            <button className={`${Styles.btnCreate} ${Styles.btn}`}>
              Create Account
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
