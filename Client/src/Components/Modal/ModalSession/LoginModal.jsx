import React, { useContext, useEffect, useState, useRef } from "react";
import { SessionContext } from "../../../";
import { useSelector, useDispatch } from "react-redux";
// import { login, setMessaggeError } from "../../../Slice/LoginForm/LoginFormSlice";
import Textfield from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Spinner } from "../Spinner/Spinner";
import styles from "./LoginModal.module.css";
import { clearErrors, login } from "../../../Slice/User/UserSlice";

const LoginModal = () => {
  const { setShowSessionModal } = useContext(SessionContext);
  const dispatch = useDispatch();
  const googleButton = useRef();

  const initialState = {
    email: "",
    password: "",
  };

  const validate = (input) => {
    const regexp_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const errors = {};

    if (input.email.length === 0) {
      errors.email = "Email is required";
    } else if (!regexp_email.test(input.email)) {
      errors.email = "Email invalid";
    }

    if (input.password.length === 0) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const [input, setInput] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showErr, setShowErr] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    if(error.msg.length > 0) dispatch(clearErrors());
  };

  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

  const handleBlur = (e) => {
    setShowErr({
      ...showErr,
      [e.target.name]: true,
    });
  };

  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({input,setShowSessionModal}));
  };

  useEffect(() => {
    window.google.accounts.id.renderButton(googleButton.current, {
      theme: "outline",
      size: "large",
      text: "continue_with",
      logo_alignment: "center",
    });
  }, []);

  return (
    <div className={styles.loginWrapper}>
      <header className={styles.header}>
        <div
          className={styles.closeBtn}
          onClick={() => {
            dispatch(clearErrors())
            setShowSessionModal(null);
          }}
        >
          🗙
        </div>
      </header>
      <main className={styles.main}>
        <h3>Log in to Eventoo</h3>
        <div className={styles.google}>
          <div className={styles.or2}>
            <div className={styles.or}></div>
            <p className={styles.or3}>or</p>
            <div className={styles.or}></div>
          </div>
          <div ref={googleButton} />
        </div>
        <form onSubmit={handleSubmit}>
          <Textfield
            name="email"
            variant="standard"
            label="Email"
            value={input.email}
            margin="dense"
            helperText={showErr.email ? errors.email : ""}
            error={showErr.email && errors.email}
            onChange={handleChange}
            fullWidth
            onBlur={handleBlur}
            style={{marginBottom: showErr.email && errors.email ? '0px' : '23px'}}
          />
          <Textfield
            name="password"
            variant="standard"
            label="Password"
            value={input.password}
            onChange={handleChange}
            margin="dense"
            fullWidth
            helperText={showErr.password ? errors.password : ""}
            error={showErr.password && errors.password}
            type={showPassword ? "text" : "password"}
            style={{marginBottom: showErr.password && errors.password ? '0px' : '23px'}}
            onBlur={handleBlur}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                </IconButton>
              </InputAdornment>
            }
          />

          
          <span
            className={styles.forgotLink}
            onClick={() => setShowSessionModal("forgotPassword")}
            >
            Forgot your password?
          </span>
          {error && <span className={styles.errorMsg}>{error.msg}</span>}

          <button disabled={loading || Object.keys(errors).length > 0} className={styles.submit} type="submit">
              {loading ? <Spinner/> : 'Log in with Email'}
          </button>
          <span className={styles.registerLink}>
            New to Eventoo?
            <span onClick={() => setShowSessionModal("register")}>
              {"\u00A0 Sign up"}
            </span>
          </span>
        </form>
      </main>
    </div>
  );
};

export default LoginModal;
