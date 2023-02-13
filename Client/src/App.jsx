import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
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
import { setUser } from "./Slice/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import RecoverPass from "./Pages/RecoverPass";
import { fetchLocation } from "./Slice/Location/LocationSlice";
import { getLocationFromIP } from "./Slice/Location/locationIpSlice";
import ModalVoucher from "./Components/ModalVoucher/ModalVoucher";

function App() {
  
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const data = localStorage.getItem("data");
    if (data) {
      const object = JSON.parse(data);
      dispatch(setUser(object));
    }
    axios.defaults.headers.common["authorization"] = "Bearer " + token;
  }, []);

  const { loginOk } = useSelector((state) => state.user);

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
    <div>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/setting" element={!loginOk ? <Navigate to='/'/> : <Setting />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/Help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/home" element={<Home />}></Route>
        <Route path="/create-user" element={loginOk ? <Navigate to='/'/> : <CreateUser />}></Route>
        <Route path="/login" element={loginOk ? <Navigate to='/'/> : <Login />}></Route>
        <Route path="/event/:id" element={<Event />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/modal-voucher" element={<ModalVoucher />}></Route>
        <Route path="/user-event" element={<UserEvent />}></Route>
        <Route path="/forgot-password" element={loginOk ? <Navigate to='/'/> : <ForgotPassword />}></Route>
        <Route path="/reset-password/:emailtoken" element={loginOk ? <Navigate to='/'/> : <RecoverPass />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
