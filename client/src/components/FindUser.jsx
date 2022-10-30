import FindPeopleResultList from "./FindPeopleResultList.jsx";
import { useState, useEffect } from "react";

export default function FindUser() {
    const [findFriend, setFindFriend] = useState("");

    // const users = {
    //     name: "Bob",
    // };

    // const getUsers = (searchString = "") => {
    //     if (searchString === "") {
    //         return users;
    //     }
    //     return users.filter((user) => {
    //         return user.name
    //             .toLocaleLowerCase()
    //             .startsWith(searchString.toLocaleLowerCase());
    //     });
    // };

    return (
        <>
            <h1>Find People</h1>
            <p>{findFriend}</p>
            <input
                type="text"
                onChange={(e) => {
                    setFindFriend(e.target.value);
                }}
            ></input>
            <FindPeopleResultList />
        </>
    );
}
