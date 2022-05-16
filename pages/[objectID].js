import React, {useEffect, useState} from 'react';
import { useRouter } from "next/router";
import { Loader, Segment, Icon } from 'semantic-ui-react';
import axios from 'axios';
import styles from '../styles/hacker_news.module.scss';

export default function NewsDetails() {
    const [isLoading, setIsLoading] = useState(false);
    const [newsDetails, setNewsDetails] = useState({});
    const router = useRouter();
    const { objectID } = router.query;

    useEffect(() => {
        if(objectID) {
            setIsLoading(true);
            axios.get(`https://hn.algolia.com/api/v1/items/${objectID}`)
            .then((res) => {
                setNewsDetails(res.data)
            })
            .catch((err) => alert(err))
            .finally(() => setIsLoading(false))
        }
    }, [objectID])

    return (
        <div>
            {isLoading && <Loader active />}
             {!isLoading && Object.keys(newsDetails).length!==0 && <div  className={`${styles.hacker_news_container} ${styles.news_details_container}`}>
                <h1>{newsDetails?.title || "No Title"}</h1>
                <p className={styles.reward_points}><Icon name='star' />{newsDetails?.points || 0} points</p>
                <h2>Comments...</h2>
                {newsDetails?.children?.map((comment) => <Segment key={comment?.id}>
                    {comment?.text ? <div className={styles.comment_text} dangerouslySetInnerHTML={{__html: comment?.text}} /> : <p className={styles.comment_text}>No Text</p>}
                    <p className={styles.created_at}>{comment?.created_at}</p>
                </Segment>)}
                </div>}
        </div>
    )
}
