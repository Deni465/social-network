export default function ProfilePic({ userName, togglePopup }) {
    userName = userName || "default user name";
    return (
        <>
            <button onClick={togglePopup}>
                <img
                    className="profile"
                    src="https://i.pinimg.com/564x/ac/c6/13/acc613dba5b670301c1ff24cfcaffe9a.jpg"
                    // src={userName}
                    alt={userName}
                />
            </button>
        </>
    );
}
