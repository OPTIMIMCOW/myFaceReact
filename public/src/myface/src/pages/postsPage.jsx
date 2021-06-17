import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function PostsPage() {

    const [myData, setMyData] = useState(null);
    const [currentURLQuery, setMyURL] = useState("/posts");
    console.log(`updating ${currentURLQuery}`);

    async function updatePostData(url) {
        await fetch(`http://localhost:3001${url}`)
            .then(response => response.json())
            .then(data => setMyData(data));

        console.log(window.location.search);
        console.log(url);
        setMyURL(url);
    }

    useEffect(() => {
        updatePostData("/posts")
    }, []);

    if (!myData) {
        return <div>Waiting for data!</div>
    }
    return (
        <div>
            <div className="post-page">
                {myData.results.map(result =>
                    <article className="posts">
                        <div>{result.message}</div>
                        <img className="post_img" alt={result.imageUrl}
                            src={result.imageUrl} />

                        <button className='like' onClick={() => updateDatabase(result.id)}>Like {result.likedBy.length}</button>
                        <div className='dislike'>Disike {result.dislikedBy.length}</div>
                    </article>
                )}
            </div>
            {returnNavigation(myData.next, 'Next')}
            {returnNavigation(myData.previous, 'Previous')}
        </div>
    );

    function updateDatabase(postId) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId: postId })
        };

        fetch(`http://localhost:3001/posts/${postId}/like/`, requestOptions)
            .then(() => updatePostData(currentURLQuery));
    }

    function returnNavigation(param, buttonName) {

        if (param) {
            return <button className="next" onClick={() => updatePostData(param)}>{buttonName}</button>
        }
    }

}