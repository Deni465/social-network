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
                <img
                    src="https://i.pinimg.com/564x/71/d5/23/71d52372f850b616abfedcd7515f802c.jpg"
                    alt="olives"
                />
                <div>
                    <form action="">
                        <div id="firstform">
                            <label htmlFor="first">First Name</label>
                            <input
                                type="text"
                                name="first"
                                id="first"
                                placeholder="Mary"
                            />
                            <label htmlFor="last">Last Name</label>
                            <input
                                type="text"
                                name="last"
                                id="last"
                                placeholder="McOlive"
                            />
                        </div>
                        <div id="secondform">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="mary@mcolive.com"
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="text"
                                name="password"
                                id="password"
                                placeholder="password"
                            />
                        </div>

                        <button onClick={this.submitForm}>Register</button>
                    </form>
                </div>
            </>
        );
    }
}
