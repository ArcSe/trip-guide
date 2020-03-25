import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login";
import SignUp from "./components/signup";

function App() {
    return (
        <Router>
        <div className="App">
        <div className="auth-wrapper">
        <div className="auth-inner">

        <div className="navigation-links">
        <ul class="nav nav-pills nav-fill">
        <li class="nav-item">
        <a class="nav-link active" data-toggle="pill" href={"/login"}>Login</a>
        </li>
        <li class="nav-item">
        <a class="nav-link " data-toggle="pill" href={"/sign-up"}>Sign Up</a>
    </li>
    </ul>
    </div>

    <Switch>
    <Route exact path='/' component={Login} />
    <Route path="/login" component={Login} />
    <Route path="/sign-up" component={SignUp} />
    </Switch>

    </div>
    </div>
    </div>
    </Router>
);
}

export default App;