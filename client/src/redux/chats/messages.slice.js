/* eslint-disable indent */
export default function messagesReducer(messages = [], action) {
    switch (action.type) {
        case "/messages/received-many":
            return action.payload.messages;
        case "/messages/received-one":
            console.log("new message: ", action.payload.message);
            return [...messages, action.payload.message];
        default:
            return messages;
    }
}

export function chatMessagesReceived(messages) {
    return {
        type: "/messages/received-many",
        payload: { messages },
    };
}
export function chatMessageReceived(message) {
    return {
        type: "/messages/received-one",
        payload: { message },
    };
}
