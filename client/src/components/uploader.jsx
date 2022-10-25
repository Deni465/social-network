export default function Uploader({ setProfilePic }) {
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
        <>
            <form action="?" method="?" onSubmit={onFormSubmit}></form>
        </>
    );
}
