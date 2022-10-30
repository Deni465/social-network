const Logout = () => {
    const logout = () => {
        fetch("/logout", {
            method: "get",
            headers: {
                "content-type": "application/json",
            },
        })
            .then((res) => res.json())
            .then(() => {
                location.reload();
            });
    };

    return (
        <>
            <button name="logout" onClick={logout}>
                Logout
            </button>
        </>
    );
};

export default Logout;
