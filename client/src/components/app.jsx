import { Component } from "react";
import Logo from "./logo.jsx";
import Profile from "./profile.jsx";
import Uploader from "./uploader.jsx";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            user: {
                first: "",
                last: "",
                email: "",
                img_url: "",
                bio: "",
            },
            isPopupOpen: false,
        };

        this.togglePopup = this.togglePopup.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount()");
        // fetch user info from server
        // add it to the state
        fetch("/user/id.json")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.setState({ user: data });
                console.log("this.state.user :", this.state.user);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    togglePopup() {
        console.log("togglePopup");
        this.setState({
            // set it to the opposite of its current value!
            isPopupOpen: !this.state.isPopupOpen,
        });
    }

    setProfilePic(url) {
        console.log(url);
        // update the state with new profile pic url!
        // close the popup!
        this.togglePopup();
    }

    render() {
        return (
            <>
                <div className="navbar">
                    <Logo />
                    <Profile
                        first={this.state.user.first}
                        last={this.state.user.last}
                        togglePopup={this.togglePopup}
                    />
                    {this.state.isPopupOpen && (
                        <Uploader
                            setProfilePic={this.setProfilePic}
                            togglePopup={this.togglePopup}
                        />
                    )}
                </div>
                <hr />
            </>
        );
    }
}
