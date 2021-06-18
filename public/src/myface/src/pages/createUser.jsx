import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function CreateUser() {

    const [userCreated, setUserCreated] = useState(false);
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [profileImageUrl, setProfileImgUrl] = useState(null);
    const [coverImageUrl, setCoverImgUrl] = useState(null);
    const [errorsDetected, setErrorsDetected] = useState([]);

    async function createUserInDatabase() {
        const requestOptions = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ name, username, email, profileImageUrl, coverImageUrl })
        };

        await fetch(`http://localhost:3001/users/create/`, requestOptions)
            .then(() => setUserCreated(true))
            .then(() => console.log(userCreated));
    }

    function hideForm() {
        if (userCreated)
            return <h1 className='success'>User Was Successfully Created</h1>;
        return (
            <form method="post" >
                <label>
                    Name:
                    <input type="text" name="name" required alt="Please enter your name"
                        onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    Username:
                    <input type="text" name="username" pattern="^\S+$" placeholder="UserName"
                        title="Do not enter whitespaces" alt="Please enter your username" required
                        onChange={e => setUsername(e.target.value)} />
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
                        onChange={e => setCoverImgUrl(e.target.value)} />
                </label>
                {/* <button type="submit" onClick={e => validation(e)}>Submit</button> */}
                <button type="submit" onClick={(event) => validation(event)}>Submit</button>
            </form>
        );
    }

    function validation(event) {
        event.preventDefault();
        const errors = [];
        const urlRegex = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm);
        const emailRegex = new RegExp(/@([A-z0-9])+.[A-z]+\S[A-z]+/gm)

        if (name === null || name === "") {
            errors.push(`name must not be empty.`)
        }

        if (username === null || username === "") {
            errors.push(`username must not be empty.`)
        }

        if (email === null || email === "") {
            errors.push(`email must not be empty.`)
        }
        else {
            if (email.match(emailRegex) === null) {
                errors.push('email must look like name.domain.com');
            }
        }

        if (profileImageUrl === null || profileImageUrl === "") {
            errors.push(`profileImageUrl must not be empty.`)
        }
        else {
            if (profileImageUrl.match(urlRegex) === null) {
                errors.push('profileImageUrl must start with http:// or https:/');
            }
        }

        if (coverImageUrl === null || coverImageUrl === "") {
            errors.push(`coverImageUrl must not be empty.`)
        }
        else {
            if (coverImageUrl.match(urlRegex) === null) {
                errors.push('coverImageUrl must start with http:// or https:/');
            }
        }

        if (errors.length === 0) {
            createUserInDatabase();
            setErrorsDetected(errors);
        } else {
            setErrorsDetected(errors);
        }
    }

    function showErrors() {
        console.log(errorsDetected);
        if (errorsDetected.length !== 0) {
            return (
                <div>
                    <h3 className="error">UNABLE TO SUBMIT:</h3>
                    {errorsDetected.map(error =>
                        <div className="error" >{error}</div>
                    )}
                </div>
            );
        }
    }

    return (
        < div >
            <h1 className='createUserHeader'>Create user</h1>
            {hideForm()}
            {showErrors()}
        </div >
    )

}