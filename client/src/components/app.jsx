import { Component } from "react";
import Logo from "./logo.jsx";
import ProfilePic from "./profile-pic.jsx";
import Uploader from "./uploader.jsx";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "sally-jones",
            isPopupOpen: false,
        };

        this.togglePopup = this.togglePopup.bind(this);
    }

    componentDidMount() {
        // fetch user info from server
        // add it to the state!
    }

    togglePopup() {
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
                    <ProfilePic
                        userName={this.state.userName}
                        togglePopup={this.togglePopup}
                    />
                    {this.state.isPopupOpen && (
                        <Uploader setProfilePic={this.setProfilePic} />
                    )}
                </div>
                <hr />
            </>
        );
    }
}
