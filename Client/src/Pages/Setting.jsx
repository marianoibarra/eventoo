import React from "react";
import Footer from "../Components/Footer/Footer";
import NavBar from '../Components/NavBar/NavBar';
import SettingForm from '../Components/settingForm/SettingForm';
export default function Setting() {
  return (
    <div>
      <NavBar />

      <SettingForm />
      {//click en un boton ? <User/> click en otro boton?  <Events/> click en otro boton <Cuenta bancaria /> : <User/>, 
      }

      <Footer />
    </div>
  );
}