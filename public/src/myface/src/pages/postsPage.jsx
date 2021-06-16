import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'

export function PostsPage() {

    const [myData, setMyData] = useState(null);

    function updateData(url){
        fetch(`http://localhost:3001${url}`)
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
                        <div className='liked'>Liked {result.likedBy.length}</div>
                        <div className='disliked'>Disiked {result.dislikedBy.length}</div>
                    </article>
                )}
            </div> 
            {returnNavigation(myData.next, 'Next')}
            {returnNavigation(myData.previous, 'Previous')}
        </div>
    );

    function returnNavigation(param, buttonName){
        
        if(param){
           return <button className="next" onClick={() => updateData(param)}>{buttonName}</button>
        }
    }

}