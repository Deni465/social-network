import { BrowserRouter, Route, Link } from "react-router-dom";
import React from "react";
import Registration from "./Registration.jsx";
import Logo from "./Logo.jsx";
import Login from "./Login.jsx";
import ResetPassword from "./ResetPassword.jsx";

export default class Welcome extends React.Component {
    render() {
        return (
            <>
                <h1>Welcome To The Grinch-Club</h1>
                <p>
                    Everyone Who Loves Christmas As Much As The Grinch Or Even
                    The Grinch Or Just The Color Green Is Welcome Here!
                </p>
                <Logo />
                <BrowserRouter>
                    <Route exact path="/">
                        <Registration />
                        <Link to="/login">Click here to Log in!</Link>
                    </Route>
                    <Route path="/login">
                        <Login />
                        <Link to="/">Click here to register!</Link>
                        <Link to="/resetpassword">Forgot My Password</Link>
                    </Route>
                    <Route path="/resetpassword">
                        <ResetPassword />
                    </Route>
                </BrowserRouter>
            </>
        );
    }
}
