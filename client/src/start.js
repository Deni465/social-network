import ReactDOM from "react-dom";
import Welcome from "./components/Welcome.jsx";
import App from "./components/App.jsx";
import { Provider } from "react-redux";
import { legacy_createStore } from "redux";
import rootReducer from "./redux/root.reducer.js";
import { initSocket } from "./socket.js";

const store = legacy_createStore(rootReducer);
initSocket(store);

ReactDOM.render(<Welcome />, document.querySelector("main"));

fetch("/user/id.json")
    .then((response) => response.json())
    .then((data) => {
        // console.log("data", data);
        if (!data.userId) {
            //set up socket
            ReactDOM.render(<Welcome />, document.querySelector("main"));
        } else {
            //console.log("render app");
            ReactDOM.render(
                <Provider store={store}>
                    <App />
                </Provider>,
                document.querySelector("main")
            );
        }
    });
