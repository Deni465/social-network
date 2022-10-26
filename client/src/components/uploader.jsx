import "./uploader.css";

export default function Uploader({ setProfilePic, togglePopup }) {
    const onFormSubmit = (e) => {
        // const form =
        // // data of fetch:
        // const data = new FormData(form);
        fetch(e)
            .then((response) => response.json())
            .then((data) => {
                // validate: check if the upload worked!
                // if it did...
                const newUrl = data.url;
                setProfilePic(newUrl);
                // the function call above will ALSO cause the uploader to be hidden.
            });
    };

    return (
        <div className="overlay">
            <div className="popup">
                <h4 onClick={togglePopup}>X</h4>
                <form
                    action="/user/id.json"
                    method="POST"
                    onSubmit={onFormSubmit}
                >
                    <input type="file" />
                    <input type="submit" value="UPLOAD" />
                </form>
            </div>
        </div>
    );
}
