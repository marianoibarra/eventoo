import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { updateGuestsCapacity, updateIsPaid, updateIsPublic } from '../../../Slice/CreateEvent/CreateEvent';
import style  from './Tickets'



function Tickets() {
  const dispatch = useDispatch();
  const [isPublic, setIsPublic] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [capacity, setCapacity] = useState('');

  const handleClick = e => {
    e.preventDefault();
    setIsPublic(e.target.value);
    dispatch(updateIsPublic(e.target.value));
  }

  const handlePaid = e => {
    e.preventDefault();
    setIsPaid(e.target.value);
    dispatch(updateIsPaid(e.target.value));
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
            style={isPublic ?  { backgroundColor: 'ligthblue'}: { backgroundColor: "lightgray" }}
            onClick={handleClick}
            value='true'
            >
            Public
            </button>
            <button
            style={ !isPublic ? { backgroundColor: "lightblue" } : { backgroundColor: "lightgray" }}
            onClick={handleClick}
            value='false'
            >
            Private
            </button>
        </div>
        <p className={style.text}>Choose fi you wanna pay an extra for more guests or publicity</p>
        <div className={style.options}>
            <button
            style={isPaid ?  { backgroundColor: 'ligthblue'}: { backgroundColor: "lightgray" }}
            onClick={handlePaid}
            value='true'
            >
            Paid
            </button>
            <button
            style={ !isPaid ? { backgroundColor: "lightblue" } : { backgroundColor: "lightgray" }}
            onClick={handlePaid}
            value='false'
            >
            Free
            </button>
        </div>
        <p>Capacity:</p>
        <input onChange={handleChange}></input>
        <p>Price:</p>
        <input></input>
    </div>
  )
}

export default Tickets;