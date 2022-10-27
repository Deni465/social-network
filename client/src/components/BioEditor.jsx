import { Component } from "react";

export default class BioEditor extends Component {
    constructor() {
        super();
        this.state = {
            message: "",
        };
    }

    render() {
        return (
            <div className="bio">
                <textarea
                    name="textarea"
                    id="bio"
                    cols="30"
                    rows="10"
                    placeholder="This your Bio! You can write here something about yourself 😊"
                ></textarea>

                <button type="submit" onClick={this.submitForm}>
                    Save
                </button>
            </div>
        );
    }
}
