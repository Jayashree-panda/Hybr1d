import React, {useEffect, useState} from 'react';
import { useRouter } from "next/router";
import { Loader, Segment } from 'semantic-ui-react';
import axios from 'axios';

export default function NewsDetails() {
    const [isLoading, setIsLoading] = useState(false);
    const [newsDetails, setNewsDetails] = useState([]);
    const router = useRouter();
    const { objectID } = router.query;

    useEffect(() => {
        if(objectID) {
            setIsLoading(true);
            axios.get(`https://hn.algolia.com/api/v1/items/${objectID}`)
            .then((res) => {
                console.log(res.data)
                setNewsDetails(res.data)
            })
            .catch((err) => alert(err))
            .finally(() => setIsLoading(false))
        }
    }, [objectID])

    return (
        <div>
            {isLoading ? <Loader active /> : <div>
                <h1>{newsDetails?.title}</h1>
                <h2>Comments...</h2>
                {newsDetails?.children?.map((comment) => <Segment key={comment?.id}>
                    <div dangerouslySetInnerHTML={{__html: comment?.text}} />
                </Segment>)}
                </div>}
        </div>
    )
}
