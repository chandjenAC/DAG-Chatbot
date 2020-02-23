import * as React from "react";
import { useState, useEffect } from "react";
import { GraphView } from "react-digraph";
import GraphConfig, {
  EMPTY_EDGE_TYPE,
  EMPTY_TYPE,
  NODE_KEY
} from "../config/graph-config"; // Configures node/edge types

const root = {
  edges: [
    {
      handleText: "Listing options",
      handleTooltipText: "available options",
      source: "start",
      target: "a1",
      type: EMPTY_EDGE_TYPE
    },
    {
      handleText: "Listing options",
      handleTooltipText: "available options",
      source: "start",
      target: "b1",
      type: EMPTY_EDGE_TYPE
    }
  ],
  nodes: [
    {
      id: "start",
      title: "Hotel/Holiday ?",
      type: EMPTY_TYPE
    },
    {
      id: "a1",
      title: "Book Hotel",
      type: EMPTY_TYPE,
      x: 400,
      y: 300
    },
    {
      id: "b1",
      title: "Book Holiday",
      type: EMPTY_TYPE,
      x: 400,
      y: -300
    }
  ]
};

const getSelectedNodeByIdFromNodeArray = (id, array) => {
  return array.filter(obj => {
    return obj.title === id;
  });
};

// const createNodesFromArray = array => {
//     let newNodes = [];
//     for (let i = 0; i < array.length; i++) {
//       newNodes.push({
//         id: `a${i + 2}`,
//         title: array[i].title,
//         type: EMPTY_TYPE,
//         x: 800,
//         y: 1100 - 200 * i
//       });
//     }
//     return newNodes;
//   };


const DAGraphContainer = props => {
  const graphView = React.createRef(GraphView);

  const [graphState, setGraphState] = useState({
    graph: root,
    layoutEngineType: undefined,
    selected: null,
    totalNodes: root.nodes.length
  });

  const getDestinations = graph => {
    graph.nodes = [
      {
        id: "b2",
        title: "Europe",
        type: EMPTY_TYPE,
        x: 800,
        y: -500
      },
      {
        id: "b3",
        title: "Miami",
        type: EMPTY_TYPE,
        x: 800,
        y: -100
      },
      ...graph.nodes
    ];
    graph.edges = [
      {
        handleText: "Destination",
        handleTooltipText: "destination",
        source: "b1",
        target: "b2",
        type: EMPTY_EDGE_TYPE
      },
      {
        handleText: "Destination",
        handleTooltipText: "destination",
        source: "b1",
        target: "b3",
        type: EMPTY_EDGE_TYPE
      },
      ...graph.edges
    ];
    return graph;
  };

  const getPassport = graph => {
    graph.nodes = [
      {
        id: "b4",
        title: "Have Passport",
        type: EMPTY_TYPE,
        x: 1200,
        y: -300
      },
      ...graph.nodes
    ];
    graph.edges = [
      {
        handleText: "Passport Check",
        handleTooltipText: "passport check",
        source: "b2",
        target: "b4",
        type: EMPTY_EDGE_TYPE
      },
      {
        handleText: "Passport Check",
        handleTooltipText: "passport check",
        source: "b3",
        target: "b4",
        type: EMPTY_EDGE_TYPE
      },
      ...graph.edges
    ];
    return graph;
  };

  const getTicketAndInsurance = graph => {
    graph.nodes = [
      {
        id: "b5",
        title: "Get Ticket",
        type: EMPTY_TYPE,
        x: 1600,
        y: -100
      },
      {
        id: "b6",
        title: "Get Insurance",
        type: EMPTY_TYPE,
        x: 1600,
        y: -500
      },
      ...graph.nodes
    ];
    graph.edges = [
      {
        handleText: "Ticket",
        handleTooltipText: "requesting ticket",
        source: "b4",
        target: "b5",
        type: EMPTY_EDGE_TYPE
      },
      {
        handleText: "Insurance",
        handleTooltipText: "requesting insurance",
        source: "b4",
        target: "b6",
        type: EMPTY_EDGE_TYPE
      },
      ...graph.edges
    ];
    return graph;
  };

  const getVisaFromTicket = graph => {
    graph.nodes = [
      {
        id: "b7",
        title: "Get Visa",
        type: EMPTY_TYPE,
        x: 2000,
        y: -300
      },
      ...graph.nodes
    ];
    graph.edges = [
      {
        handleText: "Ticket received..Visa?",
        handleTooltipText: "received ticket & requesting visa",
        source: "b5",
        target: "b7",
        type: EMPTY_EDGE_TYPE
      },
      ...graph.edges
    ];
    return graph;
  };

  const getVisaFromInsurance = graph => {
    graph.nodes = [
      {
        id: "b7",
        title: "Get Visa",
        type: EMPTY_TYPE,
        x: 2000,
        y: -300
      },
      ...graph.nodes
    ];
    graph.edges = [
      {
        handleText: "Insurance received..Visa?",
        handleTooltipText: "received insurance & requesting visa",
        source: "b6",
        target: "b7",
        type: EMPTY_EDGE_TYPE
      },
      ...graph.edges
    ];
    return graph;
  };

  const getGiftsAndForeignExchange = graph => {
    graph.nodes = [
      {
        id: "b8",
        title: "Buy Gifts",
        type: EMPTY_TYPE,
        x: 2400,
        y: -100
      },
      {
        id: "b9",
        title: "Buy Foreign Exchange",
        type: EMPTY_TYPE,
        x: 2400,
        y: -500
      },
      ...graph.nodes
    ];
    graph.edges = [
      {
        handleText: "Gifts",
        handleTooltipText: "buy gifts?",
        source: "b7",
        target: "b8",
        type: EMPTY_EDGE_TYPE
      },
      {
        handleText: "Foreign Exchange",
        handleTooltipText: "need some cash?",
        source: "b7",
        target: "b9",
        type: EMPTY_EDGE_TYPE
      },
      ...graph.edges
    ];
    return graph;
  };

  const getGiftsAndBonVoyage = graph => {
    graph.nodes = [
      {
        id: "b10",
        title: "Bon Voyage!",
        type: EMPTY_TYPE,
        x: 2800,
        y: -300
      },
      ...graph.nodes
    ];
    graph.edges = [
      {
        handleText: "Bon Voyage!",
        handleTooltipText: "Bought Gifts..Bon Voyage!",
        source: "b8",
        target: "b10",
        type: EMPTY_EDGE_TYPE
      },
      ...graph.edges
    ];
    return graph;
  };

  const getForeignExchangeAndBonVoyage = graph => {
    graph.nodes = [
      {
        id: "b10",
        title: "Bon Voyage!",
        type: EMPTY_TYPE,
        x: 2800,
        y: -300
      },
      ...graph.nodes
    ];
    graph.edges = [
      {
        handleText: "Bon Voyage!",
        handleTooltipText: "Got some cash..Bon Voyage!",
        source: "b9",
        target: "b10",
        type: EMPTY_EDGE_TYPE
      },
      ...graph.edges
    ];
    return graph;
  };

  let hotelNodes = [
    {
      id: "a2",
      title: "The Avenue Regent",
      type: EMPTY_TYPE,
      x: 800,
      y: 1100
    },
    {
      id: "a3",
      title: "Casino Hotel",
      type: EMPTY_TYPE,
      x: 800,
      y: 900
    },
    {
      id: "a4",
      title: "Mezzo",
      type: EMPTY_TYPE,
      x: 800,
      y: 700
    },
    {
      id: "a5",
      title: "Crown Plaza",
      type: EMPTY_TYPE,
      x: 800,
      y: 500
    },
    {
      id: "a6",
      title: "Grand Hyatt",
      type: EMPTY_TYPE,
      x: 800,
      y: 300
    },
    {
      id: "a7",
      title: "Ramada",
      type: EMPTY_TYPE,
      x: 800,
      y: 100
    },
    {
      id: "a8",
      title: "SAJ Earth Resort",
      type: EMPTY_TYPE,
      x: 800,
      y: -100
    },
    {
      id: "a9",
      title: "Marriot",
      type: EMPTY_TYPE,
      x: 800,
      y: -300
    }
  ];

  const getHotels = graph => {
    graph.nodes = [...hotelNodes, ...graph.nodes];
    graph.edges = [
      {
        handleText: "Select Hotel",
        handleTooltipText: "select hotel",
        source: "a1",
        target: "a2",
        type: EMPTY_EDGE_TYPE
      },
      {
        handleText: "Select Hotel",
        handleTooltipText: "select hotel",
        source: "a1",
        target: "a3",
        type: EMPTY_EDGE_TYPE
      },
      {
        handleText: "Select Hotel",
        handleTooltipText: "select hotel",
        source: "a1",
        target: "a4",
        type: EMPTY_EDGE_TYPE
      },
      {
        handleText: "Select Hotel",
        handleTooltipText: "select hotel",
        source: "a1",
        target: "a5",
        type: EMPTY_EDGE_TYPE
      },
      {
        handleText: "Select Hotel",
        handleTooltipText: "select hotel",
        source: "a1",
        target: "a6",
        type: EMPTY_EDGE_TYPE
      },
      {
        handleText: "Select Hotel",
        handleTooltipText: "select hotel",
        source: "a1",
        target: "a7",
        type: EMPTY_EDGE_TYPE
      },
      {
        handleText: "Select Hotel",
        handleTooltipText: "select hotel",
        source: "a1",
        target: "a8",
        type: EMPTY_EDGE_TYPE
      },
      {
        handleText: "Select Hotel",
        handleTooltipText: "select hotel",
        source: "a1",
        target: "a9",
        type: EMPTY_EDGE_TYPE
      },
      ...graph.edges
    ];
    return graph;
  };

  const getDocument = graph => {
    let hotelId = props.hotelState.selectedHotel.response;
    let selectedNode = getSelectedNodeByIdFromNodeArray(hotelId, hotelNodes);
    graph.nodes = [
      {
        id: "a10",
        title: "Upload Document",
        type: EMPTY_TYPE,
        x: 1200,
        y: 200
      },
      ...graph.nodes
    ];
    graph.edges = [
      {
        handleText: `${selectedNode[0].title} selected..Requesting ID Proof`,
        handleTooltipText: "document request",
        source: selectedNode[0].id,
        target: "a10",
        type: EMPTY_EDGE_TYPE
      },
      ...graph.edges
    ];
    return graph;
  };

  const getConfirmLeafNode = graph => {
    graph.nodes = [
      {
        id: "a11",
        title: "Booking Confirmed",
        type: EMPTY_TYPE,
        x: 1600,
        y: 200
      },
      ...graph.nodes
    ];
    graph.edges = [
      {
        handleText: "Booking Confirmed!",
        handleTooltipText: "Success!",
        source: "a10",
        target: "a11",
        type: EMPTY_EDGE_TYPE
      },
      ...graph.edges
    ];
    return graph;
  };

  useEffect(() => {
    let graph = graphState.graph;
    if (props.state.selectedService.response === "hotel") {
      for (let key in props.hotelState) {
        if (
          props.hotelState[key].response &&
          props.hotelState[key].graphPlotted === false
        ) {
          //plotting graph
          let newGraph;
          if (key === "selectHotel") {
            newGraph = getHotels(graph);
          } else if (key === "selectedHotel") {
            newGraph = getDocument(graph);
          } else if (key === "document") {
            newGraph = getConfirmLeafNode(graph);
          }
          props.setState(prevState => ({
            ...prevState,
            bookHotel: {
              ...prevState.bookHotel,
              [key]: {
                ...prevState.bookHotel[key],
                graphPlotted: true
              }
            }
          }));
          setGraphState(prevValues => ({
            ...prevValues,
            ["graph"]: newGraph
          }));
        }
      }
    } else if (props.state.selectedService.response === "holiday") {
      let newGraph;
      for (let key in props.holidayState) {
        if (
          props.holidayState[key].response &&
          props.holidayState[key].graphPlotted === false
        ) {
          //plotting graph
          if (key === "destinations") {
            newGraph = getDestinations(graph);
          } else if (key === "selectedDestination") {
            newGraph = getPassport(graph);
          } else if (key === "passport") {
            newGraph = getTicketAndInsurance(graph);
          } else if (key === "ticket") {
            newGraph = getVisaFromTicket(graph);
          } else if (key === "insurance") {
            newGraph = getVisaFromInsurance(graph);
          } else if (key === "visa") {
            newGraph = getGiftsAndForeignExchange(graph);
          } else if (key === "gifts") {
            newGraph = getGiftsAndBonVoyage(graph);
          } else if (key === "foreignExchange") {
            newGraph = getForeignExchangeAndBonVoyage(graph);
          }
          setGraphState(prevValues => ({
            ...prevValues,
            ["graph"]: newGraph
          }));
          props.setState(prevState => ({
            ...prevState,
            bookHoliday: {
              ...prevState.bookHoliday,
              [key]: {
                ...prevState.bookHoliday[key],
                graphPlotted: true
              }
            }
          }));
        }
      }
    }
  });

  const handleChangeLayoutEngineType = event => {
    setGraphState(prevValues => ({
      ...prevValues,
      layoutEngineType: event.target.value
    }));
  };

  const { nodes, edges } = graphState.graph;
  const selected = graphState.selected;
  const { NodeTypes, NodeSubtypes, EdgeTypes } = GraphConfig;

  return (
    <div style={{ fontSize: "14px" }}>
      <div
        style={{
          margin: "10px",
          display: "flex",
          flexFlow: "row wrap",
          alignItems: "center"
        }}
      >
        <div style={{ margin: "6px" }}>
          <span>Layout Engine:</span>
          <select
            style={{ marginLeft: "10px" }}
            name="layout-engine-type"
            onChange={handleChangeLayoutEngineType}
          >
            <option value={undefined}>None</option>
            <option value={"SnapToGrid"}>Snap to Grid</option>
            <option value={"VerticalTree"}>Vertical Tree</option>
          </select>
        </div>
      </div>
      <div style={{ height: "750px" }}>
        <GraphView
          ref={graphView}
          nodeKey={NODE_KEY}
          nodes={nodes}
          edges={edges}
          selected={selected}
          nodeTypes={NodeTypes}
          nodeSubtypes={NodeSubtypes}
          edgeTypes={EdgeTypes}
          layoutEngineType={graphState.layoutEngineType}
        />
      </div>
    </div>
  );
};

export default DAGraphContainer;
