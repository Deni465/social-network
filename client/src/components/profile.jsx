import { Component } from "react";
import ProfileImg from "./ProfileImg.jsx";
import BioEditor from "./BioEditor.jsx";
import "./profile.css";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            textareaIsOpen: false,
            editMode: false,
        };
        this.toggleTextarea = this.toggleTextarea.bind(this);
    }

    componentDidMount() {
        this.setState({
            bio: this.props.bio,
        });
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
                <ProfileImg
                    first={this.props.first}
                    last={this.props.last}
                    img_url={this.props.img_url}
                    togglePopup={this.props.togglePopup}
                />
                <div className="myProfile">
                    <p>
                        {this.props.first} {this.props.last}
                    </p>

                    {this.state.textareaIsOpen && (
                        <BioEditor
                            bio={this.props.bio}
                            setBio={this.props.setBio}
                            toggleTextarea={this.toggleTextarea}
                        />
                    )}
                    {!this.state.textareaIsOpen && (
                        <div>
                            <p>{this.props.bio}</p>{" "}
                            <button type="submit" onClick={this.toggleTextarea}>
                                {this.state.bio ? "Edit Bio" : "Add Bio"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
