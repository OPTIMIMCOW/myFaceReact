import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export function CreateUser() {

    const [userCreated, setUserCreated] = useState(false);
    const [name, setName] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [profileImageUrl, setProfileImgUrl] = useState(null);
    const [coverImageUrl, setCoverImgUrl] = useState(null);
    const [errorsDetected, setErrorsDetected] = useState(null);

    const errors = [];

    async function createUserInDatabase(event) {

        event.preventDefault();

        const requestOptions = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ name, username, email, profileImageUrl, coverImageUrl })
        };
        if (validation()) {
            await fetch(`http://localhost:3001/users/create/`, requestOptions)
                .then(() => setUserCreated(true))
                .then(() => console.log(userCreated));
        }
        else {
            setErrorsDetected(true);
            showErrors();
        }
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
                <button type="submit" onClick={createUserInDatabase}>Submit</button>
            </form>
        );
    }

    function validation() {

        // event.preventDefault();
        const urlRegex = new RegExp(`https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)`);
        const emailRegex = new RegExp("^[A-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Z0-9.-]+$")

        if (email === null || email === "") {
            errors.push(`Email must not be empty.`)
        }
        else {
            errors.push(email.match(emailRegex) ? '' : 'Email must look like name.domain.com');
        }

        if (profileImageUrl === null || profileImageUrl === "") {
            errors.push(`coverImageUrl must not be empty.`)
        }
        else {
            errors.push(profileImageUrl.match(urlRegex) ? '' : 'profileImageUrl must start with http:// or https:/');
        }
        if (coverImageUrl === null || coverImageUrl === "") {
            errors.push(`coverImageUrl must not be empty.`)
        }
        else {
            errors.push(profileImageUrl.match(urlRegex) ? '' : 'profileImageUrl must start with http:// or https:/');
        }
        return (errors.length === 0);

    }

    function showErrors() {

        if (!validation()) {
            return (
                <div>
                    {errors.forEach(error =>
                        <p classname="error"> {error}</p>
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