import { io } from "socket.io-client";
import { chatMessagesReceived } from "./redux/chats/messages.slice";
import { chatMessageReceived } from "./redux/chats/messages.slice";

export let socket;

export const initSocket = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (data) => {
            if (data) {
                console.log("latest messages", data);
                //add messages to redux store
                store.dispatch(chatMessagesReceived(data));
            }
        });

        socket.on("chatMessage", (data) => {
            console.log(
                "🚀 ~ file: socket.js ~ line 24 ~ socket.on ~ data",
                data
            );
            //add message to the redux store
            store.dispatch(chatMessageReceived(data));
        });
    }
};
