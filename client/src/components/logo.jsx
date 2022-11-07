import React from "react";
import logo from "../../public/assets/balloon-logo.png";
// const logo = require("../assets/balloon-logo.png");

export default class Logo extends React.Component {
    render() {
        return (
            <>
                <img className="logo" src={logo} alt="balloon" />
            </>
        );
    }
}
