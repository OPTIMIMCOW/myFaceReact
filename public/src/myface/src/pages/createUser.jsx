import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function CreateUser() {

    const [userCreated, setUserCreated] = useState(false);
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [profileImageUrl, setProfileImgUrl] = useState(null);
    const [coverImageUrl, setCoverImgUrl] = useState(null);

    async function createUserInDatabase(event) {

        event.preventDefault();

        console.log(name);
        console.log(username);
        console.log(email);
        console.log(profileImageUrl);
        console.log(coverImageUrl);

        const requestOptions = {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({name, username, email, profileImageUrl, coverImageUrl})
        };
        
        // name: string:
        // username: string;
        // email: string;
        // coverImageUrl: string;
        // profileImageUrl: string;

        console.log(requestOptions);

        await fetch(`http://localhost:3001/users/create/`, requestOptions)
             .then(() => setUserCreated(true))
             .then(() => console.log(userCreated));
    }

    function hideForm() {

        console.log(userCreated);

        if (userCreated)
            return <h1 className='success'>User Was Successfully Created</h1>;
        return (
            <form method="post" >
                <label>
                    Name:
                    <input type="text" name="name" required alt="Please enter your name" 
                    onChange={e => setName(e.target.value)}/>
                </label>
                <label>
                    Username:
                    <input type="text" name="username" pattern="^\S+$" placeholder="UserName" 
                    title="Do not enter whitespaces" alt="Please enter your username" required 
                    onChange={e => setUsername(e.target.value)}/>
                </label>
                <label>
                    Email:
                    <input type="email" name="email" alt="Please enter your your email address" required
                    onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    ProfileImageUrl:
                    <input type="url" placeholder="https://" name="profileImageUrl" 
                    alt="Please enter a url link to a valid profile image" required
                    onChange={e => setProfileImgUrl(e.target.value)} />
                </label>
                <label>

                    CoverImageUrl:
                    <input type="url" placeholder="https://" name="coverImageUrl" 
                    alt="Please enter your a url link to a valid cover image" required 
                    onChange={e => setCoverImgUrl(e.target.value)}/>
                </label>
                <button type="submit" onClick={createUserInDatabase}>Submit</button>
            </form>
        );
    }

    return (
        < div >
            <h1 className='createUserHeader'>Create user</h1>
            {hideForm()}

        </div >
    )

}