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

            socket.emit("chatMessage", { message: message.trim() });
            // clear the input field!
        }
    };

    const onMessageChange = (e) => {
        // update the message state (in this component only)
        setMessage(e.target.value);
    };

    useEffect(() => {}, []);

    // ...
    console.log("messages", messages);
    return (
        // ...
        <>
            <div style={{ display: "flex", flexDirection: "column-reverse" }}>
                {messages.map((message, index) => (
                    <div key={index}>
                        {" "}
                        <p>{message.message}</p>
                        <p>{message.first}</p>
                        <p>{message.last}</p>
                        <img src={message.img_url} style={{ width: 50 }}></img>
                        <p>{message.created_at}</p>
                    </div>
                ))}
            </div>
            <div className="new-message">
                {/* <p>{message}</p> */}
                <textarea
                    name="message"
                    placeholder="Your message here"
                    onKeyDown={(e) => onChatKeyDown(e)}
                    onChange={(e) => onMessageChange(e)}
                    value={message}
                ></textarea>
            </div>
        </>
    );
}
