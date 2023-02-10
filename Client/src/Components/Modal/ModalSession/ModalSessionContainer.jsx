import React, { useContext, useEffect, useRef } from "react";
import styles from "./ModalSessionContainer.module.css";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import Portal from "../../Portal/Portal";
import { SessionContext } from "../../../App";
import { useDispatch } from "react-redux";
import { setMessaggeError } from "../../../Slice/LoginForm/LoginFormSlice";


const SessionModal = ({}) => {
  const refModal = useRef();
  const dispatch = useDispatch()
  const {showSessionModal, setShowSessionModal, anim } = useContext(SessionContext);

  function handleClickOutside(event) {
    if (refModal.current && !refModal.current.contains(event.target)) {
      dispatch(setMessaggeError({msg:""}))
      setShowSessionModal(null);
    }
  }

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <Portal>
      <div style={anim ?  {} : {animation: 'none'}} className={styles.background}>
        <div style={anim ? {} : {animation: 'none'}} ref={refModal} className={styles.modal}>
          {showSessionModal === "register" && <RegisterModal key={'register'} />}
          {showSessionModal === "login" && <LoginModal key={'login'} />}
          {showSessionModal === "forgotPassword" && <ForgotPasswordModal key={'forgotPassword'} />}
        </div>
      </div>
    </Portal>
  );
};

export default SessionModal;
