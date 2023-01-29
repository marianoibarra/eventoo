import React from "react";
import Footer from "../Components/Footer/Footer";
import NavBar from '../Components/NavBar/NavBar';
import SettingForm from '../Components/settingForm';
export default function Setting() {
  return (
    <div>
      <NavBar />

      <SettingForm />

      <Footer />
    </div>
  );
}