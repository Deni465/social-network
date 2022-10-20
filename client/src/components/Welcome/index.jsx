import React from "react";
import Registration from "../Registration/registration.jsx";

export default class Welcome extends React.Component {
    render() {
        return (
            <>
                <h1>Welcome</h1>
                <Registration />
            </>
        );
    }
}