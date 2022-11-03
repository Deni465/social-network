import { useState, useEffect } from "react";
import Logo from "./Logo.jsx";
import ProfileImg from "./ProfileImg.jsx";
import Uploader from "./uploader.jsx";
import Profile from "./Profile.jsx";
import FindUser from "./findUser.jsx";
import Logout from "./Logout.jsx";
import OtherProfiles from "./OtherProfiles.jsx";
import Friends from "./Friends.jsx";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default function App() {
    const [state, setState] = useState({
        user: {
            id: "",
            first: "",
            last: "",
            email: "",
            img_url: "",
            bio: "",
        },
        isPopupOpen: false,
    });

    useEffect(() => {
        fetch("/user")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                // console.log("data", data);
                setState({ ...state, user: data });
                // console.log("this.state.user :", this.state.user);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const togglePopup = () => {
        // console.log("togglePopup");
        setState({
            // set it to the opposite of its current value!
            ...state,
            isPopupOpen: !state.isPopupOpen,
        });
    };

    const setProfilePic = (url) => {
        // console.log("newUrl", url);
        togglePopup();
        setState({ ...state, user: { ...state.user, img_url: url } });
    };

    const setBio = (newBio) => {
        setState({ ...state, user: { ...state.user, bio: newBio } });
    };

    return (
        <>
            <BrowserRouter>
                <div className="navbar">
                    <Logo />
                    <ProfileImg
                        first={state.user.first}
                        last={state.user.last}
                        img_url={state.user.img_url}
                        togglePopup={togglePopup}
                        mode="small"
                    />
                    <Link to="/showlatestusers">Find Users</Link>
                    <Link to="/friendships">Friends</Link>
                    <Link to="/">Back To Profile</Link>
                    <Logout />

                    {state.isPopupOpen && (
                        <Uploader
                            setProfilePic={setProfilePic}
                            togglePopup={togglePopup}
                        />
                    )}
                </div>
                <hr />
                <Route exact path="/">
                    <Profile
                        first={state.user.first}
                        last={state.user.last}
                        img_url={state.user.img_url}
                        bio={state.user.bio}
                        setProfilePic={setProfilePic}
                        togglePopup={togglePopup}
                        setBio={(updatedBio) => {
                            setBio(updatedBio);
                        }}
                    />
                </Route>
                <Route path="/showlatestusers">
                    <FindUser />
                </Route>

                <Route path="/showlatestuser/:id">
                    <OtherProfiles
                        isSessionUser={(id) => {
                            if (id == state.user.id) {
                                location.replace("/");
                            }
                        }}
                    />
                </Route>
                <Route path="/friendships">
                    <Friends />
                </Route>
            </BrowserRouter>
        </>
    );
}
