import React from "react";
import style from "./Preloader.module.css";

const Preloader = () => {
  return (
    <div className={style.loader}>
      <div className={style.loaderInner}>
        <div className={style.loaderLineWrap}>
          <div className={style.loaderLine}></div>
        </div>
        <div className={style.loaderLineWrap}>
          <div className={style.loaderLine}></div>
        </div>
        <div className={style.loaderLineWrap}>
          <div className={style.loaderLine}></div>
        </div>
        <div className={style.loaderLineWrap}>
          <div className={style.loaderLine}></div>
        </div>
        <div className={style.loaderLineWrap}>
          <div className={style.loaderLine}></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
