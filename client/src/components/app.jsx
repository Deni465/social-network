import { Component } from "react";
import Logo from "./Logo.jsx";
import ProfileImg from "./ProfileImg.jsx";
import Uploader from "./uploader.jsx";
import Profile from "./Profile.jsx";

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
        this.setProfilePic = this.setProfilePic.bind(this);
    }

    componentDidMount() {
        console.log("componentDidMount()");
        // fetch user info from server
        // add it to the state
        fetch("/user")
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
        // console.log("newUrl", url);
        this.togglePopup();
        this.setState({ user: { ...this.state.user, img_url: url } });
    }

    setBio(newBio) {
        this.setState({ user: { ...this.state.user, bio: newBio } });
    }

    render() {
        return (
            <>
                <div className="navbar">
                    <Logo />
                    <ProfileImg
                        first={this.state.user.first}
                        last={this.state.user.last}
                        img_url={this.state.user.img_url}
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
                <Profile
                    first={this.state.user.first}
                    last={this.state.user.last}
                    img_url={this.state.user.img_url}
                    bio={this.state.user.bio}
                    setProfilePic={this.setProfilePic}
                    togglePopup={this.togglePopup}
                    setBio={(updatedBio) => {
                        this.setBio(updatedBio);
                    }}
                />
            </>
        );
    }
}
