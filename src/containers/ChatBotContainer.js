import React from "react";
import ChatBot from "react-simple-chatbot";

const ChatBotContainer = props => {
  const validate = value => {
    if (value !== "yes" && value !== "no") {
      return "Please answer yes/no";
    }
    return true;
  };

  const trigger = (value, ifYes, ifNo, target) => {
    console.log("target", target);
    if (value.toLowerCase() === "yes") {
      props.setState(prevValues => ({
        ...prevValues,
        [target]: {
          flag: true,
          graphPlotted: false
        }
      }));
      return ifYes;
    } else if (value.toLowerCase() === "no") {
      return ifNo;
    }
  };

  const steps = [
    {
      id: "0",
      message: "Hi Sir, Greetings!.. Do you have a passport?",
      trigger: "1"
    },
    {
      id: "1",
      user: true,
      validator: value => validate(value),
      trigger: ({ value, target = "passport" }) => {
        return trigger(value, "2", "failed", target);
      }
    },
    {
      id: "2",
      message: "Have you got a ticket?",
      trigger: "3"
    },
    {
      id: "3",
      user: true,
      validator: value => validate(value),
      trigger: ({ value, target = "ticket" }) => {
        return trigger(value, "4", "4", target);
      }
    },
    {
      id: "4",
      message: "Need Insurance?",
      trigger: "5"
    },
    {
      id: "5",
      user: true,
      validator: value => validate(value),
      trigger: ({ value, target = "insurance" }) => {
        return trigger(value, "6", "6", target);
        // console.log("previd", props);
        // if (props.state.ticket === true) {
        //   return trigger(value, "6", "6", target);
        // } else if (props.state.ticket === false)
        //   return trigger(value, "6", "failed", target);
      }
    },
    {
      id: "6",
      message: "Get your Visa in 24 hours!!..Get it?",
      trigger: "7"
    },
    {
      id: "7",
      user: true,
      validator: value => validate(value),
      trigger: ({ value, target = "visa" }) => {
        return trigger(value, "8", "failed", target);
      }
    },
    {
      id: "8",
      message: "Buy Gifts?",
      trigger: "9"
    },
    {
      id: "9",
      user: true,
      validator: value => validate(value),
      trigger: ({ value, target = "gifts" }) => {
        return trigger(value, "10", "10", target);
      }
    },
    {
      id: "10",
      message: "Need some cash?",
      trigger: "11"
    },
    {
      id: "11",
      user: true,
      validator: value => validate(value),
      trigger: ({ value, target = "foreignExchange" }) => {
        return trigger(value, "success", "success", target);
      }
    },
    {
      id: "success",
      message: "Bon voyage!!"
    },
    {
      id: "failed",
      message: "Thank you!..would love to see you back!",
      end: true
    }
  ];

  return <ChatBot headerTitle="Tallyx" steps={steps} />;
};

export default ChatBotContainer;
