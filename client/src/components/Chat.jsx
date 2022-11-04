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
            console.log("message", message);

            socket.emit("chatMessage", { message: message.trim(), id: 1 });
            // clear the input field!
        }
    };

    const onMessageChange = (e) => {
        // update the message state (in this component only)
        setMessage(e.target.value);
    };

    useEffect(() => {}, []);

    // ...

    return (
        // ...
        <>
            <div className="new-message">
                <p>{message}</p>
                <textarea
                    name="message"
                    placeholder="Your message here"
                    onKeyDown={(e) => onChatKeyDown(e)}
                    onChange={(e) => onMessageChange(e)}
                    value={message}
                ></textarea>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {messages.map((message, index) => (
                    <p key={index}>{message.message}</p>
                ))}
            </div>
        </>
    );
}
