import FindUserResultList from "./FindUserResultList.jsx";
import { useState, useEffect } from "react";

export default function FindUser() {
    const [userQuery, setUserQuery] = useState("");
    const [foundUserList, setFoundUserList] = useState([]);

    useEffect(() => {
        // console.log("userQuery", userQuery);
        fetch(`/getlatestusers/?query=${userQuery}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                // console.log("Hello find user");
                setFoundUserList(data);
            });
    }, [userQuery]);

    return (
        <>
            <h1>Find People</h1>
            {/* <p>{userQuery}</p> */}
            <input
                type="text"
                placeholder="search here"
                onChange={(e) => {
                    setUserQuery(e.target.value);
                }}
            ></input>
            <FindUserResultList users={foundUserList} />
        </>
    );
}
