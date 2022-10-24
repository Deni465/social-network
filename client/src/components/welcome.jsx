import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import Registration from "./registration.jsx";
import Logo from "./logo.jsx";

export default class Welcome extends React.Component {
    render() {
        return (
            <>
                <h1>Welcome To The Olive-Club</h1>
                <p>Everyone Who Loves Olives Is Welcome Here!</p>
                <BrowserRouter>
                    <Route exact path="/">
                        <Logo />
                        <Registration />
                    </Route>
                    <Route path="/login">{/* <Login /> not yet built */}</Route>
                </BrowserRouter>
            </>
        );
    }
}
