import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store";

export const SessionContext = createContext()
export const ThemeContext = createContext()

const root = ReactDOM.createRoot(document.getElementById("root"));

function useLocalStorage(key, initialValue) {

  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue

      {eventDetail.category?.modality === "Virtual" && 
        <div className={style.container_date}>
          <div className={style.containericon}>
          <span className={eventDetail.typePack === 'PREMIUM' ? style.iconspan_premium : style.iconspan}>
            {" "}
            <AiOutlineLink size={35} />{" "}
          </span>
          <span className={style.iconspantext}>URL</span>
          </div>
          <p className={style.url}>{`Once you purchase your ticket we'll send you the link to your email.`}</p>
        </div>
      }

    <div className={style.container_date}>
        <div className={style.containericon}>
          <span className={eventDetail.typePack === 'PREMIUM' ? style.iconspan_premium : style.iconspan}>
            {" "}
            <RiTicket2Fill size={35} />{" "}
          </span>
          <span className={style.iconspantext}>About the event</span>
        </div>
        <div className={style.aboutevent} dangerouslySetInnerHTML={{ __html: eventDetail.large_description
          ? eventDetail.large_description.replace(/\n/g, '<br>')
          : eventDetail.description
      }}></div>
      <hr></hr>
    </div>

    <SessionContext.Provider value={{ showSessionModal, setShowSessionModal }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Provider store={store}>
          <div id="A