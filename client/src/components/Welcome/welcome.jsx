import React from "react";
import Registration from "../Registration/registration.jsx";

export default class Welcome extends React.Component {
    render() {
        return (
            <>
                <h1>Welcome To The Olive-Club</h1>
                <p>Everyone Who Loves Olives Is Welcome Here!</p>
                <Registration />
            </>
        );
    }
}
