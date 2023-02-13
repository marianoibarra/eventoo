import React, { useEffect, useRef } from "react";
import styles from "./Modal.module.css";
import Portal from "../Portal/Portal";

const Modal = ({ setShowModal, children, width, height, backgroundColor }) => {
  const refModal = useRef();

  function handleClickOutside(event) {
    if (refModal.current && !refModal.current.contains(event.target)) {
      setShowModal(false)
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.style.overflow = 'auto'
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const style = {
    maxWidth: width,
    maxHeight: height,
    backgroundColor
  }

  return (
    <Portal>
      <div className={styles.background}>
        <div style={style} ref={refModal} className={styles.modal}>
          { children }
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
