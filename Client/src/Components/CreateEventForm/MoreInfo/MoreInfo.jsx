import style from './MoreInfo.module.css'

function MoreInfo(){
    return(
        <div className={style.info}>
            <h2 className={style.title}>More information</h2>
            <p className={style.text}>Next, you'll have the chance to add detailed content about your event, including text, images, and videos. Use this section to highlight the unique features of your event and provide valuable information to potential attendees.</p>
            <input className={style.more}></input>
        </div>
    )
};

export default MoreInfo;