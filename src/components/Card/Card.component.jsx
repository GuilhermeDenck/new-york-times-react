import React from 'react'

import style from './Card.module.css';
function Card({ section, image, caption, title }) {

  const upperCaseText = section.charAt(0).toUpperCase() + section.slice(1);

  return (
    <div className={style.cardBoxHome}>
      <p className={style.sectionBox}>{upperCaseText}</p>
      <div className={style.cardBox}>
        <img src={image} alt={caption} />
        <p>{title}</p>
      </div>
    </div>
  )
}

export default Card;