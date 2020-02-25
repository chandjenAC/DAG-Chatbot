import React, { useState } from "react";
import "./App.css";
import ChatBotContainer from "./containers/ChatBotContainer";
import DAGraphContainer from "./containers/DAGraphContainer";
import axios from "axios";

const App = () => {
  const [state, setState] = useState({
    onBoarding: {
      response: null,
      graphPlotted: false
    },
    KYB: {
      response: null,
      graphPlotted: false,
      attachKYB: {
        response: null,
        graphPlotted: false
      }
    },
    directorVerify: {
      response: null,
      graphPlotted: false
    },
    directorUserVerify: {
      response: null,
      graphPlotted: false,
      attachDirectorID: {
        response: null,
        graphPlotted: false
      },
      directorKYC: {
        response: null,
        graphPlotted: false
      }
    },
    sanction: {
      response: null,
      graphPlotted: false
    },
    creditRating: {
      response: null,
      graphPlotted: false
    },
    sponserUser: {
      response: null,
      graphPlotted: false
    },
    createAvatar: {
      response: null,
      graphPlotted: false
    }
  });

  const setParentNodeState = (value, targetNode) => {
    setState(prevState => ({
      ...prevState,
      [targetNode.id]: {
        ...prevState[targetNode.id],
        response: value
      }
    }));
  };

  const setChildNodeState = (value, targetNode) => {
    let parent = targetNode.parent;
    let child = targetNode.id;
    setState(prevState => ({
      ...prevState,
      [parent]: {
        ...prevState[parent],
        [child]: {
          ...prevState[parent][child],
          response: value
        }
      }
    }));
  };

  const onFileUpload = (
    file,
    triggerNextStep,
    targetNode,
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
    if (targetNode.type === "parent") {
      setParentNodeState(file, targetNode);
    } else if (targetNode.type === "child") {
      setChildNodeState(file, targetNode);
    }
    triggerNextStep({ trigger: targetNode.trigger });
  };

  const authorise = () => {
    console.log("Authorizing ....................");
  };

  const verifyKYB = () => {
    console.log("KYB Verifying ....................");
  };

  const uploadKYB = () => {
    console.log("KYB Uploading ....................");
  };

  const verifyDirectorId = () => {
    console.log("Verifying Director ID ....................");
  };

  const verifyDirectorUsername = () => {
    console.log("Verifying Director username ....................");
  };

  const uploadDirectorID = () => {
    console.log("Uploading Director ID ....................");
  };

  const verifyDirectorKYC = () => {
    console.log("Verifying Director KYC ....................");
  };

  const sanctionScreen = () => {
    console.log("Sanction screening in progress ....................");
  };

  const getCreditRating = () => {
    console.log("Retrieving credit rating ....................");
  };

  const getUserDetails = () => {
    console.log("Retrieving credit rating ....................");
  };
  const getAvatar = () => {
    console.log("Retrieving credit rating ....................");
  };

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
              state={state}
              setParentNodeState={setParentNodeState}
              setChildNodeState={setChildNodeState}
              onFileUpload={onFileUpload}
              authorise={authorise}
              verifyKYB={verifyKYB}
              uploadKYB={uploadKYB}
              verifyDirectorId={verifyDirectorId}
              verifyDirectorUsername={verifyDirectorUsername}
              uploadDirectorID={uploadDirectorID}
              verifyDirectorKYC={verifyDirectorKYC}
              sanctionScreen={sanctionScreen}
              getCreditRating={getCreditRating}
              getUserDetails={getUserDetails}
              getAvatar={getAvatar}
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
            <DAGraphContainer state={state} setState={setState} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
