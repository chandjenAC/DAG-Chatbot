import React from "react";
import smiley from "../images/happySmiley.png";

const DisplayMessage = props => {
    const { message } = props

    return (
        <div style={{ margin: 0, padding: 6, alignItems: "center", display: "flex", justifyContent: "flex-start" }}>
            <div style={{ minWidth: 30, minHeight: 30 }}>
                <img src={smiley} alt="chatbot-header-tile" height="35px" width="35px" />
            </div>
            <p style={{ display: "inline", margin: 0, fontSize: "14px", paddingLeft: 6 }}>{props.steps["hotel1"].value} is at its best now.{message}</p>
        </div>
    );
};

export default DisplayMessage;
