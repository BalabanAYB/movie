import React from 'react'
import style from './Content.module.css'
import Movie from './Movies/Movie'
import {getMovie, getMovieModal, setFetching, setCurrentPage, setModal} from '../../Redux/movie-reducer'
import {connect} from 'react-redux'
import Modal from '../Modal/Modal'

const Content = (props) => {

   const [movie, setMovie] = React.useState(props.movie)
   const [active, setActive] = React.useState(false)
   const [isLoad, setIsLoad] = React.useState(true)

   React.useEffect(() => {
      if (isLoad) {
       setIsLoad(false)
         props.getMovie(props.currentPage, props.movie)
      }

}, [isLoad, active])

   React.useEffect(() => {
document.addEventListener('scroll', scrollHandler)
return () => document.removeEventListener('scroll', scrollHandler)
}, [props.totalCount])

const scrollHandler = (e) => {
   if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && props.currentPage < props.totalCount){
      setIsLoad(true)
   }
}

let list = props.movie.map(move => {
  return <Movie getMovieModal={props.getMovieModal} filmId={move.filmId} active={active} setActive={setActive} key={move.filmId} name={move.nameRu} rating={move.rating} genres={move.genres} posterUrl={move.posterUrl}/>
})


   return <div className={style.content}>
<div className={style.container}>
   <Modal {...props.modal} setModal={props.setModal} active={active} setActive={setActive}/>
{
list
}
</div>
   </div>
}

const mapStateToProps = (state) => ({
   movie:state.movie.movie,
   modal:state.movie.modal,
   currentPage: state.movie.currentPage,
   fetching: state.movie.fetching,
   totalCount: state.movie.totalCount
})

export default connect(mapStateToProps, {getMovie, getMovieModal, setFetching, setCurrentPage, setModal}) ( Content)