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
            <DAGraphContainer
              state={state}
              setParentNodeState={setParentNodeState}
              setChildNodeState={setChildNodeState}
              setState={setState} // inside useEffect can remove if not required ...now testing
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

// import image1 from "./images/1.jpg";
// import image2 from "./images/2.jpg";
// import image3 from "./images/3.jpg";
// import image4 from "./images/4.jpg";
// import image5 from "./images/5.jpg";
// import image6 from "./images/6.jpg";
// import image7 from "./images/7.jpg";
// import image8 from "./images/8.jpg";

// const hotelsArray = [
//   { image: image1, title: "The Avenue Regent" },
//   { image: image2, title: "Casino Hotel" },
//   { image: image3, title: "Mezzo" },
//   { image: image4, title: "Crown Plaza" },
//   { image: image5, title: "Grand Hyatt" },
//   { image: image6, title: "Ramada" },
//   { image: image7, title: "SAJ Earth Resort" },
//   { image: image8, title: "Marriot" }
// ];

// onBoarding: {
//   response: null,
//   graphPlotted: true,
//   userAuth: {
//     graphPlotted: false
//   }
// },
// KYB: {
//   response: null,
//   graphPlotted: true,
//   globalID: {
//     graphPlotted: false
//   },
//   indianID: {
//     graphPlotted: false
//   },
//   attachKYB: {
//     response: null,
//     graphPlotted: false,
//     browserUpload: {
//       graphPlotted: false
//     },
//     cloudUpload: {
//       graphPlotted: false
//     },
//     emailAttach: {
//       graphPlotted: false
//     }
//   }
// },
// directorVerify: {
//   response: null,
//   graphPlotted: true,
//   globalTrulioo: {
//     response: null,
//     graphPlotted: false
//   },
//   indianAadhar: {
//     response: null,
//     graphPlotted: false
//   }
// },
// directorUserVerify: {
//   response: null,
//   graphPlotted: true,
//   globalEmail: {
//     response: null,
//     graphPlotted: false
//   },
//   globalMobile: {
//     response: null,
//     graphPlotted: false
//   },
//   attachDirectorID: {
//     response: null,
//     graphPlotted: false,
//     cloudUpload: {
//       response: null,
//       graphPlotted: false
//     },
//     emailAttach: {
//       response: null,
//       graphPlotted: false
//     }
//   },
//   directorKYC: {
//     response: null,
//     graphPlotted: false,
//     globalTrulioo: {
//       response: null,
//       graphPlotted: false
//     },
//     indianDL: {
//       response: null,
//       graphPlotted: false
//     },
//     aadhar: {
//       response: null,
//       graphPlotted: false
//     },
//     indianPassport: {
//       response: null,
//       graphPlotted: false
//     }
//   }
// },
// sanction: {
//   response: null,
//   graphPlotted: true,
//   globalScan: {
//     response: null,
//     graphPlotted: false
//   },
//   alert: {
//     response: null,
//     graphPlotted: false
//   }
// },
// creditRating: {
//   response: null,
//   graphPlotted: true,
//   globalBusiness: {
//     response: null,
//     graphPlotted: false
//   },
//   globalIndividual: {
//     response: null,
//     graphPlotted: false
//   },
//   indianCommercial: {
//     response: null,
//     graphPlotted: false
//   },
//   indianIndividual: {
//     response: null,
//     graphPlotted: false
//   },
//   alert: {
//     response: null,
//     graphPlotted: false
//   }
// },
// sponserUser: {
//   response: null,
//   graphPlotted: true,
//   review: {
//     response: null,
//     graphPlotted: false
//   },
//   authorise: {
//     response: null,
//     graphPlotted: false
//   }
// },
// createAvatar: {
//   response: null,
//   graphPlotted: true,
//   compliance: {
//     response: null,
//     graphPlotted: false
//   },
//   reputation: {
//     response: null,
//     graphPlotted: false
//   },
//   avatarQRCode: {
//     response: null,
//     graphPlotted: false
//   },
//   token: {
//     response: null,
//     graphPlotted: false
//   }
// }

// [
//   {
//     onBoarding: {
//       id: "1.0",
//       grandParentText: "OnBoarding ID Input",
//       response: null,
//       graphPlotted: true,
//       userAuth: {
//         id: "1.0.1",
//         grandParentText: "OnBoarding ID Input",
//         response: null,
//         graphPlotted: false

//       },
//     },
//     KYB: {
//       id: "1.0",
//       grandParentText: "KYB Condition",
//       response: null,
//       graphPlotted: false
//     },
//     attachKYB: {
//       id: "1.0",
//       grandParentText: "Attach KYB Documents,
//       response: null,
//       graphPlotted: false
//     },
//     directorVerify: {
//       id: "1.0",
//       grandParentText: "Director Verification",
//       response: null,
//       graphPlotted: false
//     },
//     directorUserVerify: {
//       id: "1.0",
//       grandParentText: "Director User Verification",
//       response: null,
//       graphPlotted: false
//     },
//     attachDirectorID: {
//       id: "1.0",
//       grandParentText: "Attach Director ID",
//       response: null,
//       graphPlotted: false
//     },
//     directorKYC: {
//       id: "1.0",
//       grandParentText: "Director KYC",
//       response: null,
//       graphPlotted: false
//     },
//     sanction: {
//       id: "1.0",
//       grandParentText: "Sanction Screening",
//       response: null,
//       graphPlotted: false
//     },
//     creditRating: {
//       id: "1.0",
//       grandParentText: "Credit Rating",
//       response: null,
//       graphPlotted: false
//     },
//     sponserUser: {
//       id: "1.0",
//       grandParentText: "Sponsor User",
//       response: null,
//       graphPlotted: false
//     },
//     createAvatar: {
//       id: "1.0",
//       grandParentText: "Create Avatar",
//       response: null,
//       graphPlotted: false
//     }
//   }
// ]
