import React from 'react'
import style from './Modal.module.css'

const Modal = (props) => {
   return <>
   {props.nameRu 
   ?<div onClick={() => {
      props.setActive(false)
      props.setModal(null) 
   }} 
   className={`${style.modal}
    ${props.active ? style.active : ''}`}>
<div onClick={e => e.stopPropagation()} className={style.modalContent}>
<div className={style.movieInfo}>
<img src={props.posterUrlPreview} className={style.img}/>
<div className={style.info}>
   <h2>{props.nameRu}</h2>
   <div><i>{props.slogan}</i></div>
   <div> <span>Жанр : </span>{props.genres ? props.genres.map(genre => genre.genre).join(): ''}</div>
   <div><span>Год : </span>{props.year}</div>
</div>
</div>
<div className={style.description}>
{props.description}
</div>
</div>
   </div>
:<div onClick={() => {
   props.setActive(false)
   }} 
   className={`${style.modal}
   ${props.active ? style.active : ''}`}>
   <div onClick={e => e.stopPropagation()} className={style.modalContent}>
      <div className={style.movieInfoNone}>
      <div className={style.imgNone} ></div>
         <div className={style.infoNone}>
         <h2></h2>
         <div className={style.sloganNone}></div>
         <div></div>
         <div className={style.yearNone}></div>
      </div>
      </div>
      <div className={style.descriptionNone}>
      </div>
   </div>
</div>
}
   </>
}

export default Modal