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
        // console.log("toggleTextarea");
        this.setState({
            // set it to the opposite of its current value!
            textareaIsOpen: !this.state.textareaIsOpen,
        });
    }

    render() {
        const mode = this.props.mode || "medium";
        return (
            <div className="profileHome">
                <ProfileImg
                    first={this.props.first}
                    last={this.props.last}
                    img_url={this.props.img_url}
                    togglePopup={this.props.togglePopup}
                    mode="medium"
                />
                <div className="myProfile">
                    <p className="userName">
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
                        <div className="bio-editor">
                            <p>{this.props.bio}</p>{" "}
                            {/* <button
                                className="button"
                                type="submit"
                                onClick={this.toggleTextarea}
                            > */}
                            <div className={`bio-${mode}`}>
                                <div className="button-container">
                                    <span className="mask">
                                        {" "}
                                        {this.props.bio
                                            ? "EDIT BIO"
                                            : "ADD BIO"}
                                    </span>
                                    <button
                                        className="button"
                                        name="Hover"
                                        type="submit"
                                        onClick={this.toggleTextarea}
                                    >
                                        {this.props.bio
                                            ? "EDIT BIO"
                                            : "ADD BIO"}
                                    </button>
                                </div>
                            </div>
                            {/* </button> */}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
