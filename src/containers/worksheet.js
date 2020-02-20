// const sample = {
//     edges: [
//       {
//         handleText: "Ticket",
//         handleTooltipText: "requesting ticket",
//         source: "start1",
//         target: "a1",
//         type: EMPTY_EDGE_TYPE
//       },
//       {
//         handleText: "Insurance",
//         handleTooltipText: "requesting insurance",
//         source: "start1",
//         target: "a2",
//         type: EMPTY_EDGE_TYPE
//       },
//       {
//         handleText: "Ticket received..Visa?",
//         handleTooltipText: "received ticket & requesting visa",
//         source: "a1",
//         target: "a3",
//         type: EMPTY_EDGE_TYPE
//       },
//       {
//         handleText: "Insurance received..Visa?",
//         handleTooltipText: "received insurance & requesting visa",
//         source: "a2",
//         target: "a3",
//         type: EMPTY_EDGE_TYPE
//       },
//       {
//         handleText: "Gifts",
//         handleTooltipText: "buy gifts?",
//         source: "a3",
//         target: "a4",
//         type: EMPTY_EDGE_TYPE
//       },
//       {
//         handleText: "Foreign Exchange",
//         handleTooltipText: "need some cash?",
//         source: "a3",
//         target: "a5",
//         type: EMPTY_EDGE_TYPE
//       }
//     ],
//     nodes: [
//       {
//         id: "start1",
//         title: "Get Passport",
//         type: EMPTY_TYPE
//       },
//       {
//         id: "a1",
//         title: "Get Ticket",
//         type: EMPTY_TYPE,
//         x: 400,
//         y: -150
//       },
//       {
//         id: "a2",
//         title: "Get Insurance",
//         type: EMPTY_TYPE,
//         x: 400,
//         y: 150
//       },
//       {
//         id: "a3",
//         title: "Get Visa",
//         type: EMPTY_TYPE,
//         x: 800,
//         y: 0
//       },
//       {
//         id: "a4",
//         title: "Buy Gifts",
//         type: EMPTY_TYPE,
//         x: 1200,
//         y: 150
//       },
//       {
//         id: "a5",
//         title: "Buy Foreign Exchange",
//         type: EMPTY_TYPE,
//         x: 1200,
//         y: -150
//       }
//     ]
//   };
  




if (
    props.state.passport.flag === true &&
    props.state.passport.graphPlotted === false
  ) {
    let newGraph = getTicketAndInsurance(graph);
    setGraphState(prevValues => ({
      ...prevValues,
      ["graph"]: newGraph
    }));
    props.setState(prevValues => ({
      ...prevValues,
      ["passport"]: {
        flag: true,
        graphPlotted: true
      }
    }));
  }
  if (
    props.state.ticket.flag === true &&
    props.state.ticket.graphPlotted === false
  ) {
    let newGraph = getVisaFromTicket(graph);
    setGraphState(prevValues => ({
      ...prevValues,
      ["graph"]: newGraph
    }));
    props.setState(prevValues => ({
      ...prevValues,
      ["ticket"]: {
        flag: true,
        graphPlotted: true
      }
    }));
  }
  if (
    props.state.insurance.flag === true &&
    props.state.insurance.graphPlotted === false
  ) {
    let newGraph = getVisaFromInsurance(graph);
    setGraphState(prevValues => ({
      ...prevValues,
      ["graph"]: newGraph
    }));
    props.setState(prevValues => ({
      ...prevValues,
      ["insurance"]: {
        flag: true,
        graphPlotted: true
      }
    }));
  }
  if (
    props.state.visa.flag === true &&
    props.state.visa.graphPlotted === false
  ) {
    let newGraph = getGiftsAndForeignExchange(graph);
    setGraphState(prevValues => ({
      ...prevValues,
      ["graph"]: newGraph
    }));
    props.setState(prevValues => ({
      ...prevValues,
      ["visa"]: {
        flag: true,
        graphPlotted: true
      }
    }));
  }
  if (
    props.state.gifts.flag === true &&
    props.state.gifts.graphPlotted === false
  ) {
    let newGraph = getGiftsAndBonVoyage(graph);
    setGraphState(prevValues => ({
      ...prevValues,
      ["graph"]: newGraph
    }));
    props.setState(prevValues => ({
      ...prevValues,
      ["gifts"]: {
        flag: true,
        graphPlotted: true
      }
    }));
  }
  if (
    props.state.foreignExchange.flag === true &&
    props.state.foreignExchange.graphPlotted === false
  ) {
    let newGraph = getForeignExchangeAndBonVoyage(graph);
    setGraphState(prevValues => ({
      ...prevValues,
      ["graph"]: newGraph
    }));
    props.setState(prevValues => ({
      ...prevValues,
      ["foreignExchange"]: {
        flag: true,
        graphPlotted: true
      }
    }));
  }