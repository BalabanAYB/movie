import React from 'react'
import style from './Search.module.css'

const Search = (props) => {
   return <form className={style.search}>
      <input
         type="text"
         placeholder='search...'
      />
   </form>
}

export default Search