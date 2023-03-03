import React from "react";
import Footer from "../Components/Footer/Footer";
import ComponentAboutUs from "../Components/Footer/ComponentAboutUs/ComponentAboutUs";

import NavBar from '../Components/NavBar/NavBar'

function AboutUs() {
  return (
    <div>
      <NavBar />
      <ComponentAboutUs />
      <Footer />
    </div>
  );
}

export default AboutUs;
