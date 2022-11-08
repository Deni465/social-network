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
                    <Logo mode="medium" />
                </div>
                <div className="right bg">
                    <BrowserRouter>
                        <Route exact path="/">
                            <Registration />
                            <Link className="links" to="/login">
                                Click Here To Log in!
                            </Link>
                        </Route>
                        <Route path="/login">
                            <Login />
                            <Link className="links" to="/">
                                Click Here To Register!
                            </Link>
                            <Link className="links" to="/resetpassword">
                                Forgot My Password
                            </Link>
                        </Route>
                        <Route path="/resetpassword">
                            <ResetPassword />
                            <Link className="links" to="/login">
                                Click Here To Log in!
                            </Link>
                        </Route>
                    </BrowserRouter>
                </div>
            </div>
        );
    }
}
