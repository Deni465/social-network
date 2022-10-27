import { Component } from "react";
import ProfileImg from "./ProfileImg.jsx";
import BioEditor from "./BioEditor.jsx";
import "./profile.css";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            first: "",
            last: "",
            bio: "",
            textareaIsOpen: false,
        };
        this.toggleTextarea = this.toggleTextarea.bind(this);
    }

    toggleTextarea() {
        console.log("toggleTextarea");
        this.setState({
            // set it to the opposite of its current value!
            textareaIsOpen: !this.state.textareaIsOpen,
        });
    }

    render() {
        return (
            <div className="profileHome">
                <ProfileImg />
                <div className="myProfile">
                    <p>
                        {this.props.first} {this.props.last}
                    </p>
                    {this.state.textareaIsOpen && (
                        <BioEditor toggleTextarea={this.toggleTextarea} />
                    )}
                    <button type="submit" onClick={this.toggleTextarea}>
                        Edit
                    </button>
                </div>
            </div>
        );
    }
}
