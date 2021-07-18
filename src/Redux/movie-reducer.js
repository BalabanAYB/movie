import { movieAPI } from "../api/api";

const SET_MOVIE = "SET_MOVIE";
const SET_MODAL = "SET_MODAL";
const SET_CURRENTPAGE = "SET_CURRENTPAGE";
const SEARCH = "SEARCH";
const SEARCH_ERROR = "SEARCH_ERROR";

export const setMovie = (movie, count, clb) => ({
  type: SET_MOVIE,
  movie,
  count,
  clb,
});
export const setModal = (modal, trailers) => ({
  type: SET_MODAL,
  modal,
  trailers,
});
export const searchMovie = (movie) => ({ type: SEARCH, movie });
export const searchError = (text) => ({ type: SEARCH_ERROR, text });
export const setCurrentPage = () => ({ type: SET_CURRENTPAGE });

export const getMovie = (currentPage, movie, clb) => async (dispatch) => {
  if (movie.length <= 20 * currentPage) {
    let response = await movieAPI.getMovie(currentPage);
    dispatch(setMovie(response.data.films, response.data.pagesCount, clb));
  }
};

export const search = (text) => async (dispatch) => {
  let response = await movieAPI.SearchFilms(text);
  if (!response.data.films.length) {
    dispatch(searchError(response.data.keyword));
    dispatch(searchMovie(response.data.films));
  } else {
    dispatch(searchMovie(response.data.films));
    console.log(response.data.films);
  }
};

export const getMovieModal = (filmId) => async (dispatch) => {
  let resp = await movieAPI.getTrailer(filmId);
  let data = await movieAPI.getMovieModal(filmId);
  dispatch(setModal(null));
  dispatch(setModal(data.data.data, resp.data.trailers));
};

let initialState = {
  movie: [],
  trailers: null,
  search: false,
  modal: null,
  totalCount: null,
  currentPage: 1,
  searchError: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MOVIE: {
      action.clb && action.clb();
      return {
        ...state,
        movie: [...new Set([...state.movie, ...action.movie])],
        totalCount: action.count,
        currentPage: state.currentPage + 1,
      };
    }
    case SEARCH: {
      return {
        ...state,
        movie: [...action.movie],
        search: action.movie.length ? true : false,
      };
    }
    case SEARCH_ERROR: {
      return {
        ...state,
        movie: [],
        searchError: action.text,
      };
    }
    case SET_CURRENTPAGE: {
      return {
        ...state,
        currentPage: 1,
      };
    }
    case SET_MODAL: {
      return {
        ...state,
        modal: action.modal,
        trailers: [
          ...(action.trailers
            ? action.trailers
                .map((trailer) => trailer.url)
                .filter(
                  (trailer) =>
                    trailer.includes("https://www.youtube.com/watch?v=") ||
                    trailer.includes("https://youtu.be/")
                )
                .map((trailer) => {
                  if (trailer.includes("https://www.youtube.com/watch?v=")) {
                    return trailer.replace(
                      "https://www.youtube.com/watch?v=",
                      "https://www.youtube.com/embed/"
                    );
                  } else {
                    return trailer.replace(
                      "https://youtu.be/",
                      "https://www.youtube.com/embed/"
                    );
                  }
                })
            : []),
        ],
      };
    }
    default:
      return state;
  }
};

export default movieReducer;
