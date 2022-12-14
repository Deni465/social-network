import { io } from "socket.io-client";
import { chatMessagesReceived } from "./redux/chats/messages.slice";
import { chatMessageReceived } from "./redux/chats/messages.slice";

export let socket;

export const initSocket = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (data) => {
            if (data) {
                //add messages to redux store
                store.dispatch(chatMessagesReceived(data));
                console.log("data", data);
            }
        });

        socket.on("chatMessage", (data) => {
            //add message to the redux store
            store.dispatch(chatMessageReceived(data));
        });
    }
};
