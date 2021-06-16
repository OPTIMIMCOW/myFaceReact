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
    });

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

                        <button className='like' onClick={() => updateInformation(result.id, 'like')}>
                            Like {result.likedBy.length}
                        </button>
                        <button className='dislike' onClick={() => updateInformation(result.id, 'dislike')}>
                            Dislike {result.dislikedBy.length}
                        </button>
                    </article>
                )}
            </div>
            {returnNavigation(myData.next, 'Next')}
            {returnNavigation(myData.previous, 'Previous')}
        </div>
    );

    function updateInformation(postId, action) {
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: ''
        };

        fetch(`http://localhost:3001/posts/${postId}/${action}/`, requestOptions)
            .then(() => updateData("/posts"));

    }

    function returnNavigation(param, buttonName) {

        if (param) {
            return <button className="next" onClick={() => updateData(param)}>{buttonName}</button>
        }
    }

}