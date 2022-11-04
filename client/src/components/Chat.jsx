import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { socket } from "../socket";

export default function Chat() {
    const messages = useSelector((state) => state.messages);
    const [message, setMessage] = useState("");

    const onChatKeyDown = (e) => {
        if (e.code === "Enter") {
            e.preventDefault();
            // no need to `fetch`! Just emit via the socket.
            socket.emit("chatMessage", { message: message.trim() });
            // clear the input field!
        }
    };

    const onMessageChange = (e) => {
        // update the message state (in this component only)
    };

    // ...

    return (
        // ...
        <div className="new-message">
            <textarea
                name="message"
                placeholder="Your message here"
                onKeyDown={(e) => onChatKeyDown(e)}
                onChange={(e) => onMessageChange(e)}
                value={message}
            ></textarea>
        </div>
    );
}
