import { Component } from "react";

export default class ProfileImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
        };
    }

    render() {
        const defaultImg =
            "https://i.pinimg.com/564x/78/d2/68/78d26806df761d91c412103b1c816b9a.jpg";

        return (
            <>
                <button className="nav-img" onClick={this.props.togglePopup}>
                    <img
                        className="profile"
                        src={this.props.img_url || defaultImg}
                        // src={userName}
                        alt="img"
                    />
                </button>
            </>
        );
    }
}
