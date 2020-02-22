import * as React from "react";
import { useState, useEffect } from "react";
import { GraphView } from "react-digraph";
import GraphConfig, {
  EMPTY_EDGE_TYPE,
  EMPTY_TYPE,
  NODE_KEY
} from "../config/graph-config"; // Configures node/edge types

const rootAndLeafNode = {
  edges: [],
  nodes: [
    {
      id: "start1",
      title: "",
      type: EMPTY_TYPE
    },
    {
      id: "a6",
      title: "Bon Voyage!",
      type: EMPTY_TYPE,
      x: 1600,
      y: 0
    }
  ]
};

const DAGraphContainer = props => {
  const graphView = React.createRef(GraphView);

  const [graphState, setGraphState] = useState({
    graph: rootAndLeafNode,
    layoutEngineType: undefined,
    selected: null,
    totalNodes: rootAndLeafNode.nodes.length
  });

  const getTicketAndInsurance = graph => {
    graph.nodes = [
      {
        id: "a1",
        title: "Get Ticket",
        type: EMPTY_TYPE,
        x: 400,
        y: -150
      },
      {
        id: "a2",
        title: "Get Insurance",
        type: EMPTY_TYPE,
        x: 400,
        y: 150
      },
      ...graphState.graph.nodes
    ];
    graph.edges = [
      {
        handleText: "Ticket",
        handleTooltipText: "requesting ticket",
        source: "start1",
        target: "a1",
        type: EMPTY_EDGE_TYPE
      },
      {
        handleText: "Insurance",
        handleTooltipText: "requesting insurance",
        source: "start1",
        target: "a2",
        type: EMPTY_EDGE_TYPE
      },
      ...graphState.graph.edges
    ];
    return graph;
  };

  const getVisaFromTicket = graph => {
    graph.nodes = [
      {
        id: "a3",
        title: "Get Visa",
        type: EMPTY_TYPE,
        x: 800,
        y: 0
      },
      ...graphState.graph.nodes
    ];
    graph.edges = [
      {
        handleText: "Ticket received..Visa?",
        handleTooltipText: "received ticket & requesting visa",
        source: "a1",
        target: "a3",
        type: EMPTY_EDGE_TYPE
      },
      ...graphState.graph.edges
    ];
    return graph;
  };

  const getVisaFromInsurance = graph => {
    graph.nodes = [
      {
        id: "a3",
        title: "Get Visa",
        type: EMPTY_TYPE,
        x: 800,
        y: 0
      },
      ...graphState.graph.nodes
    ];
    graph.edges = [
      {
        handleText: "Insurance received..Visa?",
        handleTooltipText: "received insurance & requesting visa",
        source: "a2",
        target: "a3",
        type: EMPTY_EDGE_TYPE
      },
      ...graphState.graph.edges
    ];
    return graph;
  };

  const getGiftsAndForeignExchange = graph => {
    graph.nodes = [
      {
        id: "a4",
        title: "Buy Gifts",
        type: EMPTY_TYPE,
        x: 1200,
        y: 150
      },
      {
        id: "a5",
        title: "Buy Foreign Exchange",
        type: EMPTY_TYPE,
        x: 1200,
        y: -150
      },
      ...graphState.graph.nodes
    ];
    graph.edges = [
      {
        handleText: "Gifts",
        handleTooltipText: "buy gifts?",
        source: "a3",
        target: "a4",
        type: EMPTY_EDGE_TYPE
      },
      {
        handleText: "Foreign Exchange",
        handleTooltipText: "need some cash?",
        source: "a3",
        target: "a5",
        type: EMPTY_EDGE_TYPE
      },
      ...graphState.graph.edges
    ];
    return graph;
  };

  const getGiftsAndBonVoyage = graph => {
    graph.nodes = [...graphState.graph.nodes];
    graph.edges = [
      {
        handleText: "Bon Voyage!",
        handleTooltipText: "Bought Gifts..Bon Voyage!",
        source: "a4",
        target: "a6",
        type: EMPTY_EDGE_TYPE
      },
      ...graphState.graph.edges
    ];
    return graph;
  };

  const getForeignExchangeAndBonVoyage = graph => {
    graph.nodes = [...graphState.graph.nodes];
    graph.edges = [
      {
        handleText: "Bon Voyage!",
        handleTooltipText: "Got some cash..Bon Voyage!",
        source: "a5",
        target: "a6",
        type: EMPTY_EDGE_TYPE
      },
      ...graphState.graph.edges
    ];
    return graph;
  };

  useEffect(() => {
    let graph = graphState;
    // console.log("useStte working", props.holidayState);
    for (let key in props.holidayState) {
      // console.log("object", props.holidayState[key].response);
      // console.log("key", key);
      // console.log("value", props.holidayState[key]);

      // console.log(props)
      if (
        props.holidayState[key].response === true &&
        props.holidayState[key].graphPlotted === false
      ) {
        //plotting graph
        let newGraph;
        if (key === "passport") {
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
            ...prevState.bookHoliday, // copy all other key-value pairs of food object
            [key]: {
              // specific object of food object
              ...prevState.bookHoliday[key], // copy all pizza key-value pairs
              graphPlotted: true // update value of specific key
            }
          }
        }));
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
