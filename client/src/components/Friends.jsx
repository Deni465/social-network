import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFriendsAction } from "../redux/friends.slice.js";

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
        console.log("friends from redux", friendrequests);
        console.log("friends from redux pending", pendingrequests[0]);
    }, [friendrequests, pendingrequests]);
    // const friends = useSelector((state) => {
    //     return; //
    // });
    useEffect(async () => {
        const result = await fetch("/friends");
        const friends = await result.json();
        // console.log("myFriends", friends);
        dispatch(setFriendsAction(friends));
        // FETCH all friends and friendrequest from server
        // dispatch(setFriends(friends)); // dispatch the correct action from redux/friends.slice.js
    }, []);
    const acceptRequest = () => {
        // POST request to server to update friendship list (add new friend)
        // dispatch(addFriend(id)); // dispatch the correct action from redux/friends.slice.js
    };
    const endFriendship = () => {
        // POST request to server to update friendship list (remove existing friend)
        // dispatch(removeFriend(id)); // dispatch the correct action from redux/friends.slice.js
    };
    return (
        <>
            <h3>Show Friendship Requesters</h3>
            {friendrequests && friendrequests.length > 0 && (
                <div className="notFriends">
                    <ul>
                        {friendrequests.map((friendrequests) => (
                            <li key={friendrequests}>
                                <img
                                    src={friendrequests.img_url}
                                    style={{ width: 100 }}
                                />{" "}
                                <p>
                                    {friendrequests.first} {friendrequests.last}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <h3>Show Accepted Friendships</h3>
            {pendingrequests && pendingrequests.length > 0 && (
                <div className="notFriends">
                    <ul>
                        {pendingrequests.map((pendingrequests) => (
                            <li key={pendingrequests}>
                                <img
                                    src={pendingrequests.img_url}
                                    style={{ width: 100 }}
                                />{" "}
                                <p>
                                    {pendingrequests.first}{" "}
                                    {pendingrequests.last}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
