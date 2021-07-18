import React from "react";
import Preloader from "../Preloader/Preloader";
import style from "./Modal.module.css";

const Modal = (props) => {
  let genre = props.genres
    ? props.genres.map((genre) => genre.genre).join(" ")
    : "";
  const [load, setLoad] = React.useState(true);

  React.useEffect(() => {
    if (props.filmId && props.trailers) {
      setLoad(false);
    } else {
      setLoad(true);
    }
  }, [props]);

  return (
    <>
      {load ? (
        <div
          onClick={() => {
            props.setActive(false);
            props.setModal(null);
          }}
          className={`${style.modal}`}
        >
          <Preloader />
        </div>
      ) : (
        <div
          onClick={() => {
            props.setActive(false);
            props.setModal(null);
          }}
          className={`${style.modal}
    ${!load ? style.active : ""}`}
        >
          <div
            onclick={() => {
              props.setActive(false);
              props.setModal(null);
            }}
            className={style.delete}
          >
            X
          </div>
          <div
            onClick={(e) => e.stopPropagation()}
            className={style.modalContent}
          >
            <div className={style.movieInfo}>
              <img src={props.posterUrlPreview} className={style.img} />
              <div className={style.info}>
                <h2>{props.nameRu}</h2>
                <div>
                  <i>{props.slogan}</i>
                </div>
                <div>
                  {" "}
                  <span>Жанр : </span>
                  {genre}
                </div>
                <div>
                  <span>Год : </span>
                  {props.year}
                </div>
              </div>
            </div>
            <div className={style.description}>{props.description}</div>
            <iframe
              src={props.trailers[0]}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              seamless
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};
export default Modal;
