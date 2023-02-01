import React from 'react'
import Style from './Banner.module.css'

const Banner = () => {
  return (
    <div className={Style.ContenedorHero}>
      <div className={Style.ContenedorTex}>
        <h2 className={Style.Text}>
          Welcome to{" "}
          <h1 className={Style.Titulo}>
            EVEN<b>TOO</b>
          </h1>
        </h2>
        <h2 className={Style.Text}>where you are the star.</h2>
      </div>
    </div>
  )
}

export default Banner