import React, { useEffect, useState } from 'react';



const Mp1 = () => {

  const FORM_ID = 'payment-form';
  
  const [preferenceId, setPreferenceId] = useState('1313548982-7b9acbc1-6fc7-4753-9389-ba311ea045b0')

  function addCheckout() {
    const mp = new window.MercadoPago('APP_USR-78c8ed61-282c-4022-a30b-8463bffaaec4', {
      locale: 'es-AR'
    });
  
    mp.checkout({
      preference: {
        id: preferenceId,
      },
      // render: {
      //   container: `#${FORM_ID}`, 
      //   label: 'Create event', 
      // },
      autoOpen: true
    });
  }

  useEffect(() => {
    if (preferenceId) {
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://sdk.mercadopago.com/js/v2';
      script.addEventListener('load', addCheckout); // Cuando cargue el script, se ejecutará la función addCheckout
      document.body.appendChild(script);
    }
  }, [preferenceId]);


  return (
    <div id={FORM_ID}  />
  );
}


export default Mp1



