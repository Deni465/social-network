import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    setFriendsAction,
    // addFriend,
    // removeFriend,
} from "../redux/friends/friends.slice.js";
import { Link } from "react-router-dom";

export default function Friends() {
    // useDispatch is used to dispatch action from component to redux store
    const dispatch = useDispatch();

    // // useSelector is used to retrieve updated data from the global redux store
    const friendrequests = useSelector((state) => {
        let filteredFriends = state.friends.filter((friend) => friend.accepted);
        return filteredFriends;
    });

    const pendingrequests = useSelector((state) => {
        let filteredFriends = state.friends.filter(
            (friend) => !friend.accepted
        );
        return filteredFriends;
    });

    useEffect(() => {
        // console.log("friends from redux", friendrequests);
        // console.log("friends from redux pending", pendingrequests[0]);
    }, [friendrequests, pendingrequests]);

    useEffect(async () => {
        const result = await fetch("/friends");
        const friends = await result.json();
        // console.log("myFriends", friends);
        dispatch(setFriendsAction(friends));
        // FETCH all friends and friendrequest from server
        // dispatch(setFriends(friends)); // dispatch the correct action from redux/friends.slice.js
    }, []);

    // const acceptRequest = () => {
    //     // POST request to server to update friendship list (add new friend)
    //     // dispatch(addFriend(friends)); // dispatch the correct action from redux/friends.slice.js
    // };

    // const endFriendship = () => {
    //     // POST request to server to update friendship list (remove existing friend)
    //     // dispatch(removeFriend(friends)); // dispatch the correct action from redux/friends.slice.js
    // };

    const container = {
        height: "100px",
        width: "165px",
    };

    return (
        <>
            <h3 className="friendships">Friendship Requested</h3>
            {pendingrequests && pendingrequests.length > 0 && (
                <div className="notFriends">
                    <ul className="findUser">
                        {pendingrequests.map((pendingrequests) => (
                            <li className="userlist" key={pendingrequests.id}>
                                {" "}
                                <Link
                                    className="links userInfo"
                                    to={`/showlatestuser/${pendingrequests.id}`}
                                >
                                    <img
                                        src={pendingrequests.img_url}
                                        style={{ width: 100 }}
                                    />{" "}
                                    <p className="links">
                                        {pendingrequests.first}{" "}
                                        {pendingrequests.last}
                                    </p>
                                    {/* <button>Accept</button>
                                    <button>Reject</button> */}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}{" "}
            {pendingrequests.length == 0 && (
                <p>No Friendship Requests Right Now</p>
            )}
            <h3 className="friendships">Friendships</h3>
            {friendrequests && friendrequests.length > 0 && (
                <div className="friends">
                    <ul className="findUser">
                        {friendrequests.map((friendrequests) => (
                            <li className="userlist" key={friendrequests.id}>
                                {" "}
                                <Link
                                    className="links userInfo"
                                    to={`/showlatestuser/${friendrequests.id}`}
                                >
                                    <img
                                        src={friendrequests.img_url}
                                        style={{ width: 100 }}
                                    />{" "}
                                    <p className="links">
                                        {friendrequests.first}{" "}
                                        {friendrequests.last}
                                    </p>
                                </Link>
                                <div className="container" style={container}>
                                    <div className="button-container">
                                        <span className="mask">UNFRIEND</span>
                                        <button
                                            className="button"
                                            name="Hover"
                                            type="submit"
                                        >
                                            UNFRIEND
                                        </button>
                                    </div>
                                </div>
                                {/* <button className="button">Unfriend</button> */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {friendrequests.length == 0 && <p>No Friendships Yet</p>}
        </>
    );
}
