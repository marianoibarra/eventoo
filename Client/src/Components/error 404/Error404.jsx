import React from "react";
import Styles from "./error404.module.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Error404() {
  const { ref, inView } = useInView();
  const animation = useAnimation();

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        x: 0,
        transition: {
          duration: 1,
        },
      });
    }
    if (!inView) {
      animation.start({
        opacity: 0,
        x: 300,
        transition: {
          duration: 1,
        },
      });
    }
  }, [inView]);

  return (
    <div>
      <div className={Styles.Contenedor}>
        <div className={Styles.ContenedorDestacado}>
          <div className={Styles.ContenedorDetalles}>
            <motion.div
              className={Styles.ContenedorInfo}
              ref={ref}
              initial={{
                opacity: 0,
                x: 500,
              }}
              animate={animation}
            >
              <h3>Error 404 Page not found</h3>
              <p>
                Page not found. Sorry, it seems we can't find the page you're
                looking for. Please try going back to the previous page, or
                visit our Help Center for more information.
              </p>
              <div>
                <Link to="/" className={`btnprimario`}>
                  <span>HOME</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Error404;
