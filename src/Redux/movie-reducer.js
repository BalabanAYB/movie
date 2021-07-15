import {movieAPI} from '../api/api'

const SET_MOVIE = 'SET_MOVIE'
const SET_MODAL = 'SET_MODAL'

export const setMovie = (movie, count) => ({ type: SET_MOVIE, movie, count })
export const setModal = (modal) => ({ type: SET_MODAL, modal })

export const getMovie = (currentPage, movie) => async (dispatch) => {
   if (movie.length <= (20 * currentPage)){
   let response = await movieAPI.getMovie(currentPage)
   dispatch(setMovie(response.data.films, response.data.pagesCoun))
   /*dispatch(setCurrentPage(currentPage + 1))
   dispatch(setPageCount(data.data.pagesCount))*/
   }
}

export const getMovieModal = (filmId) => async (dispatch) => {
   let data = await movieAPI.getMovieModal(filmId)
   dispatch(setModal(null))
   dispatch(setModal(data.data.data))
  
}



let initialState = {
   movie: [],
   modal: null,
   totalCount: null,
   currentPage: 1,
}

const movieReducer = (state = initialState, action) => {
   switch (action.type) {
      case SET_MOVIE: {
         return {
            ...state,
            movie: [...new Set([...state.movie, ...action.movie])],
            totalCount: action.count,
            currentPage: state.currentPage + 1
         }
      }
      case SET_MODAL: {
         return {
            ...state,
            modal: action.modal
         }
      }
      default:
         return state;
   }
}

export default movieReducer