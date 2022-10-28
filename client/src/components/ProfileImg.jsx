import { Component } from "react";

export default class ProfileImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
        };
    }

    render() {
        return (
            <>
                <button className="nav-img" onClick={this.props.togglePopup}>
                    <img
                        className="profile"
                        src={this.props.img_url}
                        // src={userName}
                        alt="img"
                    />
                </button>
            </>
        );
    }
}
