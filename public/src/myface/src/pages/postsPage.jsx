import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'


export function PostsPage(props) {

    const [myData, setMyData] = useState(null);
    useEffect(() => {
        fetch("http://localhost:3001/posts")
            .then(response => response.json())
            .then(response => setMyData(response.data))
            .then (checkData(data));
    }, [myData]);

    function checkData(myData) {
        if (!myData) {
            return <div>Waiting for data!</div>
        }
        return (
            <div>Data recieved</div>
        );
    }

}