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
        <ul className="findUser">
            {users.map((user) => (
                <li
                    className="userlist"
                    key={user.id}
                    onClick={() => showProfile(user.id)}
                >
                    <Link
                        className="links userInfo"
                        to={`/showlatestuser/${user.id}`}
                    >
                        <img src={user.img_url} style={{ width: 100 }} />{" "}
                        <p className="links">
                            {user.first} {user.last}
                        </p>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
