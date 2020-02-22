import React, { useState } from "react";
import "./App.css";
import ChatBotContainer from "./containers/ChatBotContainer";
import DAGraphContainer from "./containers/DAGraphContainer";
const generateNodeFromState=(state)=>{
  let nodes=[]
  
}
const App = () => {
  const [state, setState] = useState({
    selectedService: {
      //starting node plotted by default. Every object is a node.
      id: "selectService",
      response: null, //response is the user response from chatBot
      graphPlotted: true // this variable is a function of user response. If true, node will be plotted with related edges.
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

  console.log("state", state);

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
              setHolidayState={setState}
              hotelState={state.bookHotel}
              setHotelState={setState}
              setState={setState}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

// import React, { useState } from "react";
// import "./App.css";
// import ChatBotContainer from "./containers/ChatBotContainer";
// import DAGraphContainer from "./containers/DAGraphContainer";

// const App = () => {
//   // const [hotelState, setHotelState] = useState({
//   //   selectedHotel: null,
//   //   document: null,
//   //   passport: {
//   //     flag: false,
//   //     graphPlotted: true //starting node plotted by default
//   //   },
//   //   ticket: {
//   //     flag: false,
//   //     graphPlotted: false
//   //   }
//   // });

//   const

//   const [hotelState, setHotelState] = useState({
//     selectHotel: {
//       status: false,
//       graphPlotted: false
//     },
//     // selectedHotel: null,
//     // document: null,
//     hotels: [
//       { hotelName: "The Avenue Regent", selected: false, graphPlotted: false },
//       { hotelName: "Casino Hotel", selected: false, graphPlotted: false },
//       { hotelName: "Mezzo", selected: false, graphPlotted: false },
//       { hotelName: "Crown Plaza", selected: false, graphPlotted: false },
//       { hotelName: "Grand Hyatt", selected: false, graphPlotted: false },
//       { hotelName: "Ramada", selected: false, graphPlotted: false },
//       { hotelName: "SAJ Earth Resort", selected: false, graphPlotted: false },
//       { hotelName: "Marriot", selected: false, graphPlotted: false }
//     ],
//     document: {
//       selectedDocument: null,
//       graphPlotted: false
//     },
//     confirmed: {
//       status: false,
//       graphPlotted: false
//     }
//   });
//   console.log("hotelState", hotelState);

//   const [holidayState, setHolidayState] = useState({
//     passport: {
//       flag: false,
//       graphPlotted: true //starting node plotted by default
//     },
//     ticket: {
//       flag: false,
//       graphPlotted: false
//     },
//     insurance: {
//       flag: false,
//       graphPlotted: false
//     },
//     visa: {
//       flag: false,
//       graphPlotted: false
//     },
//     gifts: {
//       flag: false,
//       graphPlotted: false
//     },
//     foreignExchange: {
//       flag: false,
//       graphPlotted: false
//     }
//   });

//   return (
//     <div className="App">
//       <header
//         style={{
//           fontSize: "24px",
//           background: "#f0e3fc",
//           padding: 10,
//           position: "fixed",
//           width: "100%"
//         }}
//       >
//         DAG - ChatBot
//       </header>
//       <div className="main">
//         <div
//           style={{
//             margin: "16px 8px 16px 16px"
//           }}
//         >
//           <div
//             style={{
//               width: "80%",
//               margin: "auto"
//             }}
//           >
//             <ChatBotContainer
//               setHolidayState={setHolidayState}
//               holidayState={holidayState}
//               hotelState={hotelState}
//               setHotelState={setHotelState}
//             />
//           </div>
//         </div>
//         <div
//           style={{
//             margin: "16px 0px 56px 8px",
//             flexGrow: "2"
//           }}
//         >
//           <div
//             style={{
//               width: "90%",
//               margin: "auto"
//             }}
//           >
//             <p
//               style={{
//                 fontSize: "18px",
//                 margin: "16px 6px 6px 6px"
//               }}
//             >
//               Graph View
//             </p>
//             <DAGraphContainer
//               holidayState={holidayState}
//               setHolidayState={setHolidayState}
//               hotelState={hotelState}
//               setHotelState={setHotelState}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
