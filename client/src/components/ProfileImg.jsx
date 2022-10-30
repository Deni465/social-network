import { Component } from "react";

const defaultImg =
    "https://i.pinimg.com/564x/78/d2/68/78d26806df761d91c412103b1c816b9a.jpg";

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
                    className={`profile nav-img-${mode}`}
                    // style={{ width: this.props.mode === "medium" ? 100 : 20 }}
                    src={this.props.img_url || defaultImg}
                    // src={userName}
                    alt="img"
                />
            </button>
        );
    }
}
