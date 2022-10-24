import ReactDOM from "react-dom";
import Welcome from "./components/welcome.jsx";
import Logo from "./components/logo.jsx";

ReactDOM.render(<Welcome />, document.querySelector("main"));

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        console.log("data", data);
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            ReactDOM.render(<Logo />, document.querySelector("main"));
        }
    });
