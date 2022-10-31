import { useHistory } from "react-router";

export default function FindPeopleResultList({ users }) {
    // console.log(users);

    const history = useHistory();

    const showProfile = (id) => {
        // console.log("id", id);
        history.push(`/showlatestuser/${id}`);
    };

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id} onClick={() => showProfile(user.id)}>
                    <img src={user.img_url} style={{ width: 100 }} />{" "}
                    <p>
                        {user.first} {user.last}
                    </p>
                </li>
            ))}
        </ul>
    );
}
