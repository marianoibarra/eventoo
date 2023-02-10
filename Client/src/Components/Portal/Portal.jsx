import { useEffect } from "react";
import { createPortal } from "react-dom";

const portal = document.getElementById('portal')

const Portal = ({children}) => {
    const div = document.createElement('div')
    
    useEffect(() => {
        portal.appendChild(div)

        return () => {
            portal.removeChild(div)
        }
    })

    return createPortal(children, div)
}

export default Portal