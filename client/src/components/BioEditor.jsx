import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            newBio: "",
        };
        this.submitForm = this.submitForm.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.setState({ newBio: this.props.bio || "" });
    }

    onChange(e) {
        // console.log("e", e.target.value);
        this.setState({ newBio: e.target.value });
    }

    submitForm() {
        // console.log(this.state.newBio);

        fetch("/bio", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ bio: this.state.newBio }),
        }).then((data) => {
            console.log("data", data);
        });
        // fetch and upload to server
        this.props.toggleTextarea();
        this.props.setBio(this.state.newBio);
    }

    render() {
        return (
            <div className="bio">
                <textarea
                    value={this.state.newBio}
                    onChange={this.onChange}
                    name="textarea"
                    id="bio"
                    cols="30"
                    rows="10"
                    placeholder="This your Bio! You can write here something about yourself 😊"
                ></textarea>
                <div className="container">
                    <div className="button-container">
                        <span className="mask">SAVE</span>
                        <button
                            className="button"
                            name="Hover"
                            type="submit"
                            onClick={this.submitForm}
                        >
                            SAVE
                        </button>
                    </div>
                </div>

                {/* <button
                    className="button"
                    type="submit"
                    onClick={this.submitForm}
                >
                    Save
                </button> */}
            </div>
        );
    }
}
