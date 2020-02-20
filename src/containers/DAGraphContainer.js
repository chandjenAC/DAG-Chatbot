import * as React from "react";
import { useState, useEffect } from "react";
import { GraphView } from "react-digraph";
import GraphConfig, {
  edgeTypes,
  EMPTY_EDGE_TYPE,
  EMPTY_TYPE,
  NODE_KEY,
  nodeTypes
} from "../config/graph-config"; // Configures node/edge types

const rootNode = {
  edges: [],
  nodes: [
    {
      id: "start1",
      title: "Get Passport",
      type: EMPTY_TYPE
    }
  ]
};

const DAGraphContainer = props => {
  const [graphState, setGraphState] = useState({
    graph: rootNode,
    layoutEngineType: undefined,
    selected: null,
    totalNodes: rootNode.nodes.length
  });

  const graphView = React.createRef(GraphView);

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

  useEffect(() => {
    let graph = graphState;
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
  });

  const onCreateNode = (x, y) => {
    const graph = graphState.graph;
    const type = Math.random() < 0.25 ? EMPTY_TYPE : EMPTY_TYPE;
    const viewNode = {
      id: Date.now(),
      title: "",
      type,
      x,
      y
    };
    graph.nodes = [...graph.nodes, viewNode];
    setGraphState({ graph });
  };

  const onCreateEdge = (sourceViewNode, targetViewNode) => {
    const graph = graphState.graph;
    const type =
      sourceViewNode.type === EMPTY_TYPE ? EMPTY_EDGE_TYPE : EMPTY_EDGE_TYPE;
    const viewEdge = {
      source: sourceViewNode[NODE_KEY],
      target: targetViewNode[NODE_KEY],
      type
    };

    // Only add the edge when the source node is not the same as the target
    if (viewEdge.source !== viewEdge.target) {
      graph.edges = [...graph.edges, viewEdge];
      setGraphState({
        graph,
        selected: viewEdge
      });
    }
  };

  // Called when an edge is reattached to a different target.

  const handleChangeLayoutEngineType = event => {
    setGraphState({
      layoutEngineType: event.target.value
    });
  };

  const { nodes, edges } = graphState.graph;
  const selected = graphState.selected;
  const { NodeTypes, NodeSubtypes, EdgeTypes } = GraphConfig;

  return (
    <div style={{ fontSize: "16px" }}>
      <div
        style={{
          margin: "10px",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div style={{ margin: "10px" }}>
          <span>Layout Engine:</span>
          <select
            name="layout-engine-type"
            onChange={handleChangeLayoutEngineType}
          >
            <option value={undefined}>None</option>
            <option value={"SnapToGrid"}>Snap to Grid</option>
            <option value={"VerticalTree"}>Vertical Tree</option>
          </select>
        </div>
      </div>
      <div style={{ height: "660px" }}>
        <GraphView
          ref={graphView}
          nodeKey={NODE_KEY}
          nodes={nodes}
          edges={edges}
          selected={selected}
          nodeTypes={NodeTypes}
          nodeSubtypes={NodeSubtypes}
          edgeTypes={EdgeTypes}
          onCreateNode={onCreateNode}
          onCreateEdge={onCreateEdge}
          layoutEngineType={graphState.layoutEngineType}
        />
      </div>
    </div>
  );
};

export default DAGraphContainer;
