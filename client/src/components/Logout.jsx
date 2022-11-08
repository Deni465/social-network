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
                location.replace("/");
            });
    };

    const mode = mode || "small";

    return (
        <>
            <div className={`logout-${mode}`}>
                <div className="button-container">
                    <span className="mask">LOGOUT</span>
                    <button
                        className="button"
                        name="logout"
                        // type="submit"
                        onClick={logout}
                    >
                        LOGOUT
                    </button>
                </div>
            </div>
            {/* <button className="button" name="logout" onClick={logout}>
                Logout
            </button> */}
        </>
    );
};

export default Logout;
