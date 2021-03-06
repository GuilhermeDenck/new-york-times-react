import { createContext, useState } from "react";
import api from "../service/api";
import moment from "moment";

export const NewYorkContext = createContext();

const NewYorkProvider = ({children}) => {

  const TOKEN = 'iWaUCXrEeNARxOaYDJ016EFRcQwAphib';

  const [home, setHome] = useState([]);
  const [news, setNews] = useState([]);
  const [article, setArticle] = useState({});

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const formatNews = (news) => {
    const newsFormated = news.results.map( e => {
      return {
          section: e.section,
          title: e.title,
          abstract: e.abstract,
          url: e.url,
          uri: e.uri,
          multimedia: e.multimedia,
          published_date: e.published_date,
          byline: e.byline
      }
    });

    let newArray = newsFormated.filter( e => (e.abstract !== "" || e.title !== "") && moment(e.published_date, "YYYYMMDD").fromNow() !== '2 years ago');

    return newArray;
  }

  const getNewsHome = async () => {
    try {
      const {data} = await api.get(`/home.json?api-key=${TOKEN}`);
      setHome(formatNews(data));
      setLoading(false);
      return home;
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  }

  const getNews = async (typeNews) => {
    try {
      const {data} = await api.get(`/${typeNews}.json?api-key=${TOKEN}`);
      setNews(formatNews(data));
      setLoading(false);
      return news;
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error);
    }
  }

  return (
    <NewYorkContext.Provider value={{ 
      getNewsHome,
      getNews,
      setArticle,
      setLoading,
      article, home, news, error, loading }}>
      {children}
    </NewYorkContext.Provider>
  );
}

export default NewYorkProvider;