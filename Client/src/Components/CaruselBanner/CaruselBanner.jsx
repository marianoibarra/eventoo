import React from 'react'
import CaruselAll from './CaruselAll/CaruselAll'
import Style from './CaruselBanner.module.css'
import FilterMode from './FilterMode/FilterMode'


const CaruselBanner = () => {
    return (
        <div>
            <FilterMode />
            <div className={Style.container_carusel} >
                 <div className={Style.carusel_text}>
                    <p>
                        Hola este es un mensaje de prueba del carusel ONE
                    </p>
                </div>

                <div className={Style.carusel_one}>
                    <div className={Style.carusel_one_image}>

                    </div>
                </div>

                <div className={Style.carusel_two}>
                    <div className={Style.carusel_two_image}>

                    </div>
                </div>

                <div className={Style.carusel_three}>
                    <div className={Style.carusel_three_image}>

                    </div>
                </div>

                <div className={Style.carusel_four}>
                    <div className={Style.carusel_four_image}>

                    </div>
                </div>
            </div>
            <CaruselAll />
        </div>
    )
}

export default CaruselBanner