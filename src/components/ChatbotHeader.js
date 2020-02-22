import React from "react";
import tallyxAvatar from "../images/tallyx.png";

const ChatbotHeader = props => {
    return (
        <div style={{ margin: 0, padding: 6, alignItems: "center", display: "flex", justifyContent: "flex-start", background: "black" }}>
            <img src={tallyxAvatar} alt="chatbot-header-tile" height="45" width="45" />
            <p style={{ display: "inline", margin: 0, color: "white", fontSize: "14px",paddingLeft:6 }}>Tallyx</p>
        </div>
    );
};

export default ChatbotHeader;
