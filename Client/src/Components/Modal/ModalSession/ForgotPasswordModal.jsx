import React, { useContext, useEffect, useState, useRef } from "react";
import { SessionContext } from "../../../";
import { useSelector, useDispatch } from "react-redux";
import Textfield from "@mui/material/TextField";
import { Spinner } from "../Spinner/Spinner";
import styles from "./ForgotPasswordModal.module.css";
import { clearErrors, login } from "../../../Slice/User/UserSlice";

const ForgotPasswordModal = () => {
  const {setShowSessionModal} = useContext(SessionContext)

  const dispatch = useDispatch();

  const validate = (input) => {
    const regexp_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let error = '';

    if (input.length === 0) {
      error = "Email is required";
    } else if (!regexp_email.test(input)) {
      error = "Email invalid";
    }

    return error;
  };

  const [input, setInput] = useState('');
  const [errors, setErrors] = useState('');
  const [showErr, setShowErr] = useState(false);

  const handleChange = (e) => {
    setInput(e.target.value);
    if(error.msg.length > 0) dispatch(clearErrors());
  };

  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

  const handleBlur = (e) => {
    setShowErr(true);
  };

  const { loading, error } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({input,setShowSessionModal}));
  };
  
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
        <h3>Forgot your password?</h3>
        <p className={styles.subtitle}>Enter your email address to reset your password.</p>
        <form onSubmit={handleSubmit}>
          <Textfield
            name="email"
            variant="standard"
            label="Email"
            value={input}
            margin="dense"
            helperText={showErr ? errors : ""}
            error={showErr && errors}
            onChange={handleChange}
            fullWidth
            onBlur={handleBlur}
            style={{marginBottom: showErr.email && errors.email ? '0px' : '23px'}}
          />
          
          {error && <span className={styles.errorMsg}>{error.msg}</span>}

          <button disabled={loading || errors} className={styles.submit} type="submit">
              {loading ? <Spinner/> : 'Reset password'}
          </button>
        </form>
      </main>
    </div>
  )
}

export default ForgotPasswordModal