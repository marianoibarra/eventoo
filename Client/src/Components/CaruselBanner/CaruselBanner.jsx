import React from 'react'
import CaruselAll from './CaruselAll/CaruselAll'
import Style from './CaruselBanner.module.css'
import CategoriesFilter from './CategoriesFilter/CategoriesFilter'
import FilterMode from './FilterMode/FilterMode'
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';


const CaruselBanner = () => {
    return (
        <div>
            
            <div className={Style.container_carusel} >
                 <div className={Style.carusel_text}>
                    <p>
                    Discover the top events or plan your own<br></br> all in a single portal.
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
            <CategoriesFilter />
            <FilterMode />
            <CaruselAll />
            
        </div>
    )
}

export default CaruselBanner