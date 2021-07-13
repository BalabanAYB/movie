import React from 'react'
import style from './Header.module.css'
import Search from './Search/Search'

const Header = (props) => {
   return <div className={style.header}>
      <div className={style.container}> 
<div className={style.logo}>
<div className={style.icon}>
</div>
<div className={style.logoText}>
MOVIE
</div>
</div>
<div className={style.search}>
<Search/>
</div>
      </div>
   </div>
}

export default Header