import moment from 'moment'
import React from 'react'
import style from './TopNews.module.css'

const TopNews = ({ title, abstract, multimedia, published_date, byline, copyright}) => {

  return (
    <div className={style.topNews}>
        <div className={style.cardInfo}>
          <div className={style.cardInfoLeft}>
            <h1>{title}</h1>
            <p>{abstract}</p>
            <br/>
            <p>{byline}</p>
            <small>{moment(published_date).format('DD/MM/YYYY')}</small>
          </div>
          <div className={style.copy}>
            <img src={multimedia} alt="Imagem sobre a notícia" />
            <p>{copyright}</p>
          </div>
        </div>
    </div>
  )
}

export default TopNews;