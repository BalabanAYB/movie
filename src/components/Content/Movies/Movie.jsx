import React from 'react'
import style from './Movie.module.css'

const Movie = (props) => {

   const [colorRating, setColorRating] = React.useState()

   React.useEffect(() => {
if (props.rating <= 5) {
   setColorRating('red')
}
else if (props.rating > 5 && props.rating < 7) {
   setColorRating('orange')
}
else {
   setColorRating('green')
}
   },[props.rating] )

const activate = () => {
   props.setActive(true)
   props.getMovieModal(props.filmId)
}

   return <div className={style.movie}>
<div  className={style.coverInner}>
<img className={style.movieCover} src={props.posterUrl} />
<div onClick={activate} className={style.coverDarkened}></div>
</div>
<div className={style.info}>
   <div className={style.title}> {props.name}</div>
   <div className={style.category}>{props.genres.map(genre => genre.genre).join()}</div>
<div style={{borderColor: colorRating}} className={style.average}>{props.rating}</div>
</div>
   </div>
}

export default Movie