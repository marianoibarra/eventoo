import style from './BasicInfo.module.css'

function BasicInfo({input, setInput, errors, setShowMsg, showMsg}) {

    const handleChanges = (e) => {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        })
      }

    const handleBlur = (e) =>{
        setShowMsg({
            ...showMsg,
            [e.target.name]: true,
        })
    }

    return(
        <div className={style.info}>
            <h2 className={style.title}>Title</h2>
            <p className={style.text}>Pick a name for your event and tell guests why they'll love it.</p>
            <input className={style.inputs} type="text"  name='name' onChange={handleChanges} value={input.name} />

            <h2 className={style.title}>Short overview</h2>
            <p className={style.text}>Sum up in 140 characters or less why your event is unique, thrilling and worth attending."</p>
            <textarea style={{resize: 'none'}} className={style.description} type="text" name='description'
            onChange={handleChanges} rows='10' cols='75' value={input.description}></textarea>
        </div>
    )
};
export default BasicInfo;