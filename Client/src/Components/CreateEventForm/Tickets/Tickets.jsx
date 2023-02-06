import React, {useState} from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateGuestsCapacity, updateIsPaid, updateIsPublic } from '../../../Slice/CreateEvent/CreateEvent';
import style  from './Tickets.module.css'



function Tickets() {
  const dispatch = useDispatch();
  const [isPublic, setIsPublic] = useState(null);
  const [isPaid, setIsPaid] = useState(null);
  const [capacity, setCapacity] = useState('');

  useEffect(() => {
    
  }, [isPublic]);

  const handleClick = e => {
    e.preventDefault();
    setIsPublic(true);
    dispatch(updateIsPublic(true));
    console.log('public', isPublic);
  }

  const handle2Click = e => {
    e.preventDefault();
    setIsPublic(false);
    dispatch(updateIsPublic(false));
    console.log('public', isPublic);
  }

  const handlePaid = e => {
    e.preventDefault();
    setIsPaid(true);
    dispatch(updateIsPaid(true));
  }

  const handle2Paid = e => {
    e.preventDefault();
    setIsPaid(false);
    dispatch(updateIsPaid(false));
  }


  const handleChange = e =>{
    e.preventDefault();
    setCapacity(e.target.value);
    dispatch(updateGuestsCapacity(e.target.value));
  }

  return (
    <div className={style.container}>
        <h1 className={style.title}>Tickets</h1>
        <p className={style.text}>Please choose if the event will be public or private.</p>
        <div className={style.options}>
            <button
            style={isPublic === true?  { opacity: 1}: { opacity: 0.5 }}
            onClick={handleClick}
            value={true}
            className={style.btn}
            >
            Public
            </button>
            <button
            style={ isPublic === false? { opacity: 1}: { opacity: 0.5 }}
            onClick={handle2Click}
            value={false}
            className={style.btn}
            >
            Private
            </button>
        </div>
        <p className={style.text}>Choose if you wanna pay an extra for more guests or publicity</p>
        <div className={style.options}>
            <button
            style={isPaid === true?  { opacity: 1}: { opacity: 0.5 }}
            onClick={handlePaid}
            value='true'
            className={style.btn}
            >
            Paid
            </button>
            <button
            style={ isPaid === false? { opacity: 1}: { opacity: 0.5 }}
            onClick={handle2Paid}
            value='false'
            className={style.btn}
            >
            Free
            </button>
        </div>
        <h4 className={style.parr}>Capacity:</h4>
        <input onChange={handleChange}></input>
        <h4 className={style.parr}>Price:</h4>
        <input></input>
    </div>
  )
}

export default Tickets;