import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'

export function UserDetails() {


    const [myData, setMyData] = useState(null);

    function updateData(url) {
        fetch(`http://localhost:3001${url}`)
            .then(response => response.json())
            .then(data => setMyData(data));
    }

    useEffect(() => {
        updateData("/users/1")
    }, []);

    if (!myData) {
        return <div>Waiting for data!</div>
    }
    return (
        <div>
            <div className="user-page">
                <h2 className="user-name">{myData.name} {myData.username}</h2>
                {myData.posts.map(result =>
                    <article className="posts">
                        <div>{result.message}</div>
                        <img className="post_img" alt={result.imageUrl}
                            src={result.imageUrl} />
                    </article>
                )}
                <div className='likes'>Likes {myData.likes.length}</div>
                <div className='dislikes'>Disikes {myData.dislikes.length}</div>
            </div>
        </div>
    )


}