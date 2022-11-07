import { BrowserRouter, Route, Link } from "react-router-dom";
import React from "react";
import Registration from "./Registration.jsx";
import Logo from "./Logo.jsx";
import Login from "./Login.jsx";
import ResetPassword from "./ResetPassword.jsx";

export default class Welcome extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="left">
                    <h1>Balloons</h1>
                    <p>Can Be Your Best Friend Or Your Worst Nightmare</p>
                    <Logo />
                </div>
                <div className="right">
                    <BrowserRouter>
                        <Route exact path="/">
                            <Registration />
                            <Link className="links" to="/login">
                                Click here to Log in!
                            </Link>
                        </Route>
                        <Route path="/login">
                            <Login />
                            <Link className="links" to="/">
                                Click here to register!
                            </Link>
                            <Link className="links" to="/resetpassword">
                                Forgot My Password
                            </Link>
                        </Route>
                        <Route path="/resetpassword">
                            <ResetPassword />
                        </Route>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}
