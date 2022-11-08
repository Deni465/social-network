/* eslint-disable indent */
import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function FriendshipButton() {
    // console.log("Here is my Button");
    // console.log("UserInfo", isSessionUser);

    const buttonStatus = [
        "REQUEST FRIENDSHIP",
        "UNFRIEND",
        "ACCEPT REQUEST",
        "CANCEL REQUEST",
    ];

    // const [friendship, setFriendship] = useState();
    const [friendshipState, setFriendshipState] = useState(buttonStatus[0]);

    const { id } = useParams();

    function handleClick() {
        let requestUrl = `/requestfriendship/${id}`;
        switch (friendshipState) {
            case 1:
            case 3:
                requestUrl = `/cancelfriendship/${id}`;
                break;
            case 2:
                requestUrl = `/acceptfriendship/${id}`;
                break;
        }
        fetch(requestUrl, { method: "POST" })
            .then((data) => data.json())
            .then((data) => {
                console.log("requestfriendship data", data);
                checkFriendshipState();
            });
    }

    function checkFriendshipState() {
        fetch(`/getfriendship/${id}`)
            .then((data) => data.json())
            .then((userInfo) => {
                console.log("userInfo", userInfo);
                setFriendshipState(userInfo.friendshipStatus);
            });
    }

    useEffect(() => {
        // console.log("id", id);
        checkFriendshipState();
    }, [id]);

    return (
        <>
            {/* <button
                className="button"
                name="reqFriendship"
                type="submit"
                onClick={handleClick}
            >
                {buttonStatus[friendshipState]}
            </button> */}
            <div className="container">
                <div className="button-container">
                    <span className="mask">
                        {" "}
                        {buttonStatus[friendshipState]}
                    </span>

                    <button
                        className="button"
                        onClick={handleClick}
                        name="Hover"
                        type="submit"
                    >
                        {buttonStatus[friendshipState]}
                    </button>
                </div>
            </div>
        </>
    );
}
