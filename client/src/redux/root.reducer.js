import { combineReducers } from "redux";
import friendReducer from "./friends.slice";

const rootReducer = combineReducers({ friends: friendReducer });

export default rootReducer;
