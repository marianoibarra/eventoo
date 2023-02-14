import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store";


export const SessionContext = createContext()

const root = ReactDOM.createRoot(document.getElementById("root"));


const Index = () => {

  const [showSessionModal, setShowSessionModal] = useState(null);

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
