import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import store from './Store';
import axios from 'axios';



const root = ReactDOM.createRoot(document.getElementById('root'));

window.handleGoogleLogin = function({credential}) {

  axios.post('http://api.eventoo.online/user/auth', {credential})
    .then(response => {
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('data', JSON.stringify(response.data.data))
      window.location.href = 'http://localhost:3000/home'
    })
    .catch(err => console.log(err))
}

root.render(
  <Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

