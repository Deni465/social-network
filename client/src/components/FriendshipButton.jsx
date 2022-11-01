// import { useState, useEffect } from "react";
// import { useParams } from "react-router";

export default function FriendshipButton() {
    // console.log("Here is my Button");
    // console.log("UserInfo", isSessionUser);

    return (
        <>
            <button
                name="reqFriendship"
                type="submit"
                // onClick={() => friendshipRequested(otherUser.id)}
            >
                Request Friendship
            </button>
        </>
    );
}
