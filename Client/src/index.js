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

  axios.post('https://api.eventoo.com.ar/user/auth', {credential})
    .then(response => {
      const data = {...response.data.data,id:response.data.id} 
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('data', JSON.stringify(data))
      window.location.href = `${window.location.href}`
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

