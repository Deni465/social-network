import "./uploader.css";
import { useState } from "react";

export default function Uploader({ setProfilePic, togglePopup }) {
    const [filename, setFilename] = useState();

    const onFormSubmit = (e) => {
        e.preventDefault();
        // console.log(e);

        const data = new FormData();
        data.append("file", filename);
        console.log("formData", data);

        // console.log(filename);
        fetch("/profileimg", {
            method: "POST",
            body: data,
            // headers: { "Content-Type": "application/json" },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("data", data);
                setProfilePic(data.url);
                // the function call above will ALSO cause the uploader to be hidden.
            });
    };

    function onChange(e) {
        console.log("e", e);
        setFilename(e.target.files[0]);
    }

    return (
        <div className="overlay">
            <div className="popup">
                <h4 onClick={togglePopup}>X</h4>
                <form
                    action="/user/id.json"
                    method="POST"
                    onSubmit={onFormSubmit}
                >
                    <input name="file" type="file" onChange={onChange} />
                    <input
                        className="input"
                        name="submit"
                        type="submit"
                        value="UPLOAD"
                    />
                </form>
            </div>
        </div>
    );
}
