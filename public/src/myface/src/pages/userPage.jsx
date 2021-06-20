import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import {returnNavigation} from 'postPage'

export function UsersPage() {

    const [myData, setMyData] = useState(null);
    const [currentURLQuery, setMyURL] = useState("/users/");
    console.log(`current url ${currentURLQuery}`);
    console.log(`mydata ${myData}`);
    console.log(myData);

    async function updatePostData(url) {
        await fetch(`http://localhost:3001${url}`)
            .then(response => response.json())
            .then(data => setMyData(data));

        setMyURL(url);
    }

    useEffect(() => {
        updatePostData("/users/")
    }, []);

    if (!myData) {
        return <div>Waiting for data!</div>
    }
    return (
        <div>
            <div className="post-page">
                {myData.results.map(result =>{

                    return <div>name: {result.name} username: {result.username}</div>
                }
                )}
            </div>
            {/* {returnNavigation(myData.next, 'Next')}
            {returnNavigation(myData.previous, 'Previous')} */}
        </div>
    )
}