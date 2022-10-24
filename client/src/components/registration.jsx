import React from "react";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            email: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFirstChange = this.handleFirstChange.bind(this);
    }

    handleFirstChange = (e) => {
        console.log("value: ", e.target.value);
        this.setState({
            first: e.target.value,
        });
    };
    handleLastChange = (e) => {
        console.log("value: ", e.target.value);
        this.setState({
            last: e.target.value,
        });
    };
    handleEmailChange = (e) => {
        console.log("value: ", e.target.value);
        this.setState({
            email: e.target.value,
        });
    };
    handlePasswordChange = (e) => {
        console.log("value: ", e.target.value);
        this.setState({
            password: e.target.value,
        });
    };

    handleChange = (event) => {
        console.log("value: ", event.target.value);
        // const target = event.target;
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            first: this.state.first,
            last: this.state.last,
            email: this.state.email,
            password: this.state.password,
        };
        console.log("New User: ", newUser);
        console.log("Fetch register");
        fetch("/register", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success == true) {
                    location.href = "/";
                } else {
                    console.log("oops, something went wrong", err);
                }
            })
            .catch((err) => console.log(err));
    };

    render() {
        return (
            <>
                <h2>{"Registration"}</h2>
                <div>
                    <form action="POST" onSubmit={this.handleSubmit}>
                        <div id="firstform">
                            <label htmlFor="first">First Name</label>
                            <input
                                type="text"
                                name="first"
                                id="first"
                                placeholder="Mary"
                                value={this.state.first}
                                onChange={this.handleChange}
                            />
                            <label htmlFor="last">Last Name</label>
                            <input
                                type="text"
                                name="last"
                                id="last"
                                placeholder="McOlive"
                                value={this.state.last}
                                onChange={this.handleChange}
                            />
                        </div>
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

                        <button type="submit">Register</button>
                    </form>
                </div>
            </>
        );
    }
}
