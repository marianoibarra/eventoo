import React, {useState} from 'react';
import style  from './Tickets'



function Tickets() {
    const [isPublic, setIsPublic] = useState(false);
    const [isPaid, setIsPaid] = useState(false)

  return (
    <div className={style.container}>
        <h1 className={style.title}>Tickets</h1>
        <p className={style.text}>Please choose if the event will be public or private.</p>
        <div className={style.options}>
            <button
            style={isPublic ?  { backgroundColor: 'ligthblue'}: { backgroundColor: "lightgray" }}
            onClick={() => setIsPublic(true)}
            >
            Public
            </button>
            <button
            style={ !isPublic ? { backgroundColor: "lightblue" } : { backgroundColor: "lightgray" }}
            onClick={() => setIsPublic(false)}
            >
            Private
            </button>
            <p>Public: {isPublic.toString()}</p>
        </div>
        <p className={style.text}>Choose fi you wanna pay an extra for more guests or publicity</p>
        <div className={style.options}>
            <button
            style={isPaid ?  { backgroundColor: 'ligthblue'}: { backgroundColor: "lightgray" }}
            onClick={() => setIsPaid(true)}
            >
            Paid
            </button>
            <button
            style={ !isPaid ? { backgroundColor: "lightblue" } : { backgroundColor: "lightgray" }}
            onClick={() => setIsPaid(false)}
            >
            Free
            </button>
            <p>It's Paid: {isPaid.toString()}</p>
        </div>
        <p>Capacity:</p>
        <input></input>
        <p>Price:</p>
        <input></input>
    </div>
  )
}

export default Tickets;