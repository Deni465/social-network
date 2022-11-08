import React from "react";
import logo from "../../public/assets/balloon-logo.png";
// const logo = require("../assets/balloon-logo.png");

export default class Logo extends React.Component {
    render() {
        const mode = this.props.mode || "medium";
        return (
            <>
                <img className={`logo-${mode}`} src={logo} alt="balloon" />
            </>
        );
    }
}
