import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'

export function PostsPage() {

    const [myData, setMyData] = useState(null);
    useEffect(() => {
        fetch("http://localhost:3001/posts")
            .then(response => response.json())
            .then(data => setMyData(data));

    }, []);

    if (!myData) {
        return <div>Waiting for data!</div>
    }
    return (
        <div>
        {myData.results.map(result =>
            <article className="posts">
                <div>{result.message}</div>
                <img className="post_img" alt={result.imageUrl}
                src={result.imageUrl}/>
                <div className='liked'>Liked {result.likedBy.length}</div>
                <div className='disliked'>Disiked {result.dislikedBy.length}</div>
            </article>
        )}
        if 
        <button>next</button>
        </div>

    );


}