import React, { useContext, useEffect, useState, useRef } from "react";
import { SessionContext } from "../../../App";
import { useSelector, useDispatch } from "react-redux";
import {
  login,
  setMessaggeError,
} from "../../../Slice/LoginForm/LoginFormSlice";
import Textfield from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Spinner } from "../Spinner/Spinner";
import styles from "./RegisterModal.module.css";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import GoogleMaps from "./MapRegister";


const RegisterModal = () => {
  const { setShowSessionModal } = useContext(SessionContext);
  const dispatch = useDispatch();
  const googleButton = useRef();

  const initialState = {
    email: "",
    password: "",
    name: "",
    last_name: "",
    born: "",
    address_line: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
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
    if (errorMsg.msg.length > 0) dispatch(setMessaggeError({ msg: "" }));
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

  const { loading, errorMsg, loginIn } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(input));
  };

  useEffect(() => {
    window.google.accounts.id.renderButton(googleButton.current, {
      theme: "outline",
      size: "large",
      text: "continue_with",
      logo_alignment: "center",
    });
  }, []);

  const [step, setStep] = useState(styles.s1);

  return (
    <>
      <header className={styles.header}>
        <div
          className={styles.closeBtn}
          onClick={() => {
            dispatch(setMessaggeError({ msg: "" }));
            setShowSessionModal(null);
          }}
        >
          🗙
        </div>
      </header>
      <div className={`${styles.scrollBox} ${step}`}>
        <section className={styles.loginWrapper}>
          <main className={styles.main}>
            <h3>Sign up to Eventoo</h3>
            <div className={styles.google}>
              <div className={styles.or2}>
                <div className={styles.or}></div>
                <p className={styles.or3}>or</p>
                <div className={styles.or}></div>
              </div>
              <div ref={googleButton} />
            </div>
            <form onSubmit={handleSubmit}>
              <div className={styles.namesWrapper}>
                <Textfield
                  name="name"
                  variant="standard"
                  label="First name"
                  value={input.name}
                  margin="dense"
                  helperText={showErr.name ? errors.name : ""}
                  error={showErr.name && errors.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <Textfield
                  name="last_name"
                  variant="standard"
                  label="Last name"
                  value={input.last_name}
                  margin="dense"
                  helperText={showErr.last_name ? errors.last_name : ""}
                  error={showErr.last_name && errors.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
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

              {errorMsg && (
                <span className={styles.errorMsg}>{errorMsg.msg}</span>
              )}

              <button
                className={`${styles.submit} ${styles.right}`}
                type="button"
                onClick={() => setStep(styles.s2)}
              >
                {loading ? <Spinner /> : "Next"}
              </button>

              <span className={styles.registerLink}>
                Got an account already?
                <span onClick={() => setShowSessionModal("login")}>
                  {"\u00A0 Log in"}
                </span>
              </span>
            </form>
          </main>
        </section>
        <div className={styles.loginWrapper}>
          <main className={styles.main}>
            <h3>Paso 2</h3>
            <form onSubmit={handleSubmit}>
              
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  id="date"
                  name="born"
                  label="Birthday"
                  openTo="year"
                  views={['year', 'month', 'day']}
                  value={input.born}
                  onChange={(value) => {setInput({...input, born: value?._d ? value._d : value}); console.log(input.born)}}
                  renderInput={(params) => <Textfield {...params} error={false} fullWidth/>}
                  />
              </LocalizationProvider>
              <GoogleMaps input={input} setInput={setInput}/>

              <button
                className={styles.submit}
                type="button"
                onClick={() => setStep(styles.s1)}
              >
                {loading ? <Spinner /> : "Prev"}
              </button>
              <button
                className={styles.submit}
                type="button"
                onClick={() => setStep(styles.s3)}
              >
                {loading ? <Spinner /> : "Next"}
              </button>
              <span className={styles.registerLink}>
                Got an account already?
                <span onClick={() => setShowSessionModal("login")}>
                  {"\u00A0 Log in"}
                </span>
              </span>
            </form>
          </main>
        </div>
        <div className={styles.loginWrapper}>
          <main className={styles.main}>
            <h3>Paso 3</h3>

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

              {errorMsg && (
                <span className={styles.errorMsg}>{errorMsg.msg}</span>
              )}

              <button
                className={styles.submit}
                type="button"
                onClick={() => setStep(styles.s2)}
              >
                {loading ? <Spinner /> : "Prev"}
              </button>
              <span className={styles.registerLink}>
                Got an account already?
                <span onClick={() => setShowSessionModal("login")}>
                  {"\u00A0 Log in"}
                </span>
              </span>
            </form>
          </main>
        </div>
      </div>
    </>
  );
};

export default RegisterModal;
