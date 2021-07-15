import {movieAPI} from '../api/api'
const SET_MOVIE = 'SET_MOVIE'
const SET_MODAL = 'SET_MODAL'
const SET_FETCHING = 'SET_FETCHING'
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE'
const SET_PAGES_COUNT = 'SET_PAGES_COUNT'

export const setMovie = (movie) => ({ type: SET_MOVIE, movie })
export const setModal = (modal) => ({ type: SET_MODAL, modal })
export const setFetching = (fetch) => ({ type: SET_FETCHING, fetch })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setPageCount = (count) => ({ type: SET_PAGES_COUNT, count })

export const getMovie = (currentPage, movie) => async (dispatch) => {
   if (movie.length <= (20 * currentPage)){
   let data = await movieAPI.getMovie(currentPage)
   dispatch(setMovie(data.data.films))
   dispatch(setCurrentPage(currentPage + 1))
   dispatch(setPageCount(data.data.pagesCount))
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
            movie: [...new Set([...state.movie, ...action.movie])]
            
         }
      }
      case SET_MODAL: {
         return {
            ...state,
            modal: action.modal
         }
      }
      case SET_FETCHING: {
         return {
            ...state,
            fetching: action.fetch 
         }
      }
      case SET_PAGES_COUNT: {
         return {
            ...state,
            totalCount: action.count 
         }
      }
      case SET_CURRENT_PAGE: {
         return {
            ...state,
            currentPage: action.currentPage
         }
      }
      default:
         return state;
   }
}

export default movieReducer