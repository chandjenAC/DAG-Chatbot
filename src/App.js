import React, { useState } from "react";
import "./App.css";
import ChatBotContainer from "./containers/ChatBotContainer";
import DAGraphContainer from "./containers/DAGraphContainer";

const App = () => {
  const [hotelState, setHotelState] = useState({
    selectedHotel: null,
    document: null,
    passport: {
      flag: false,
      graphPlotted: true //starting node plotted by default
    },
    ticket: {
      flag: false,
      graphPlotted: false
    }
  });
  console.log("hotelState", hotelState);

  const [holidayState, setHolidayState] = useState({
    passport: {
      flag: false,
      graphPlotted: true //starting node plotted by default
    },
    ticket: {
      flag: false,
      graphPlotted: false
    },
    insurance: {
      flag: false,
      graphPlotted: false
    },
    visa: {
      flag: false,
      graphPlotted: false
    },
    gifts: {
      flag: false,
      graphPlotted: false
    },
    foreignExchange: {
      flag: false,
      graphPlotted: false
    }
  });

  return (
    <div className="App">
      <header
        style={{
          fontSize: "24px",
          background: "#d2baf7",
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
              setHolidayState={setHolidayState}
              holidayState={holidayState}
              hotelState={hotelState}
              setHotelState={setHotelState}
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
              holidayState={holidayState}
              setHolidayState={setHolidayState}
              hotelState={hotelState}
              setHotelState={setHotelState}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
