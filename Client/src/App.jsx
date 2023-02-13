import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import { BrowserRouter } from 'react-router-dom';
//pages
import CreateEvent from "./Pages/CreateEvent";
import Landing from "./Pages/Landing";
import Setting from "./Pages/Setting";
import FAQ from "./Pages/FAQ";
import AboutUs from "./Pages/AboutUs";
import Help from "./Pages/Help";
import Contact from "./Pages/Contact";
import Error from "./Pages/Error";
import Home from "./Pages/Home";
import Event from "./Pages/Event";
import CreateUser from "./Pages/CreateUser";
import Login from "./Pages/Login";
import UserEvent from "./Pages/UserEvents";
import ForgotPassword from "./Pages/ForgotPassword";

//libraries
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import RecoverPass from "./Pages/RecoverPass";
import { fetchLocation } from "./Slice/Location/LocationSlice";
import { getLocationFromIP } from "./Slice/Location/locationIpSlice";
import SessionModal from "./Components/Modal/ModalSession/ModalSessionContainer";
import { SessionContext } from ".";
import { getUserData, googleLogin} from "./Slice/User/UserSlice";
import ModalVoucher from "./Components/ModalVoucher/ModalVoucher";
import Cart from "./Pages/UserEvents";
import { getBankAccounts } from "./Slice/BankAcount/BankAcount";
import NewHome from "./Pages/NewHome";

export const API = axios.create({
  baseURL: 'https://api.eventoo.com.ar',
  headers: {
    common: {
      'authorization': 'Bearer ' + localStorage.getItem("token"),
    }
  }
});

function App() {
  
  const { showSessionModal, setShowSessionModal } = useContext(SessionContext)
  const dispatch = useDispatch();

  window.handleGoogleLogin = function ({ credential }) {
    dispatch(googleLogin({credential, setShowSessionModal }))
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(getUserData());
      dispatch(getBankAccounts());
    }
  }, []);

  const { isLogged } = useSelector((state) => state.user);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const positions = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        dispatch(fetchLocation(positions));
      },
      (error) => {
        console.error(error);
      }
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getLocationFromIP());
  }, [dispatch]);



  return (

    <BrowserRouter>
      {showSessionModal !== null && <SessionModal />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/setting" element={!isLogged ? <Navigate to='/'/> : <Setting />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/newhome" element={<NewHome />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<Home />}></Route>
        <Route path="/create-user" element={isLogged ? <Navigate to='/'/> : <CreateUser />}></Route>
        <Route path="/login" element={isLogged ? <Navigate to='/'/> : <Login />}></Route>
        <Route path="/event/:id" element={<Event />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/modal-voucher/:id" element={<ModalVoucher />}></Route>
        <Route path="/user-event" element={<UserEvent />}></Route>
        <Route path="/forgot-password" element={isLogged ? <Navigate to='/'/> : <ForgotPassword />}></Route>
        <Route path="/reset-password/:emailtoken" element={isLogged ? <Navigate to='/'/> : <RecoverPass />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;
