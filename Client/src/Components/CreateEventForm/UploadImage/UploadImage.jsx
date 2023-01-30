import style from './UploadImage.module.css'

function Image() {
    return (
      <div>
      
        <h2 className={style.image}> Main image</h2>
        <p>The picture you'll select it's the first impresion of your event</p>
        {/* <div className={style.container_image}>  <div className={style.picture}></div></div> */}
        <p>Upload or Drag and Drop you image Here</p>
      </div>
  );
}

export default Image;