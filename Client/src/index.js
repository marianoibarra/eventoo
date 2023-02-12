import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store";
import axios from "axios";

export const SessionContext = createContext()

const root = ReactDOM.createRoot(document.getElementById("root"));

const Index = () => {

  const [showSessionModal, setShowSessionModal] = useState(null);

  window.handleGoogleLogin = function ({ credential }) {
    axios
      .post("https://api.eventoo.com.ar/user/auth", { credential })
      .then((response) => {
        const data = { ...response.data.data, id: response.data.id };
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("data", JSON.stringify(data));
        if(!data.newAccount) setShowSessionModal(null);
        console.log(data)
      })
      .catch((err) => console.log(err));
  };

  return (
    <SessionContext.Provider value={{ showSessionModal, setShowSessionModal }}>
      <Provider store={store}>
        <App />
      </Provider>
    </SessionContext.Provider>
  );
};

root.render(<Index/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
