import React from "react";
import ChatBot from "react-simple-chatbot";
import SelectHotel from "../components/SelectHotel";
import UploadDocument from "../components/UploadDocument";
import image1 from "../images/1.jpg";
import image2 from "../images/2.jpg";
import image3 from "../images/3.jpg";
import image4 from "../images/4.jpg";
import image5 from "../images/5.jpg";
import image6 from "../images/6.jpg";
import image7 from "../images/7.jpg";
import image8 from "../images/8.jpg";

const ChatBotContainer = props => {

  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8
  ];

  const validate = value => {
    if (value.toLowerCase() !== "yes" && value.toLowerCase() !== "no") {
      return "Please answer yes/no";
    }
    return true;
  };

  const trigger = (value, ifYes, ifNo, target) => {
    if (value.toLowerCase() === "yes") {
      props.setHolidayState(prevValues => ({
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
      message: "Hi Sir, Greetings!..May I help You?",
      trigger: "1"
    },
    {
      id: "1",
      options: [
        { value: "hotel", label: "Hotel", trigger: "selectHotel" },
        { value: "holiday", label: "Holiday", trigger: "holiday" }
      ]
    },
    {
      id: "selectHotel",
      message: "Please choose your desired hotel from below options",
      trigger: "hotel1"
      
    },
    {
      id: "hotel1",
      component: (
        <SelectHotel
          name={"Casino Hotel"}
          images={images}
          setHotelState={props.setHotelState}
          hotelState={props.hotelState}
        />
      ),
      trigger: () => {
        return "hotel2";
      }
    },
    {
      id: "hotel2",
      component: (
        <SelectHotel
          name={"The Avenue Regent"}
          images={images}
          setHotelState={props.setHotelState}
          hotelState={props.hotelState}
        />
      ),
      trigger: () => {
        return "documentRequest";
      }
    },
    {
      id: "documentRequest",
      message: "Please upload an id proof ",
      trigger: "uploadDocument"
      
    },
    {
      id: "uploadDocument",
      component: <UploadDocument setHotelState={props.setHotelState} />,
      // trigger: () => {
      //   return props.hotelState["document"] ? "bookingConfirmed" : "failed";
      // }
    },
    {
      id: "bookingConfirmed",
      message: "Thank you, your booking is confirmed"
    },
    {
      id: "holiday",
      message: "Hi Sir, Greetings!.. Do you have a passport?",
      trigger: "2"
    },
    {
      id: "2",
      user: true,
      validator: value => validate(value),
      trigger: ({ value, target = "passport" }) => {
        return trigger(value, "ticket", "failed", target);
      }
    },
    {
      id: "ticket",
      message: "Have you got a ticket?",
      trigger: "3"
    },
    {
      id: "3",
      user: true,
      validator: value => validate(value),
      trigger: ({ value, target = "ticket" }) => {
        return trigger(value, "insurance", "insurance", target);
      }
    },
    {
      id: "insurance",
      message: "Need Insurance?",
      trigger: "5"
    },
    {
      id: "5",
      user: true,
      validator: value => validate(value),
      trigger: ({ value, target = "insurance" }) => {
        return trigger(value, "visa", "visa", target);
      }
    },
    {
      id: "visa",
      message: "Get your Visa in 24 hours!!..Get it?",
      trigger: "7"
    },
    {
      id: "7",
      user: true,
      validator: value => validate(value),
      trigger: ({ value, target = "visa" }) => {
        return trigger(value, "gifts", "failed", target);
      }
    },
    {
      id: "gifts",
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
      id: "cash",
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
