// import React, { useEffect, useState, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { login, setMessaggeError } from "../../Slice/LoginForm/LoginFormSlice";
// import Styles from "./LoginForm.module.css";
// import { Link, useNavigate } from "react-router-dom";

// const LoginForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const { name } = useSelector((state) => state.user);
//   useEffect(() => {
//     if (name) {
//       navigate("/");
//     }
//   }, [name]);

//   const { loading, errorMsg, loginIn } = useSelector((state) => state.auth);
//   const googleButton = useRef()
//   const dispatch = useDispatch();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!formData.email || !formData.password) {
//       dispatch(setMessaggeError({msg:"Email or password fields are required."}))
//       return;
//     }
//     dispatch(login(formData));
//   };

//   // useEffect(() => {
//   //   setTimeout(function(){
//   //      if (loginIn) {
//   //     navigate("/");
//   //   }
//   //   },4000)
   
//   // }, [loginIn]);

//   useEffect(() => {
//     console.log(window)
//     window.google.accounts.id.renderButton(googleButton.current, {theme: 'outline', size: 'large', text: 'continue_with', logo_alignment: "center", width: 300})
//   }, [errorMsg])

//   return (
//     <div className={Styles.containerhero}>
//       <div className={Styles.containerItems}>
//         <Link to="/"><span className={Styles.title}>
//           EVEN<b>TOO</b>
//         </span></Link>
//         <h2 className={Styles.subTitle}>Sign In</h2>
//         {
//           <form onSubmit={handleSubmit} className={Styles.containerform}>
//             {errorMsg ? <p className={Styles.errorMessage}>{errorMsg.msg}</p> :
//             loginIn ?<p className={Styles.sendMessage}>Logged in successfully</p> : undefined}
//             <input
//               className={Styles.container_input}
//               type="email"
//               name="email"
//               placeholder="Email"
//               onChange={handleChange}
//               value={formData.email}
//             />
//             <input
//               className={Styles.container_input}
//               type="password"
//               name="password"
//               placeholder="Password"
//               onChange={handleChange}
//               value={formData.password}
//             />
//             <button
//               className={`btnprimario ${Styles.btn2}`}
//               type="submit"
//               disabled={loading}
//             >
//               {loading ? "Loading..." : "Login"}
//             </button>
//             <Link
//               to="/forgot-password"
//               className={Styles.btn}
//               id={Styles.btnLogin}
//             >
//               Forgot Password
//             </Link>
//             <div className={Styles.or2}>
//               <div className={Styles.or}></div>
//               <p className={Styles.or3}>or</p>
//               <div className={Styles.or}></div>
//             </div>
//             {/* <button className={`btnprimario ${Styles.btn2}`}>
//             Sign in with Google
//           </button>
//           <button style={{marginTop: '12px'}} className={`btnprimario ${Styles.btn2}`}>
//               Sign in with Facebook
//           </button> */}
//             <div
//               ref={googleButton}
//             ></div>
            
//             <Link to="/create-user">
//               <button className={`${Styles.btnCreate} ${Styles.btn}`}>
//                 Create Account
//               </button>
//             </Link>
//           </form>
//         }
//       </div>
//     </div>
//   );
// };

// export default LoginForm;
