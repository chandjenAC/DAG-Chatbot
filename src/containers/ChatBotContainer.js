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
import tallyxAvatar from "../images/tallyx.png";
import ChatbotHeader from "../components/ChatbotHeader";
import DisplayMessage from "../components/DisplayMessage";
import axios from "axios";

const ChatBotContainer = props => {
  const images = [
    { image: image1, title: "The Avenue Regent" },
    { image: image2, title: "Casino Hotel" },
    { image: image3, title: "Mezzo" },
    { image: image4, title: "Crown Plaza" },
    { image: image5, title: "Grand Hyatt" },
    { image: image6, title: "Ramada" },
    { image: image7, title: "SAJ Earth Resort" },
    { image: image8, title: "Marriot" }
  ];

  const validate = value => {
    if (value.toLowerCase() !== "yes" && value.toLowerCase() !== "no") {
      return "Please answer yes/no";
    }
    return true;
  };

  const mainSelect = (value, ifYes, ifNo, target) => {
    if (value.toLowerCase() === "hotel") {
      props.setState(prevState => ({
        ...prevState,
        selectedService: {
          ...prevState.selectedService,
          response: value
        },
        bookHotel: {
          ...prevState.bookHotel,
          selectHotel: {
            ...prevState.bookHotel.selectHotel,
            response: "waitingResponse.."
          },
          hotels: prevState.bookHotel.hotels.map(el =>
            el ? { ...el, response: "rendered" } : el
          )
        }
      }));
      return ifYes;
    } else if (value.toLowerCase() === "holiday") {
      props.setState(prevState => ({
        ...prevState,
        selectedService: {
          ...prevState.selectedService,
          response: value
        },
        bookHoliday: {
          ...prevState.bookHoliday,
          destinations: {
            ...prevState.bookHoliday.destinations,
            response: "checking.."
          }
        }
      }));
      return ifYes;
    } else if (
      value.toLowerCase() === "europe" ||
      value.toLowerCase() === "miami"
    ) {
      props.setState(prevState => ({
        ...prevState,
        bookHoliday: {
          ...prevState.bookHoliday,
          selectedDestination: {
            ...prevState.bookHoliday.selectedDestination,
            response: value
          }
          // passport: {
          //   ...prevState.bookHoliday.passport,
          //   response: "checking.."
          // }
        }
      }));
      return ifYes;
    }
    return ifNo;
  };

  const trigger = (value, ifYes, ifNo, target) => {
    if (value.toLowerCase() === "yes") {
      props.setState(prevState => ({
        ...prevState,
        bookHoliday: {
          ...prevState.bookHoliday,
          [target]: {
            ...prevState.bookHoliday[target],
            response: value
          }
        }
      }));
      return ifYes;
    }
    return ifNo;
  };

  const onSelect = (imageTitle, triggerNextStep) => {
    props.setState(prevState => ({
      ...prevState,
      bookHotel: {
        ...prevState.bookHotel,
        ["selectedHotel"]: {
          id: "selectedHotel",
          response: imageTitle,
          graphPlotted: false
        }
      }
    }));
    triggerNextStep({ value: imageTitle, trigger: "hotelSelected" });
  };

  const onFileUpload = (
    file,
    triggerNextStep,
    setFileUploadState,
    setDisableButton
  ) => {
    setDisableButton(true);
    const data = new FormData();
    data.append("file", file);
    axios
      .post("http://localhost:8000/upload", data, {
        onUploadProgress: ProgressEvent => {
          setFileUploadState(prevValues => ({
            ...prevValues,
            loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
          }));
        }
      })
      .then(res => {
        console.log(res.statusText);
      });
    props.setState(prevState => ({
      ...prevState,
      bookHotel: {
        ...prevState.bookHotel,
        ["document"]: {
          id: "documentUpload",
          response: file,
          graphPlotted: false
        }
      }
    }));
    triggerNextStep({ trigger: "bookingConfirmed" });
  };

  const steps = [
    {
      id: "0",
      message: "Hi Sir, Greetings!..May I help You?",
      placeholder: "Select from the options",
      trigger: "1"
    },
    {
      id: "1",
      placeholder: "Select from the options",
      options: [
        {
          value: "hotel",
          label: "Hotel",
          trigger: ({ value }) => {
            return mainSelect(value, "selectHotel", "failed");
          }
        },
        {
          value: "holiday",
          label: "Holiday",
          trigger: ({ value }) => {
            return mainSelect(value, "destination", "failed");
          }
        }
      ]
    },
    {
      id: "selectHotel",
      message: "Please choose your desired hotel from below options",
      trigger: "hotel1",
      placeholder: "Select from the options"
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
      placeholder: "Select from suggested options"
    },
    {
      id: "hotelSelected",
      asMessage: true,
      component: <DisplayMessage message={"Your room is reserved."} />,
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
      placeholder: "Upload document",
      component: <UploadDocument onFileUpload={onFileUpload} />,
      waitAction: true
    },
    {
      id: "bookingConfirmed",
      delay: 2000,
      message: "Thank you, your booking is confirmed!"
    },
    {
      id: "destination",
      message: "Choose your destination",
      trigger: "destinationOptions"
    },
    {
      id: "destinationOptions",
      placeholder: "Select from the options",
      options: [
        {
          value: "europe",
          label: "Europe",
          trigger: ({ value }) => {
            return mainSelect(value, "passport", "failed");
          }
        },
        {
          value: "miami",
          label: "Miami",
          trigger: ({ value }) => {
            return mainSelect(value, "passport", "failed");
          }
        }
      ]
    },
    {
      id: "passport",
      message: "Do you have a passport?",
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

  return (
    <ChatBot
      botAvatar={tallyxAvatar}
      headerComponent={<ChatbotHeader />}
      steps={steps}
    />
  );
};

export default ChatBotContainer;
