import style from './BasicInfo.module.css'

function BasicInfo(){
    return(
        <div className={style.info}>
            <h2 className={style.title}>Title</h2>
            <p className={style.text}>Pick a name for your event and tell guests why they'll love it.</p>
            <input></input>
            <h2 className={style.title}>Short overview</h2>
            <p className={style.text}>Sum up in 140 characters or less why your event is unique, thrilling and worth attending."</p>
            <input className={style.overview}></input>
        </div>
    )
};

export default BasicInfo;