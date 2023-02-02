import style from './DateTime.module.css'

function DateTime(){
    return(
        <div className={style.info}>
            <h2 className={style.title}>Date and Time</h2>
            <p className={style.text}>Please choose the date and time that your event will take place. It's important to select the correct hour to ensure that your guests arrive on time.</p>
            <h4 className={style.title}>Start Date</h4>
            <input type='date' format='aaaa-mm-dd'></input>
            <h4 className={style.title}>End date</h4>
            <input type='date' format='aaaa-mm-dd'></input>
            <h4 className={style.title}>Start time</h4>
            <input type='time'></input>
            <h4 className={style.title}>End time</h4>
            <input type='time'></input>
        </div>
    )
};

export default DateTime;