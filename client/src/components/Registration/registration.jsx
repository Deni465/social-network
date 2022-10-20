import React from "react";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            message: "",
        };
        this.submitForm = this.setState.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
        this.setState({
            message: "Done!",
        });
    }

    render() {
        return (
            <>
                <h2>{"Registration"}</h2>
                <form action="">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="" />
                    <button onClick={this.submitForm}>Register</button>
                </form>
            </>
        );
    }
}
