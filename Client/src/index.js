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
      setStoredValue(valueToStore);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}


const Index = () => {

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [showSessionModal, setShowSessionModal] = useState(null);
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'light' : 'light');

  return (
    <SessionContext.Provider value={{ showSessionModal, setShowSessionModal }}>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Provider store={store}>
          <div id="App" data-theme={theme}>
            <App />
          </div>
        </Provider>
      </ThemeContext.Provider>
    </SessionContext.Provider>
  );
};

root.render(<Index/>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
