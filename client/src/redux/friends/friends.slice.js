///////// Reducer /////////

export default function friendReducer(state = [], action) {
    if (action.type === "friends/received") {
        console.log("friends", action.payload.friends);
        return action.payload.friends;
    } else if (action.type === "friends/accept") {
        console.log("action.payload", action.payload.friends.id);
        // const newFriends = friends.map(...friends, action.payload.id);
        // return {
        //     ...state,
        //     friends: state.friends.map((friend) =>
        //         friend.id === action.payload.id
        //             ? { ...friend, accpeted: true }
        //             : friend
        //     ),
        // };
        return state;
    } else if (action.type === "friends/unfriend") {
        // const friends = friends.map(
        // ...friends,
        // friends.filter((friend)=>{})
        // );
        return state;
    }
    return state;
}

///////// Actions /////////

export function setFriendsAction(friends) {
    return {
        type: "friends/received",
        payload: { friends },
    };
}

export function addFriend(friends) {
    return {
        type: "friends/accept",
        payload: { friends },
    };
    // return action object that gets passed to reducer
}

export function removeFriend(friends) {
    return {
        type: "friends/unfriend",
        payload: { friends },
    };
    // return action object that gets passed to reducer
}
