const FindPeopleResultList = ({ users }) => {
    console.log(users);
    return (
        <ul>
            {users.map((user) => (
                <li key={user.first}>
                    <img src={user.img_url} style={{ width: 100 }} />{" "}
                    <p>
                        {user.first} {user.last}
                    </p>
                    <p>{user.bio}</p>
                </li>
            ))}
        </ul>
    );
};

export default FindPeopleResultList;
