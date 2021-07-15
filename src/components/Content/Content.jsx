import React from 'react'
import style from './Content.module.css'
import Movie from './Movies/Movie'
import {getMovie, getMovieModal, setModal} from '../../Redux/movie-reducer'
import {connect} from 'react-redux'
import Modal from '../Modal/Modal'

class Content extends React.Component {

constructor(props) {
super(props);
this.state = {
  active: false,
  getMovie: true,
  isLoad: false,
}
}

componentDidMount() {
   document.addEventListener('scroll', this.scrollHandler)
   this.getMovie()
}

 componentDidUpdate(prevProps, prevState) {
    if(prevState.getMovie !== this.state.getMovie) {
       if (this.state.getMovie) {
     this.getMovie()
       }
    }
 }

 componentWillUnmount(){
    document.removeEventListener('scroll', this.scrollHandler)
 }

 getMovie () {
               if (this.state.getMovie) {
       this.setState((state) => {
          return {isLoad: true}
          })
         this.props.getMovie(this.props.currentPage, this.props.movie)
            this.setState((state) => {
            return {getMovie: true}
            })
            this.setState((state) => {
             return {isLoad: false}
             })
      }
           }



setActive = (bool) => {
    this.setState({active: bool})
}

scrollHandler = (e) => {
   debugger
   if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && this.props.currentPage < this.props.totalCount && !this.state.isLoad){
      this.setState((state) => { 
         return {getMovie: true}
      })
   }
}

list = () => {
 return (this.props.movie.map(move => {
  return <Movie getMovieModal={this.props.getMovieModal} filmId={move.filmId} active={this.active} setActive={this.setActive} key={move.filmId} name={move.nameRu} rating={move.rating} genres={move.genres} posterUrl={move.posterUrl}/>
}))
}

render() {
   return <div className={style.content}>
<div className={style.container}>
  {this.active ? <Modal {...this.props.modal} setModal={this.props.setModal} active={this.active} setActive={this.setActive}/> : null} 
{
this.list()
}
</div>
   </div>
}
}

const mapStateToProps = (state) => ({
   movie:state.movie.movie,
   modal:state.movie.modal,
   currentPage: state.movie.currentPage,
   totalCount: state.movie.totalCount
})

export default connect(mapStateToProps, {getMovie, getMovieModal, setModal}) (Content)