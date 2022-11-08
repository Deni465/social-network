import { Component } from "react";

const defaultImg =
    "https://i.pinimg.com/originals/1d/52/e9/1d52e9f43419bd4415662b6462f9b0f3.jpg";

export default class ProfileImg extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     message: "",
        // };
    }

    render() {
        const mode = this.props.mode || "medium";
        return (
            <button className={`nav-img`} onClick={this.props.togglePopup}>
                <img
                    className={`nav-img-${mode}`}
                    // style={{ width: this.props.mode === "medium" ? 100 : 20 }}
                    src={this.props.img_url || defaultImg}
                    // src={userName}
                    alt="img"
                />
            </button>
        );
    }
}
