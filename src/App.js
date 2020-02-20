import React, { useState } from "react";
import "./App.css";
import ChatBotContainer from "./containers/ChatBotContainer";
import DAGraphContainer from "./containers/DAGraphContainer";

const App = () => {
  const [state, setState] = useState({
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
  console.log("state", state);
  return (
    <div className="App">
      <header
        style={{
          fontSize: "24px",
          background: "#d2baf7",
          padding: 16,
          position: "fixed",
          width: "100%"
        }}
      >
        DAG - ChatBot{" "}
      </header>
      <div className="main">
        <div
          style={{
            margin: "16px 8px 16px 16px"
          }}
        >
          {" "}
          <div
            style={{
              width: "80%",
              margin: "auto"
            }}
          >
            <ChatBotContainer setState={setState} state={state} />
          </div>
        </div>
        <div
          style={{
            margin: "16px 16px 56px 8px",
            flexGrow: "2"
          }}
        >
          <div
            style={{
              width: "80%",
              margin: "auto"
            }}
          >
            <p>Graph View</p>
            <DAGraphContainer state={state} setState={setState} />{" "}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default App;
