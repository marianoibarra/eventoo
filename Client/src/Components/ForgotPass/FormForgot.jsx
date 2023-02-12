// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { forgotPass } from "../../Slice/ForgotPass/ForgotPassSlice";
// import Styles from "./FormForgot.module.css";
// import { Link, useNavigate } from "react-router-dom";
// import { setMessaggeError, setMessaggeSend } from "../../Slice/LoginForm/LoginFormSlice";

// const Forgot = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//   });

//   const { name } = useSelector((state) => state.user);
//   useEffect(() => {
//     if (name) {
//       navigate("/");
//     }
//   }, [name]);
//   const regex_email = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
//   const { loading, error, loginIn } = useSelector((state) => state.forgot);
//   const { sendMsg , errorMsg } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const handleChange = (e) => {

//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.email) {
//      dispatch(setMessaggeSend({msg:"Email is required"}))
//       return;
//     }
//     if (!regex_email.test(formData.email)) {
//       dispatch(setMessaggeError({msg:"That email is invalid"}))
//       return;
//     } 
//     dispatch(setMessaggeSend(null))
//     dispatch(setMessaggeError(null))
//     dispatch(forgotPass(formData));
//   }

//   return (
//     <div className={Styles.containerhero}>
//       <div className={Styles.containerItems}>
//         <Link to="/"><span className={Styles.title}>
//           EVEN<b>TOO</b>
//         </span></Link>
//         <h2 className={Styles.subTitle}>Forgot Password</h2>
//         {
//           <form onSubmit={handleSubmit} className={Styles.containerform}>
//             {error ? <p className={Styles.errorMessage}>{error.msg}</p> :
//             sendMsg===undefined? <p className={Styles.sendMessage}>Enter the user's email to recover the password</p>:
//             sendMsg ? <p className={Styles.errorMessage}>{sendMsg.msg}</p> :
//             loginIn ? <p className={Styles.sendMessage}>Email sended successfully</p>:
//              undefined}
//             <input
//               className={Styles.container_input}
//               type="email"
//               name="email"
//               placeholder="Email"
//               onChange={handleChange}
//               value={formData.email}
//             />
//             <button
//               className={`btnprimario ${Styles.btn2}`}
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Send"}
//             </button>
//           </form>
//         }
//       </div>
//     </div>
//   );
// };

// export default Forgot;
