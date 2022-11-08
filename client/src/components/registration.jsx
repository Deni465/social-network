import React from "react";

export default class Registration extends React.Component {
    constructor() {
        super();
        this.state = {
            first: "",
            last: "",
            email: "",
            password: "",
            error: "",
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFirstChange = this.handleFirstChange.bind(this);
    }

    handleFirstChange(e) {
        console.log("value: ", e.target.value);
        this.setState({
            first: e.target.value,
        });
    }
    handleLastChange(e) {
        console.log("value: ", e.target.value);
        this.setState({
            last: e.target.value,
        });
    }
    handleEmailChange(e) {
        console.log("value: ", e.target.value);
        this.setState({
            email: e.target.value,
        });
    }
    handlePasswordChange(e) {
        console.log("value: ", e.target.value);
        this.setState({
            password: e.target.value,
        });
    }

    handleChange = (event) => {
        console.log(this);
        console.log("value: ", event.target.value);
        // const target = event.target;
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        const mailRegEx =
            /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!mailRegEx.test(this.state.email)) {
            this.setState({ error: "Invalid E-Mail" });
            return;
        }
        if (this.state.password.length < 4) {
            this.setState({
                error: "Password Should Have At Least 4 Characters",
            });
            return;
        }
        if (this.state.first.length == 0) {
            this.setState({
                error: "First Name Can't Be Empty",
            });
            return;
        }
        if (this.state.last.length == 0) {
            this.setState({
                error: "Last Name Can't Be Empty",
            });
            return;
        }
        const newUser = {
            first: this.state.first,
            last: this.state.last,
            email: this.state.email,
            password: this.state.password,
        };
        console.log("New User: ", newUser);
        // console.log("Fetch register");

        fetch("/register", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: { "Content-Type": "application/json" },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success == true) {
                    location.href = "/";
                }
            })
            .catch((err) => console.log(err));
    }

    render() {
        return (
            <>
                <h2>{"Registration"}</h2>
                <div className="right">
                    <form
                        className="register"
                        action="POST"
                        onSubmit={this.handleSubmit}
                    >
                        <div id="firstform">
                            <label htmlFor="first">First Name</label>
                            <input
                                className="inputfield"
                                type="text"
                                name="first"
                                id="first"
                                placeholder="Mary"
                                value={this.state.first}
                                onChange={this.handleChange}
                            />
                            <label htmlFor="last">Last Name</label>
                            <input
                                className="inputfield"
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
                                className="inputfield"
                                type="text"
                                name="email"
                                id="email"
                                placeholder="mary@mcolive.com"
                                value={this.state.email}
                                onChange={this.handleChange}
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                className="inputfield"
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
                                <span className="mask">REGISTER</span>
                                <button
                                    className="button"
                                    name="Hover"
                                    type="submit"
                                >
                                    REGISTER
                                </button>
                            </div>
                        </div>
                        {this.state.error.length > 0 && (
                            <p style={{ color: "red" }}>{this.state.error}</p>
                        )}
                    </form>
                </div>
            </>
        );
    }
}
