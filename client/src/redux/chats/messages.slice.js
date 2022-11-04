/* eslint-disable indent */
export default function messagesReducer(messages = [], action) {
    switch (action.type) {
        case "/messages/received-many":
            console.log(
                "🚀 ~ file: messages.slice.js ~ line 4 ~ messagesReducer ~ action",
                action
            );
            return action.payload.messages;
        case "/messages/received-one":
            console.log(
                "🚀 ~ file: messages.slice.js ~ line 10 ~ messagesReducer ~ action.payload.messages",
                action.payload.messages
            );
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
    console.log(
        "🚀 ~ file: messages.slice.js ~ line 24 ~ chatMessageReceived ~ message",
        message
    );
    return {
        type: "/messages/received-one",
        payload: { message },
    };
}
