import React from "react";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleEmailChange(e) {
        // console.log("value: ", e.target.value);
        this.setState({
            email: e.target.value,
        });
    }

    handlePasswordChange(e) {
        // console.log("value: ", e.target.value);
        this.setState({
            password: e.target.value,
        });
    }

    handleChange(event) {
        // console.log("value: ", event.target.value);
        // const target = event.target;
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = { email: this.state.email, password: this.state.password };
        fetch("/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success == true) {
                    location.replace("/");
                    console.log("Login succesfull!");
                }
                console.log("Sorry Login failed");
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <>
                <h2>{"Login"}</h2>
                <div>
                    <form method="POST" onSubmit={this.handleSubmit}>
                        <div id="secondform">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="mary@mcolive.com"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="container">
                            <div className="button-container">
                                <span className="mask">LOGIN</span>
                                <button
                                    className="button"
                                    name="Hover"
                                    type="submit"
                                >
                                    LOGIN
                                </button>
                            </div>
                        </div>
                        {/* <button className="button" type="submit">
                            Login
                        </button> */}
                    </form>
                </div>
            </>
        );
    }
}
