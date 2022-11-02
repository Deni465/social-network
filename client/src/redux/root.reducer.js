import { combineReducers } from "redux";
import friendsReducer from "../components/Friends.jsx";

const rootReducer = combineReducers({ friends: friendsReducer });

export default rootReducer;
