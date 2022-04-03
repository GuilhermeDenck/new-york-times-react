import { useEffect, useContext, useState } from 'react'
import { NewYorkContext } from '../../context/NewYork.context';
import { useParams, useNavigate, Link } from 'react-router-dom';

import moment from 'moment';

import Loading from '../../components/Loading/Loading.component';
import Error from '../../components/Error/Error.component';
import SectionBanner from '../../components/SectionBanner/SectionBanner.component';
import style from './SectionsNews.module.css';

import TopNewsSection from '../../components/TopNewsSection/TopNewsSection.component';
import AsideNewsSection from '../../components/AsideNewsSection/AsideNewsSection.component';
import Card from '../../components/Card/Card.component';


const SectionsNews = () => {

  const {typeNews} = useParams();

  const upperCaseText = typeNews.charAt(0).toUpperCase() + typeNews.slice(1);

  const { getNewsWorld, getNewsScience, getNewsTech, getNewsHealth, getNewsPolitics, news, error, loading, setArticle } = useContext(NewYorkContext);
  const navigate = useNavigate();

  const [top, setTop] = useState([]);
  const [aside, setAside] = useState([]);
  const [cards, setCards] = useState([]);
  const [cardAside, setCardAside] = useState([]);
  const [rest, setRest] = useState([]);

  useEffect(() => {
    switch (typeNews) {
      case 'world':
        getNewsWorld();
      break;
      case 'science':
        getNewsScience();
      break;
      case 'tech':
        getNewsTech();
      break;
      case 'health':
        getNewsHealth();
      break;
      case 'politics':
        getNewsPolitics();
      break;
      default:
        navigate('/nyttop');
      break;
    }
    setTop(news.slice(0, 1));
    setAside(news.slice(1, 2));
    setCardAside(news.slice(2, 4));
    setCards(news.slice(4,14))
    setRest(news.slice(14));

  }, [typeNews])
  
  if(loading) return <Loading />
  if(error) return <Error />

  return (
    <div>
      <h1 className={style.titlePage}>{upperCaseText}</h1>
      <hr />
      <div className={style.topNews}> 
        <div>
        {
            top.map( e => (

              <div key={e.uri.split('/')[3]}>
                <Link to={`/details/${e.uri.split('/')[3]}`} onClick={ () => setArticle(e)}>
                  <TopNewsSection title={e.title ? e.title : 'No title'} abstract={e.abstract ? e.abstract : 'No abstract'} multimedia={e.multimedia ? e.multimedia[2].url : null} caption={e.multimedia ? e.multimedia[2].caption : null} kicker={e.kicker} published_date={e.published_date} byline={e.byline} copyright={e.multimedia ? e.multimedia[1].copyright : null} param={'G'}/>
                </Link>
              </div>
            ))
          }
        </div>
        <div>
        {
            aside.map( e => (

              <div key={e.uri.split('/')[3]}>
                <Link to={`/details/${e.uri.split('/')[3]}`} onClick={ () => setArticle(e)}>
                  <TopNewsSection title={e.title ? e.title : 'No title'} abstract={e.abstract ? e.abstract : 'No abstract'} multimedia={e.multimedia ? e.multimedia[2].url : null} caption={e.multimedia ? e.multimedia[2].caption : null} kicker={e.kicker} published_date={e.published_date} byline={e.byline} copyright={e.multimedia ? e.multimedia[1].copyright : null} param={'P'}/>
                </Link>
              </div>
            ))
          }
        </div>
        <div>
        {
          cardAside.map( e => (
            <div key={e.uri.split('/')[3]}>
              <Link to={`/details/${e.uri.split('/')[3]}`} onClick={ () => setArticle(e)}>
                <AsideNewsSection title={e.title ? e.title : 'No title'} abstract={e.abstract ? e.abstract : 'No abstract'} multimedia={e.multimedia ? e.multimedia[2].url : null} caption={e.multimedia ? e.multimedia[2].caption : null} kicker={e.kicker} published_date={e.published_date} byline={e.byline} copyright={e.multimedia ? e.multimedia[1].copyright : null} param={'G'}/>
              </Link>
            </div>
          ))
          }
        </div>
      </div>
      <div className={style.gridCards}>
          {
            cards.map(e => (
              <div key={e.uri.split('/')[3]}>
                <Link to={`/details/${e.uri.split('/')[3]}`} onClick={ () => setArticle(e)} >
                  <Card 
                    section={e.section}
                    image={e.multimedia ? e.multimedia[2].url : null}
                    caption={e.multimedia ? e.multimedia[2].caption : null}
                    title={e.title}
                  />
                </Link>
              </div>
            ))
          }
      </div>
      <div className={style.menuTopLatest}>
        <button> Latest </button>
      </div>
        {
          rest.map( e => (
            <div key={e.uri.split('/')[3]}>
              <Link to={`/details/${e.uri.split('/')[3]}`} onClick={ () => setArticle(e)}>
                <SectionBanner date={moment(e.published_date).format("ll")} title={ e.title ? e.title : 'Sem titulo'} text={e.abstract ? e.abstract : 'Sem informção'} author={e.byline} img={ e.multimedia ? e.multimedia[1].url : null } alt={e.multimedia ? e.multimedia[1].caption : null}/>
              </Link>
            </div>
          ))
        }
    </div>
  )
}

export default SectionsNews;