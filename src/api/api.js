import axios from 'axios'

const API_KEY = "128d4a2b-b5a5-48b6-beeb-bdfb70407d2c"


export const movieAPI = {
   getMovie(currentPage) {
      return axios.get(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${currentPage}`, {
         headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
         }
      }) 
   },

   getMovieModal(filmId) {
      return axios.get(`https://kinopoiskapiunofficial.tech/api/v2.1/films/${filmId}`, {
         headers: {
            "Content-Type": "application/json",
            "X-API-KEY": API_KEY,
         }
      }) 
   }
   }