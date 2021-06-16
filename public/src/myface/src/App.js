import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { PostsPage } from './pages/postsPage.jsx';

function App() {

    return (
        <Router>
            <h1>My Face</h1>
            <Switch>
                <Route path="/posts">
                    <PostsPage />
                </Route>
            </Switch>
        </Router>


    );
}

export default App;


