import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Styles from "../FormForgot.module.css";
import { Link, useNavigate } from "react-router-dom";


const FormRecover = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
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
    if (!formData.email) {
      alert("Email fields are required.");
      return;
    }
    
  };


  return (
    <div className={Styles.containerhero}>

      <div className={Styles.containerItems}>
        <span className={Styles.title}>
          EVEN<b>TOO</b>
        </span>
        <h2 className={Styles.subTitle}>Forgot Password</h2>
        {  <form onSubmit={handleSubmit} className={Styles.containerform}>
          {error  && <p className={Styles.errorMessage}>{error.msg}</p>}
          {loginIn  && <p className={Styles.errorMessage}></p>}
          <input
            className={Styles.container_input}
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
          />
          <button
            className={`btnprimario ${Styles.btn2}`}
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Send"}
          </button>

        </form>}
      </div>

    </div>
  );
};

export default FormRecover;
