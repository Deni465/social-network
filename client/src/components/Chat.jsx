import { useSelector } from "react-redux";
import { useState } from "react";
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
            setMessage("");
        }
    };

    const onMessageChange = (e) => {
        // update the message state (in this component only)
        setMessage(e.target.value);
    };

    return (
        <>
            <div className="chat">
                {messages.map((message, index) => (
                    <div className="chat-info" key={index}>
                        {" "}
                        <img className="chat-img" src={message.img_url}></img>
                        <div
                            className="text"
                        >
                            {" "}
                            <p style={{ fontSize: 10 }}>
                                {message.first} {message.last}
                            </p>
                            <p style={{ fontSize: 20 }}>{message.message}</p>
                            <p style={{ fontSize: 8 }}>{message.created_at} </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="new-message">
                {/* <p>{message}</p> */}
                <textarea
                    className="chat-textarea"
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
