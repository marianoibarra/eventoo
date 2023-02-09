import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Styles from "../FormForgot.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  RecoverPass,
  RecoverPassput,
} from "../../../Slice/RecoverPass/RecoverPassSlice";

const FormRecover = () => {
  const navigate = useNavigate();
  const { emailtoken } = useParams();

  const [formData, setFormData] = useState({
    newPassword: "",
  });

  const { name } = useSelector((state) => state.user);
  useEffect(() => {
    if (name) {
      navigate("/");
    }
    dispatch(RecoverPass(emailtoken));
  }, [emailtoken, name]);

  const { loading, error, loginIn, send } = useSelector(
    (state) => state.recover
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function validatePassword(password) {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*]/.test(password);

    return hasUppercase && hasLowercase && hasNumber && hasSpecial;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.newPassword) {
      alert("Enter the required information");
      return;
    }
    if (validatePassword(formData.newPassword) === false) {
      alert(
        "Remember that the password must contain: at least eight characters, a capital letter, a lower case letter, a number and a sign"
      );
      return;
    }
    dispatch(RecoverPassput({ ...formData, changePassToken: emailtoken }));
  };

  return (
    <div className={Styles.containerhero}>
      <div className={Styles.containerItems}>
      <Link to="/"><span className={Styles.title}>
          EVEN<b>TOO</b>
        </span></Link>
        <h2 className={Styles.subTitle}>Reset Password</h2>
        {
          <form onSubmit={handleSubmit} className={Styles.containerform}>
            {error && <p className={Styles.errorMessage}>{error.msg}</p>}
            {send ? (
              <p className={Styles.sendMessage}>¡Password change registered!</p>
            ) : loginIn ? (
              <p className={Styles.sendMessage}>Enter your new password</p>
            ) : undefined}
            <input
              className={Styles.container_input}
              type="type"
              name="newPassword"
              placeholder="password"
              onChange={handleChange}
              value={formData.newPassword}
            />
            <button
              className={`btnprimario ${Styles.btn2}`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Send"}
            </button>
          </form>
        }
      </div>
    </div>
  );
};

export default FormRecover;
