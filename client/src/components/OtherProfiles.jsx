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
        <>
            <img src={otherUser.img_url}></img>
            <p>
                {otherUser.first} {otherUser.last}
            </p>
            <p>
                {otherUser.bio} {otherUser.email}
            </p>
            <FriendshipButton />
        </>
    );
}
