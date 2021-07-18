import React from "react";
import style from "./Content.module.css";
import Movie from "./Movies/Movie";
import {
  getMovie,
  getMovieModal,
  setModal,
  setCurrentPage,
} from "../../Redux/movie-reducer";
import { connect } from "react-redux";
import Modal from "../Modal/Modal";
import Preloader from "../Preloader/Preloader";

class Content extends React.Component {
  state = {
    active: false,
    getMovie: true,
    isLoad: true,
  };

  componentDidMount() {
    document.addEventListener("scroll", this.scrollHandler);
    this.getMovie();
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.scrollHandler);
  }

  componentDidUpdate(prevProps) {
    if (
      (prevProps.search && !this.props.search) ||
      (prevProps.searchError && !this.props.searchError)
    ) {
      this.props.setCurrentPage();
      this.setState({ getMovie: true, isLoad: true }, () => {
        this.getMovie();
      });
    }
  }

  getMovie() {
    if (this.state.isLoad && this.state.getMovie) {
      this.setState({ isLoad: true });
      this.props.getMovie(this.props.currentPage, this.props.movie, () => {
        this.setState({ getMovie: false, isLoad: false });
      });
    }
  }

  setActive = (bool) => {
    this.setState({ active: bool });
  };

  scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        200 &&
      this.props.currentPage < this.props.totalCount &&
      !this.state.isLoad &&
      !this.state.getMovie &&
      !this.props.search
    ) {
      this.setState({ getMovie: true, isLoad: true }, () => {
        this.getMovie();
      });
    }
  };

  list = () => {
    return this.props.movie.map((move) => {
      return (
        <Movie
          getMovieModal={this.props.getMovieModal}
          filmId={move.filmId}
          active={this.active}
          setActive={this.setActive}
          key={move.filmId}
          name={move.nameRu}
          rating={move.rating}
          genres={move.genres}
          posterUrl={move.posterUrl}
        />
      );
    });
  };
  render() {
    return (
      <div className={style.content}>
        <div className={style.container}>
          {this.state.active && (
            <Modal
              {...this.props.modal}
              trailers={this.props.trailers}
              setModal={this.props.setModal}
              active={this.state.active}
              setActive={this.setActive}
            />
          )}
          {this.list()}
        </div>
        {this.props.getMovie &&
          !this.props.searchError &&
          !this.props.search &&
          this.props.totalCount !== this.props.currentPage && <Preloader />}
        {this.props.searchError && (
          <div className={style.error}>
            фильмы "{this.props.searchError}" не найдены
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movie: state.movie.movie,
  search: state.movie.search,
  searchError: state.movie.searchError,
  modal: state.movie.modal,
  trailers: state.movie.trailers,
  totalCount: state.movie.totalCount,
  currentPage: state.movie.currentPage,
});

export default connect(mapStateToProps, {
  getMovie,
  getMovieModal,
  setModal,
  setCurrentPage,
})(Content);
