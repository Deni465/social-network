import { combineReducers } from "redux";
import friendReducer from "./friends/friends.slice";
import messagesReducer from "./chats/messages.slice";

const rootReducer = combineReducers({
    friends: friendReducer,
    messages: messagesReducer,
});

export default rootReducer;
