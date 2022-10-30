import FindPeopleResultList from "./FindPeopleResultList.jsx";
import { useState, useEffect } from "react";

export default function FindUser() {
    const [findFriend, setFindFriend] = useState("");
    const [foundUserList, setFoundUserList] = useState([]);

    useEffect(() => {
        // setFoundUserList([{ name: "Bob" }]);
        console.log("findFriend", findFriend);
        fetch(`/showlatestusers/?query=${findFriend}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                setFoundUserList(data);
            });
    }, [findFriend]);

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
            <FindPeopleResultList users={foundUserList} />
        </>
    );
}
