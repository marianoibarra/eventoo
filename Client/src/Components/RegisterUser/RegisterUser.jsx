import React, { useEffect, useState, useRef } from "react";
import Styles from "./RegisterUser.module.css";
import { useSelector, useDispatch } from "react-redux";
import { createUser } from "../../Slice/CreateUse/CreateUserSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  setMessaggeError,
  setMessaggeSend,
} from "../../Slice/LoginForm/LoginFormSlice";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
const RegisterForm = () => {
  const navigate = useNavigate();
  const { name } = useSelector((state) => state.user);
  const [showPassword, setShowPassword] = useState(false);
  const googleButton = useRef();

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    last_name: "",
    email: "",
    born: "",
    password: "",
    confirmPassword: "",
  });
  const { loading, error, loginIn } = useSelector((state) => state.register);
  const { errorMsg, sendMsg } = useSelector((state) => state.auth);
  function validatePassword(password) {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);

    return hasUppercase && hasLowercase && hasNumber && hasSpecial;
  }
  const handleChange = (e) => {
    if (
      e.target.name === "password" &&
      validatePassword(e.target.value) === false
    ) {
      dispatch(
        setMessaggeSend({
          msg: "Password must contain at least: A , a, Number, !#@",
        })
      );
    }
    if (
      e.target.name === "password" &&
      validatePassword(e.target.value) === true
    ) {
      dispatch(setMessaggeSend(null));
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.last_name ||
      !formData.email ||
      !formData.born ||
      !formData.password ||
      !formData.confirmPassword ||
      formData.confirmPassword !== formData.password
    ) {
      dispatch(
        setMessaggeError({ msg: "One of the required fields is incorrect" })
      );
      return;
    }
    if (validatePassword(formData.password) === false) {
      dispatch(
        setMessaggeSend({
          msg: "STOP! password must contain at least: A , a, Number,!#@",
        })
      );
    }
    dispatch(setMessaggeError(null));
    dispatch(createUser(formData));
  };

  useEffect(() => {
    window.google.accounts.id.renderButton(googleButton.current, {
      width: 300,
      theme: "outline",
      size: "large",
      text: "continue_with",
      logo_alignment: "center",
    });
  }, []);

  useEffect(() => {
    if (name) {
      navigate("/home");
    }
  }, [name]);
  return (
    <div className={Styles.containerhero}>
      <div className={Styles.containerItems}>
        <Link to="/">
          {" "}
          <span className={Styles.title}>
            EVEN<b>TOO</b>
          </span>
        </Link>

        <h2 className={Styles.subTitle}>Sign Up</h2>
        <form onSubmit={handleSubmit} className={Styles.containerform}>
          {error ? (
            <p className={Styles.errorMessage}>{error.msg}</p>
          ) : errorMsg ? (
            <p className={Styles.errorMessage}>{errorMsg.msg}</p>
          ) : sendMsg ? (
            <p className={Styles.sendMessage}>{sendMsg.msg}</p>
          ) : loginIn ? (
            <p className={Styles.sendMessage}>Email sended successfully</p>
          ) : undefined}
          <div className={Styles.Name}>
            <input
              className={`${Styles.container_input} ${
                formData.name.length === 0 ? Styles.null : undefined
              }`}
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              value={formData.name}
            />
            <input
              className={`${Styles.container_input} ${
                formData.last_name.length === 0 ? Styles.null : undefined
              }`}
              type="text"
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
              value={formData.last_name}
            />
          </div>

          <input
            className={`${Styles.container_input} ${
              formData.email.length === 0 ? Styles.null : undefined
            }`}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            className={`${Styles.container_input} ${
              formData.born.length === 0 ? Styles.null : undefined
            }`}
            type="date"
            name="born"
            placeholder="Date"
            onChange={handleChange}
            value={formData.born}
            min="1930-01-01"
            max="2005-01-31"
            pattern="\d{4}-\d{2}-\d{2}"
          />
          <div className={Styles.AiFillEye}>
            <input
              className={`${Styles.container_input} ${
                formData.password.length === 0 ||
                formData.password !== formData.confirmPassword
                  ? Styles.null
                  : undefined
              }`}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={formData.password}
            />
            <button
              className={Styles.AiFillEyes}
              type="button"
              onMouseDown={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible size={25}/> : <AiFillEye size={25}/>}
            </button>
          </div>
          <div className={Styles.AiFillEye}>
            <input
              className={`${Styles.container_input} ${
                formData.confirmPassword.length === 0 ||
                formData.password !== formData.confirmPassword
                  ? Styles.null
                  : undefined
              }`}
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={formData.confirmPassword}
            />
            <button
              type="button"
              className={Styles.AiFillEyes}
              onMouseDown={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiFillEyeInvisible size={25}/> : <AiFillEye size={25}/>}
            </button>
          </div>
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
          <div ref={googleButton}></div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
