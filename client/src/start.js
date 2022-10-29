import ReactDOM from "react-dom";
import Welcome from "./components/Welcome.jsx";
// import Logo from "./components/logo.jsx";
import App from "./components/App.jsx";

ReactDOM.render(<Welcome />, document.querySelector("main"));

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        // console.log("data", data);
        if (!data.userId) {
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            // console.log("render app");
            ReactDOM.render(<App />, document.querySelector("main"));
        }
    });
