import { BrowserRouter, Route, Link } from "react-router-dom";
import React from "react";
import Registration from "./registration.jsx";
import Logo from "./logo.jsx";
import Login from "./login.jsx";

export default class Welcome extends React.Component {
    render() {
        return (
            <>
                <h1>Welcome To The Olive-Club</h1>
                <p>Everyone Who Loves Olives Is Welcome Here!</p>
                <Logo />
                <BrowserRouter>
                    <Route exact path="/">
                        <Registration />
                        <Link to="/login">Click here to Log in!</Link>
                    </Route>
                    <Route path="/login">
                        <Login />
                        <Link to="/">Click here to register!</Link>
                    </Route>
                </BrowserRouter>
            </>
        );
    }
}
