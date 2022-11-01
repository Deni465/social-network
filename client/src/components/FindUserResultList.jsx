// import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function FindPeopleResultList({ users }) {
    // console.log(users);

    // const history = useHistory();

    // eslint-disable-next-line no-unused-vars
    const showProfile = (id) => {
        // console.log("id", id);
        // history.push(`/showlatestuser/${id}`);
    };

    return (
        <ul>
            {users.map((user) => (
                <li key={user.id} onClick={() => showProfile(user.id)}>
                    <Link to={`/showlatestuser/${user.id}`}>
                        <img src={user.img_url} style={{ width: 100 }} />{" "}
                        <p>
                            {user.first} {user.last}
                        </p>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
