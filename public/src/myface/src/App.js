import './App.scss';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { PostsPage } from './pages/postsPage.jsx';
import {UserDetails} from './pages/userDetails.jsx'

function App() {

    return (
        <Router>
            <h1>My Face</h1>
            <Switch>
                <Route path="/posts">
                    <PostsPage />
                </Route>
                <Route exact path="/users/:id">
                    <UserDetails />
                </Route>
            </Switch>
            <button className="testButton2">TestButtonImport</button>
        </Router>
    );
}

export default App;


