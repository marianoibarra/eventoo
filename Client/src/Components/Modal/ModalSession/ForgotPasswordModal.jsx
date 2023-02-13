import React, { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../../";
import Textfield from "@mui/material/TextField";
import { Spinner } from "../Spinner/Spinner";
import styles from "./ForgotPasswordModal.module.css";
import axios from "axios";

const ForgotPasswordModal = () => {
  const { setShowSessionModal } = useContext(SessionContext);

  const validate = (input) => {
    const regexp_email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let error = "";

    if (input.length === 0) {
      error = "Email is required";
    } else if (!regexp_email.test(input)) {
      error = "Email invalid";
    }
    return error;
  };

  const [input, setInput] = useState("");
  const [errors, setErrors] = useState("");
  const [showErr, setShowErr] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleBlur = (e) => {
    setShowErr(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setIsSuccess(null);
    const submit = async () => {
      try {
        const res = await axios.post(
          "https://api.eventoo.com.ar/user/forgot-password",
          { email: input }
          );
        setLoading(false);
        setIsSuccess(true);
        setMsg(res.data.msg);
      } catch (error) {
        setLoading(false);
        setIsSuccess(false);
        setMsg(error.response.data.msg);
      }
    };
    submit();
  };

  useEffect(() => {
    setErrors(validate(input));
  }, [input]);

  const Success = () => {
    return (
      <div className={styles.loginWrapper}>
        <header className={styles.header}>
          <div
            className={styles.closeBtn}
            onClick={() => {
              setShowSessionModal(null);
            }}
          >
            🗙
          </div>
        </header>
        <main className={styles.main}>
          <h3>Email sent</h3>
          <p className={styles.subtitle}>
            {`Check your ${input} inbox for instructions on how to reset your password. You may need to check your spam folder.`}
          </p>
          <button
            disabled={loading || errors}
            onClick={() => {
              setShowSessionModal(null);
            }}
            className={styles.submit}
            type="button"
          >
            OK
          </button>
          <span className={styles.registerLink}>
            Didn’t receive the email?
            <span onClick={() => setIsSuccess("null")}>
              {"\u00A0 Try again"}
            </span>
          </span>
        </main>
      </div>
    );
  };

  const Failed = () => {
    return (
      <div className={styles.loginWrapper}>
        <header className={styles.header}>
          <div
            className={styles.closeBtn}
            onClick={() => {
              setShowSessionModal(null);
            }}
          >
            🗙
          </div>
        </header>
        <main className={styles.main}>
          <h3>Something were wrong</h3>
          <p className={styles.subtitle}>{msg}</p>
          <button
            disabled={loading || errors}
            onClick={() => {
              setIsSuccess(null);
            }}
            className={styles.submit}
            type="button"
          >
            Try again
          </button>
        </main>
      </div>
    );
  };

  if (isSuccess === true) return <Success />;
  if (isSuccess === false) return <Failed />;

  return (
    <div className={styles.loginWrapper}>
      <header className={styles.header}>
        <div
          className={styles.closeBtn}
          onClick={() => {
            setShowSessionModal(null);
          }}
        >
          🗙
        </div>
      </header>
      <main className={styles.main}>
        <h3>Forgot your password?</h3>
        <p className={styles.subtitle}>
          Enter your email address to reset your password.
        </p>
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
            style={{
              marginBottom: showErr.email && errors.email ? "0px" : "23px",
            }}
          />
          <button
            disabled={loading || errors}
            className={styles.submit}
            type="submit"
          >
            {loading ? <Spinner /> : "Reset password"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default ForgotPasswordModal;
