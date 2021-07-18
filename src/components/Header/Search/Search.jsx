import React from "react";
import style from "./Search.module.css";
import { connect } from "react-redux";
import { search } from "../../../Redux/movie-reducer";

const Search = (props) => {
  const searchMovie = (e) => {
    props.search(e.target.value);
  };

  return (
    <form className={style.search}>
      <input onChange={searchMovie} type="text" placeholder="Поиск..." />
    </form>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { search })(Search);
