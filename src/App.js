import React, { useState } from "react";
import "./App.css";
import ChatBotContainer from "./containers/ChatBotContainer";
import DAGraphContainer from "./containers/DAGraphContainer";
import image1 from "./images/1.jpg";
import image2 from "./images/2.jpg";
import image3 from "./images/3.jpg";
import image4 from "./images/4.jpg";
import image5 from "./images/5.jpg";
import image6 from "./images/6.jpg";
import image7 from "./images/7.jpg";
import image8 from "./images/8.jpg";

const hotelsArray = [
  { image: image1, title: "The Avenue Regent" },
  { image: image2, title: "Casino Hotel" },
  { image: image3, title: "Mezzo" },
  { image: image4, title: "Crown Plaza" },
  { image: image5, title: "Grand Hyatt" },
  { image: image6, title: "Ramada" },
  { image: image7, title: "SAJ Earth Resort" },
  { image: image8, title: "Marriot" }
];

const App = () => {
  const [state, setState] = useState({
    selectedService: {
      //starting node plotted by default. Every object is a node.
      id: "selectService",
      response: null, //response is the user response from chatBot
      graphPlotted: true //  is a function of user response.This is the root node plotted by default in DAGraphContainer. For rest of the state objects if graphPlotted is true, corresponding node will be plotted with related edges.
    },
    bookHotel: {
      id: "bookHotel",
      selectHotel: {
        id: "selectHotel",
        response: null,
        graphPlotted: false
      },
      hotels: [
        { id: "The Avenue Regent", response: false, graphPlotted: false },
        { id: "Casino Hotel", response: false, graphPlotted: false },
        { id: "Mezzo", response: false, graphPlotted: false },
        { id: "Crown Plaza", response: false, graphPlotted: false },
        { id: "Grand Hyatt", response: false, graphPlotted: false },
        { id: "Ramada", response: false, graphPlotted: false },
        { id: "SAJ Earth Resort", response: false, graphPlotted: false },
        { id: "Marriot", response: false, graphPlotted: false }
      ],
      selectedHotel: {
        id: "selectedHotel",
        response: null,
        graphPlotted: false
      },
      document: {
        id: "documentUpload",
        response_: null,
        graphPlotted: false
      },
      confirmed: {
        id: "confirm",
        response: null,
        graphPlotted: false
      }
    },
    bookHoliday: {
      id: "bookHoliday",
      destinations: {
        id: "destinations",
        response: null,
        graphPlotted: false
      },
      selectedDestination: {
        id: "selectedDestination",
        response: null,
        graphPlotted: false
      },
      passport: {
        id: "passportCheck",
        response: null,
        graphPlotted: false
      },
      ticket: {
        id: "ticket",
        response: null,
        graphPlotted: false
      },
      insurance: {
        id: "insurance",
        response: null,
        graphPlotted: false
      },
      visa: {
        id: "visa",
        response: null,
        graphPlotted: false
      },
      gifts: {
        id: "gifts",
        response: null,
        graphPlotted: false
      },
      foreignExchange: {
        id: "foreignExchange",
        response: null,
        graphPlotted: false
      }
    }
  });

  return (
    <div className="App">
      <header
        style={{
          fontSize: "24px",
          background: "#f0e3fc",
          padding: 10,
          position: "fixed",
          width: "100%"
        }}
      >
        DAG - ChatBot
      </header>
      <div className="main">
        <div
          style={{
            margin: "16px 8px 16px 16px"
          }}
        >
          <div
            style={{
              width: "80%",
              margin: "auto"
            }}
          >
            <ChatBotContainer
              holidayState={state.bookHoliday}
              hotelState={state.bookHotel}
              setState={setState}
              hotelsArray={hotelsArray}
            />
          </div>
        </div>
        <div
          style={{
            margin: "16px 0px 56px 8px",
            flexGrow: "2"
          }}
        >
          <div
            style={{
              width: "90%",
              margin: "auto"
            }}
          >
            <p
              style={{
                fontSize: "18px",
                margin: "16px 6px 6px 6px"
              }}
            >
              Graph View
            </p>
            <DAGraphContainer
              holidayState={state.bookHoliday}
              setState={setState}
              hotelState={state.bookHotel}
              state={state}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
