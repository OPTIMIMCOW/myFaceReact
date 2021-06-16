import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function PostsPage() {

    const [myData, setMyData] = useState(null);

    async function updateData(url) {
        await fetch(`http://localhost:3001${url}`)
            .then(response => response.json())
            .then(data => setMyData(data));
    }

    useEffect(() => {
        updateData("/posts")
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

                        <button className='like' onClick={() => updateInformation(result.id)}>Like {result.likedBy.length}</button>
                        <div className='dislike'>Disike {result.dislikedBy.length}</div>
                    </article>
                )}
            </div>
            {returnNavigation(myData.next, 'Next')}
            {returnNavigation(myData.previous, 'Previous')}
        </div>
    );

    function updateInformation(postId) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React POST Request Example' })
        };

        fetch(`http://localhost:3001/posts/:${postId}/like/`, requestOptions)
            .then(() => updateData("/posts"));


    }

    function returnNavigation(param, buttonName) {

        if (param) {
            return <button className="next" onClick={() => updateData(param)}>{buttonName}</button>
        }
    }

}