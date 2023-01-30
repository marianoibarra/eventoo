import React from 'react'
import CaruselBanner from '../Components/CaruselBanner/CaruselBanner'
import Footer from '../Components/Footer/Footer'
import Navbar from '../Components/NavBar/NavBar'

function Home() {
  return (
    <div>
      <Navbar/>
      <CaruselBanner />
      <Footer/>
    </div>
  )
}

export default Home
