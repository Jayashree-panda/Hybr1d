import React, {useState, useEffect} from 'react';
import { Input, Button, Loader } from 'semantic-ui-react';
import axios from 'axios';
import 'semantic-ui-css/semantic.min.css';
import DisplayHackerNews from '../pageComponents/displayHackerNews';
import styles from '../styles/hacker_news.module.scss';

export default function HackerNews() {
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hackerNewsData, setHackerNewsData] = useState([]);

  const getHackerNewsData = () => {
    setIsLoading(true);
    axios
    .get(`https://hn.algolia.com/api/v1/search?query=${searchValue}`)
    .then((res) => {
      setHackerNewsData(res.data.hits);
    })
    .catch((err) => {
      alert(err);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  useEffect(() => {
    getHackerNewsData();
  }, [])

  return (
    <div className={styles.hacker_news_container}>
      <div className={styles.hacker_news_wrapper}>
        <Input fluid placeholder="Search Here..." onChange={(e, data) => setSearchValue(data.value)} />
        <Button onClick={getHackerNewsData}>Search</Button>
      </div>
      {isLoading ? <Loader active /> : <DisplayHackerNews hackerNewsData={hackerNewsData} />}
    </div>
  )
}
