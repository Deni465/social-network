import { Component } from "react";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
        };
    }

    render() {
        return (
            <>
                <button onClick={this.props.togglePopup}>
                    <img
                        className="profile"
                        src="https://i.pinimg.com/564x/ac/c6/13/acc613dba5b670301c1ff24cfcaffe9a.jpg"
                        // src={userName}
                        alt="img"
                    />
                </button>
            </>
        );
    }
}
