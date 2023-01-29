import React from 'react'
import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from "react-intersection-observer";
import Style from './Cards.module.css';


const EventContainer = ({ details }) => {
  const { ref, inView } = useInView();
  const animation = useAnimation();

  useEffect(() => {

    if (inView) {
      animation.start({
        opacity: 1,
        x: 0,
        transition: {
          duration: 1
        }
      })
    }
    if (!inView) {
      animation.start({
        opacity: 0,
        x: 300,
        transition: {
          duration: 1
        }
      })
    }

  }, [inView])

  if (Object.entries(details).length === 0) {
    return null;
  }

  return (
    <motion.div
      className={Style.ContenedorInfo}
      ref={ref}
      initial={{
        opacity: 0,
        x: 500,
      }}
      animate={animation}
    >
      <h3>{details.explore}</h3>
      <p>{details.descripcion2}</p>
      <div>
        <a className={`btnprimario`} href='/event'>
          <span>LET'S GO!</span>
        </a>
      </div>
    </motion.div>
  );
}

export default EventContainer