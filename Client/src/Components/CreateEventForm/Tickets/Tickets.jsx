import React, {useState} from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ModalBank from '../../Modal/ModalBank/ModalBank';
import ButtonGroup from '../Category/ButtonGroup';
import style  from './Tickets.module.css'



function Tickets({input,setInput,errors, showMsg, setShowMsg}) {
  const dispatch = useDispatch();
  const [isPublic, setIsPublic] = useState(true);
  const [isPaid, setIsPaid] = useState(true);
  const[showModal, setShowModal] = useState(false);

  useEffect(() => {
    
  }, [isPublic]);

  const handleBlur = (e) =>{
    setShowMsg({
        ...showMsg,
        [e.target.name]: true,
    })
  }

  const handleChange = e =>{
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value
  })
  }

  const handleGroupPrice = (e) => {
    setInput({
      ...input,
      isPaid: e.target.name === 'Paid',
    });
  };

  const handleGroupPublic = (e) => {
    setInput({
      ...input,
      isPublic: e.target.name === 'Public',
    });
  };

  return (
    <div className={style.container}>
       { showModal &&  <ModalBank setShowModal={setShowModal} input={input} setInput={setInput}/>}
        <h1 className={style.title}>Tickets</h1>
        <p className={style.text}>
          Please choose if the event will be public or private.
        </p>
        <ButtonGroup
          buttons={["Public", "Private"]}
          handleGroup={handleGroupPublic}
        />
        {showMsg.isPublic&&(
                            <p className={style.warning}>{errors.isPublic}</p>
                        )}
        <p className={style.text}>
          Choose if your guests will pay for asist to the event.
        </p>
        <ButtonGroup
          buttons={["Paid", "Free"]}
          handleGroup={handleGroupPrice}
        />
        <h4 className={style.parr}>Capacity:</h4>
        <input
        placeholder='Capacity'
        className={style.inputs}
        name ='guests_capacity'
        value={input.guests_capacity}
        onChange={handleChange}
        onBlur={handleBlur}
        style={ showMsg.guests_capacity && errors.guests_capacity ? {border:'red 1px solid'}: {}}/>
        {showMsg.guests_capacity&&(
                            <p className={style.warning}>{errors.guests_capacity}</p>
                        )}
        {input.isPaid === true  && (
        <div>
          <h4 className={style.parr}>Price:</h4>
          <input
          placeholder='Price'
          className={style.inputs}
          name ='price'
          value={input.price}
          onChange={handleChange}
          onBlur={handleBlur}
          style={ showMsg.price && errors.price ? {border:'red 1px solid'}: {}}/>
        {showMsg.price&&(
                            <p className={style.warning}>{errors.price}</p>
                        )}
                        <button type='button' className={style.btnprimario} onClick={() => setShowModal(!showModal)}>Bank Account</button>
        </div>
      )}
       
                       
    </div>
  )
}

export default Tickets;