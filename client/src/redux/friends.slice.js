///////// Reducer /////////

export default function friendReducer(friends = [], action) {
    if (action.type === "friends/received") {
        return action.payload.friends;
    } else if (action.type === "friends/accept") {
        const newFriends = friends.map(...friends, action.payload.id);
        return newFriends;
    } else if (action.type === "friends/unfriend") {
        const newFriends = friends.map(
            ...friends,
            friends.slice(0, action.payload.id).slice(action.payload.id + 1)
        );
        return newFriends;
    }
    return friends;
}

///////// Actions /////////

export function setFriendsAction(friends) {
    return {
        type: "friends/received",
        payload: { friends },
    };
}

export function addFriend(id) {
    // return action object that gets passed to reducer
}

export function removeFriend(id) {
    // return action object that gets passed to reducer
}
