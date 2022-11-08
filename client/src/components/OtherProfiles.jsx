import { useState, useEffect } from "react";
import { useParams } from "react-router";
import FriendshipButton from "./FriendshipButton.jsx";

export default function OtherProfiles({ isSessionUser }) {
    const [otherUser, setOtherUser] = useState("");
    const { id } = useParams();

    useEffect(() => {
        console.log("id", id);
        isSessionUser(id);
        fetch(`/getlatestuser/${id}`)
            .then((data) => data.json())
            .then((otherUserInfo) => {
                // console.log("otherUser", otherUser);
                setOtherUser(otherUserInfo);
            });
    }, [id]);

    return (
        <div className="profileHome">
            <img src={otherUser.img_url} className="nav-img-medium"></img>
            <div className="myProfile">
                {" "}
                <p className="userName">
                    {otherUser.first} {otherUser.last}
                </p>
                <p className="bio-editor">
                    {otherUser.bio} {otherUser.email}
                </p>
                <FriendshipButton />
            </div>
        </div>
    );
}
