import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createEvent } from '../../Slice/CreateEvent/CreateEvent';
import ModalMP from '../Modal/ModalMP/ModalMP';
import style from './CheckoutCard.module.css'

function CheckOut({errors, isLogged, input, setShowSessionModal, selectedPack}) {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);

    const handlePay= (e) => {
        if (isLogged) {
          setShowModal(true)
        }
    }

    const handleclick = (e) => {
        e.preventDefault();
        if (isLogged) {
          dispatch(createEvent(input))
          alert("Event created!")
        } else {
          alert('Please Log in');
          setShowSessionModal('login');
        };
      };

    return (
    <div className={style.container}>
        {showModal && <ModalMP setShowModal={setShowModal} selectedPack={selectedPack} />}
        <div className={style.card}>
            <div className={style.details}>
                <div className={style.typeof}>
                    <h4>Selected publicity</h4>
                    <p>{selectedPack.title}</p>
                    <h4>Price</h4>
                    <p>{selectedPack.unit_price}</p>
                </div>
                <div className={style.containerButton}>
                    {selectedPack.unit_price !== 'Free' && (
                        <button onClick={handlePay} className='btnprimario' >Pay</button>
                    ) }
                    <button onClick={handleclick} className='btnprimario' disabled={Object.keys(errors).length !== 0} >Create</button>
                </div>
            </div>
        </div>
    </div>
    );
}

export default CheckOut;