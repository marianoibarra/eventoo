import style from './CreateEventForm.module.css'
import Lateral from './Lateral/Lateral';
import Image from './UploadImage/UploadImage';
import BasicInfo from './Basic Information/BasicInfo'
import MoreInfo from './MoreInfo/MoreInfo';
import Category from './Category/Category';
import DateTime from './Date&Time/DateTime';
import Tickets from './Tickets/Tickets';

function Form(){
    return(
    <div className={style.container}>
        <Lateral/>
        <div className={style.form}>
          <h1 className={style.title}>EVENT INFORMATION</h1>
          <Image/>
          <div className={style.split}></div>
          <BasicInfo/>
          <div className={style.split}></div>
          <MoreInfo/>
          {/* <div className={style.contain_button}>
            <button>Add</button>
          </div> */}
          <div className={style.split}></div>
          <h1 className={style.title}>LOCATION AND DATE</h1>
          <Category/>
          <div className={style.split}></div>
          <DateTime/>
          <div className={style.split}></div>
          <Tickets/>
          <div className={style.footerForm}>
            <button className={style.btnprimario}>Cancel</button>
            <button className={style.btnprimario}>Save & Next</button>
          </div>
        </div>
    </div>
  )
};

export default Form;