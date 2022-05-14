/* eslint-disable react/jsx-key */
import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';
import styles from '../styles/hacker_news.module.scss';

export default function DisplayHackerNews({hackerNewsData}) {
    
    return (
        <div className={styles.hacker_data_container}>
            {hackerNewsData.length === 0 ? <h1 className={styles.no_news_found}>No News Found !!!</h1> : hackerNewsData?.map((news) => (
                <Segment>
                    <h3>{news?.title || "No Title"}</h3>
                    <div className={styles.news_details}>
                        <p><Icon name='star' />{news?.points || 0} points</p>
                        <p><Icon name='comments' />{news?.num_comments || 0}</p>
                        <p><span>Created at:</span> {news?.created_at || "00:00:00"}</p>
                        <p><span>Author: </span>{news?.author || "NIL"}</p>
                    </div>
                </Segment>
            ))}
        </div>
    )
}
