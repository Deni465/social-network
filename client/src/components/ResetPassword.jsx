import React from "react";

export default class ResetPassword extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            code: "",
            reqSend: false,
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

        if (this.state.reqSend) {
            const reqContent = {
                email: this.state.email,
                password: this.state.password,
                code: this.state.code,
            };
            console.log("update password");
            fetch("/reset", {
                method: "POST",
                body: JSON.stringify(reqContent),
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("data in getCode", data);
                    if (data.success == true) {
                        location.replace("/login");
                    } else {
                        console.log("Update failed");
                    }
                })
                .catch((err) => console.log("Failed", err));
        } else {
            console.log("req code");
            const reqContent = {
                email: this.state.email,
            };
            fetch("/getcode", {
                method: "POST",
                body: JSON.stringify(reqContent),
                headers: { "Content-Type": "application/json" },
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log("data in getCode", data);
                    this.setState({ reqSend: true });
                })
                .catch((err) => console.log(err));
        }
    }

    render() {
        return (
            <>
                <h2>{"Reset Password"}</h2>
                <div>
                    <form
                        className="register"
                        method="POST"
                        onSubmit={this.handleSubmit}
                    >
                        <div id="secondform">
                            {!this.state.reqSend && (
                                <>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder="mary@mcolive.com"
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                </>
                            )}
                            {this.state.reqSend && (
                                <>
                                    <label htmlFor="code">Code</label>
                                    <input
                                        type="text"
                                        name="code"
                                        id="code"
                                        placeholder="Code"
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="password"
                                        onChange={this.handleChange}
                                    />
                                </>
                            )}
                        </div>
                        <div className="container">
                            <div className="button-container">
                                <span className="mask">SUBMIT</span>
                                <button
                                    className="button"
                                    name="Hover"
                                    type="submit"
                                >
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}
