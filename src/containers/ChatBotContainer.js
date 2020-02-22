import React, { useEffect } from "react";
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
import tallyxAvatar from "../images/tallyx.png";
import ChatbotHeader from "../components/ChatbotHeader";
import DisplayMessage from "../components/DisplayMessage"
import axios from 'axios';

const ChatBotContainer = props => {

  const images = [
    { image: image1, title: "The Avenue Regent" },
    { image: image2, title: "Casino Hotel" },
    { image: image3, title: "Mezzo" },
    { image: image4, title: "Crown Plaza" },
    { image: image5, title: "Grand Hyatt" },
    { image: image6, title: "Ramada" },
    { image: image7, title: "SAJ Earth Resort" },
    { image: image8, title: "Marriot" },
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
    }
    return ifNo;
  };

  const onSelect = (imageTitle, triggerNextStep) => {
    props.setHotelState(prevValues => ({
      ...prevValues,
      ["selectedHotel"]: imageTitle
    }));
    triggerNextStep({ value: imageTitle, trigger: "hotelSelected" })
  };



  const onFileUpload = (file, triggerNextStep) => {
    console.log("document check on upload click", props.hotelState["document"])
    const data = new FormData()
    data.append('file', file)
    axios.post("http://localhost:8000/upload", data, { // receive two parameter endpoint url ,form data 
    })
      .then(res => { // then print response status
        console.log(res.statusText)
      })
  }

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
          title={"Suggestion Title"}
          images={images}
          onSelect={onSelect}
        />
      ),
      waitAction: true,
      value: "stesfse"
    },
    {
      id: "hotelSelected",
      asMessage: true,
      component: (
        <DisplayMessage
          message={"Your room is reserved."}
        />
      ),
      trigger: "documentRequest"
    },
    {
      id: "documentRequest",
      delay: 2000,
      message: "Please upload an id proof to confirm your booking",
      trigger: "uploadDocument"
    },
    {
      id: "uploadDocument",
      component: <UploadDocument onFileUpload={onFileUpload} />,

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
        return trigger(value, "cash", "cash", target);
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
  return <ChatBot botAvatar={tallyxAvatar} headerComponent={<ChatbotHeader />} steps={steps} />;
};

export default ChatBotContainer;
