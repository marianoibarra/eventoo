import React, { useContext, useEffect, useRef } from "react";
import styles from "./ModalSessionContainer.module.css";
import RegisterModal from "./RegisterModal";
import LoginModal from "./LoginModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import Portal from "../../Portal/Portal";
import { SessionContext } from "../../../";
import { useDispatch } from "react-redux";
import { clearErrors } from "../../../Slice/User/UserSlice";



const SessionModal = ({}) => {
  const refModal = useRef();
  const dispatch = useDispatch()
  const {showSessionModal, setShowSessionModal } = useContext(SessionContext);

  function handleClickOutside(event) {
    const cal = document.getElementsByClassName('MuiPickersPopper-root')[0]
    const acMap = document.getElementsByClassName('MuiAutocomplete-popper')[0]
    if(cal) {
      if (refModal.current && !refModal.current.contains(event.target) && !cal.contains(event.target)) {
        dispatch(clearErrors())
        setShowSessionModal(null);
      }
    } else if(acMap) {
      if (refModal.current && !refModal.current.contains(event.target) && !acMap.contains(event.target)) {
        dispatch(clearErrors())
        setShowSessionModal(null);
      }
    } else {
      if (refModal.current && !refModal.current.contains(event.target)) {
        dispatch(clearErrors())
        setShowSessionModal(null);
      }
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
      <div className={styles.background}>
        <div ref={refModal} className={styles.modal}>
          {showSessionModal === "register" && <RegisterModal key={'register'} />}
          {showSessionModal === "login" && <LoginModal key={'login'} />}
          {showSessionModal === "forgotPassword" && <ForgotPasswordModal key={'forgotPassword'} />}
        </div>
      </div>
    </Portal>
  );
};

export default SessionModal;
