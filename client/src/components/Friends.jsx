import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { receiveFriendsAction } from "../redux/friends.slice.js";

// export default function Friends() {
//     // useDispatch is used to dispatch action from component to redux store
//     const dispatch = useDispatch();

//     // useSelector is used to retrieve updated data from the global redux store
//     const friendrequests = useSelector((state) => {
//         return state.friends?.filter((friend) => !friend.accepted) || [];
//     });
//     const friends = useSelector((state) => {
//         return; //
//     });

//     useEffect(async () => {
//         // // FETCH all friends and friendrequest from server
//         // dispatch(...); // dispatch the correct action from redux/friends.slice.js
//     }, []);

//     const acceptRequest = () => {
//         // POST request to server to update friendship list (add new friend)
//         dispatch(addFriend()); // dispatch the correct action from redux/friends.slice.js
//     };

//     const endFriendship = () => {
//         // POST request to server to update friendship list (remove existing friend)
//         dispatch(removeFriend()); // dispatch the correct action from redux/friends.slice.js
//     };

//     return (
//         <>
//             <h3>Show Friendship Requesters</h3>

//             <h3>Show Accepted Friendships</h3>
//         </>
//     );
// }
